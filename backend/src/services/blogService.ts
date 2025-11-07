import prisma from '../config/database';
import { PostStatus } from '@prisma/client';
import type {
  CreateBlogPostDTO,
  UpdateBlogPostDTO,
  BlogPostFilters,
  PaginatedBlogPosts,
  BlogStats,
} from '../types/blog.types';

export class BlogService {
  /**
   * Gerar slug único a partir do título
   */
  private async generateSlug(title: string, excludeId?: string): Promise<string> {
    let slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .trim();

    // Verificar se slug já existe
    let counter = 1;
    let finalSlug = slug;

    while (true) {
      const existing = await prisma.blogPost.findUnique({
        where: { slug: finalSlug },
      });

      // Se não existe ou é o próprio post sendo atualizado
      if (!existing || (excludeId && existing.id === excludeId)) {
        break;
      }

      // Adicionar contador ao slug
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    return finalSlug;
  }

  /**
   * Criar novo blog post (admin)
   */
  async create(createDTO: CreateBlogPostDTO) {
    const slug = await this.generateSlug(createDTO.title);

    const post = await prisma.blogPost.create({
      data: {
        ...createDTO,
        slug,
        tags: createDTO.tags || [],
      },
    });

    return post;
  }

  /**
   * Listar posts com filtros e paginação
   */
  async findAll(filters: BlogPostFilters, isPublic = false): Promise<PaginatedBlogPosts> {
    const { status, category, tag, search, page = 1, limit = 10 } = filters;

    const skip = (page - 1) * limit;

    // Construir where clause
    const where: Record<string, unknown> = {};

    // Se for público, mostrar apenas publicados
    if (isPublic) {
      where.status = PostStatus.PUBLISHED;
    } else if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Buscar posts
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Buscar post por slug (público)
   */
  async findBySlug(slug: string, incrementView = false) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    // Incrementar visualizações se for público
    if (incrementView && post.status === PostStatus.PUBLISHED) {
      await prisma.blogPost.update({
        where: { slug },
        data: { viewCount: { increment: 1 } },
      });

      post.viewCount += 1;
    }

    return post;
  }

  /**
   * Buscar post por ID (admin)
   */
  async findById(id: string) {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      throw new Error('Post não encontrado');
    }

    return post;
  }

  /**
   * Atualizar post (admin)
   */
  async update(id: string, updateDTO: UpdateBlogPostDTO) {
    // Verificar se post existe
    const existing = await this.findById(id);

    // Se título mudou, gerar novo slug
    let slug = existing.slug;
    if (updateDTO.title && updateDTO.title !== existing.title) {
      slug = await this.generateSlug(updateDTO.title, id);
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateDTO,
        slug,
      },
    });

    return updated;
  }

  /**
   * Publicar post (admin)
   */
  async publish(id: string) {
    const post = await this.findById(id);

    if (post.status === PostStatus.PUBLISHED) {
      return { message: 'Post já está publicado', post };
    }

    const published = await prisma.blogPost.update({
      where: { id },
      data: {
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    return { message: 'Post publicado com sucesso', post: published };
  }

  /**
   * Despublicar post (admin)
   */
  async unpublish(id: string) {
    const post = await this.findById(id);

    if (post.status === PostStatus.DRAFT) {
      return { message: 'Post já está como rascunho', post };
    }

    const unpublished = await prisma.blogPost.update({
      where: { id },
      data: {
        status: PostStatus.DRAFT,
      },
    });

    return { message: 'Post despublicado com sucesso', post: unpublished };
  }

  /**
   * Deletar post (admin)
   */
  async delete(id: string) {
    await this.findById(id);

    await prisma.blogPost.delete({
      where: { id },
    });

    return { message: 'Post deletado com sucesso' };
  }

  /**
   * Listar categorias únicas
   */
  async getCategories() {
    const posts = await prisma.blogPost.findMany({
      where: { status: PostStatus.PUBLISHED },
      select: { category: true },
      distinct: ['category'],
    });

    return posts.map((p) => p.category).sort();
  }

  /**
   * Buscar posts (público)
   */
  async search(query: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = {
      status: PostStatus.PUBLISHED,
      OR: [
        { title: { contains: query, mode: 'insensitive' as const } },
        { excerpt: { contains: query, mode: 'insensitive' as const } },
        { content: { contains: query, mode: 'insensitive' as const } },
        { tags: { has: query } },
      ],
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Estatísticas do blog (admin)
   */
  async getStats(): Promise<BlogStats> {
    // Data de início do mês atual
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [total, published, drafts, thisMonth] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: PostStatus.PUBLISHED } }),
      prisma.blogPost.count({ where: { status: PostStatus.DRAFT } }),
      prisma.blogPost.count({
        where: {
          createdAt: { gte: startOfMonth },
        },
      }),
    ]);

    return {
      total,
      published,
      drafts,
      thisMonth,
    };
  }
}

export const blogService = new BlogService();
