import prisma from '../config/database';
import { PostStatus } from '@prisma/client';
import type {
  CreateBlogPostDTO,
  UpdateBlogPostDTO,
  BlogPostFilters,
  PaginatedBlogPosts,
  BlogStats,
} from '../types/blog.types';
import { seoService } from './seoService';

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

    // Se publishedAt for fornecido e for no futuro, manter como DRAFT
    // Se publishedAt for no passado ou agora, publicar imediatamente
    let status: PostStatus = PostStatus.DRAFT;
    let publishedAt = createDTO.publishedAt;

    if (publishedAt) {
      const now = new Date();
      if (publishedAt <= now) {
        status = PostStatus.PUBLISHED;
      }
      // Se for no futuro, deixa como DRAFT e será publicado por um job/cron
    }

    const post = await prisma.blogPost.create({
      data: {
        ...createDTO,
        slug,
        tags: createDTO.tags || [],
        status,
        publishedAt,
      },
    });

    // Notificar IndexNow se publicado
    if (status === PostStatus.PUBLISHED) {
      const postUrl = `/conteudo/${slug}`;
      await seoService.notifyIndexNow(postUrl).catch(() => {
        // Ignore IndexNow errors, não deve bloquear a criação do post
      });
    }

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

    // Lógica de agendamento
    let status = existing.status;
    if (updateDTO.publishedAt !== undefined) {
      const now = new Date();
      if (updateDTO.publishedAt && updateDTO.publishedAt <= now) {
        status = PostStatus.PUBLISHED;
      } else if (updateDTO.publishedAt && updateDTO.publishedAt > now) {
        status = PostStatus.DRAFT;
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...updateDTO,
        slug,
        status,
      },
    });

    // Notificar IndexNow se publicado
    if (status === PostStatus.PUBLISHED) {
      const postUrl = `/conteudo/${slug}`;
      await seoService.notifyIndexNow(postUrl).catch(() => {
        // Ignore IndexNow errors
      });
    }

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

    // Notificar IndexNow
    const postUrl = `/conteudo/${published.slug}`;
    await seoService.notifyIndexNow(postUrl).catch(() => {
      // Ignore IndexNow errors
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

  /**
   * Auto-save de rascunho
   * Salva o conteúdo atual sem publicar
   */
  async autoSave(id: string, data: Partial<UpdateBlogPostDTO>) {
    await this.findById(id); // Valida que o post existe

    // Salvar dados no autoDraftData para histórico
    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        isAutoDraft: true,
        lastAutoSaveAt: new Date(),
        autoDraftData: {
          ...data,
          savedAt: new Date().toISOString(),
        } as any,
      },
    });

    return {
      message: 'Rascunho salvo automaticamente',
      post: updated,
      lastAutoSaveAt: updated.lastAutoSaveAt,
    };
  }

  /**
   * Criar ou atualizar rascunho automático
   * Se não existir post, cria um novo com isAutoDraft
   */
  async createOrUpdateAutoDraft(data: Partial<CreateBlogPostDTO>, id?: string) {
    if (id) {
      // Atualizar rascunho existente
      return await this.autoSave(id, data);
    }

    // Criar novo rascunho automático
    const slug = await this.generateSlug(data.title || 'untitled-draft');

    const post = await prisma.blogPost.create({
      data: {
        title: data.title || 'Untitled Draft',
        slug,
        excerpt: data.excerpt || '',
        content: data.content || '',
        coverImage: data.coverImage,
        author: data.author || 'Unknown',
        category: data.category || 'Uncategorized',
        tags: data.tags || [],
        status: PostStatus.DRAFT,
        isAutoDraft: true,
        lastAutoSaveAt: new Date(),
        autoDraftData: {
          ...data,
          savedAt: new Date().toISOString(),
        },
      },
    });

    return {
      message: 'Rascunho automático criado',
      post,
    };
  }

  /**
   * Limpar rascunhos automáticos antigos
   * Remove rascunhos automáticos não editados há mais de X dias
   */
  async cleanOldAutoDrafts(daysOld = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const deleted = await prisma.blogPost.deleteMany({
      where: {
        isAutoDraft: true,
        lastAutoSaveAt: {
          lt: cutoffDate,
        },
      },
    });

    return {
      message: `${deleted.count} rascunhos antigos deletados`,
      count: deleted.count,
    };
  }

  /**
   * Gerar preview de post
   * Retorna dados do post com slug temporário para preview
   */
  async generatePreview(data: CreateBlogPostDTO | UpdateBlogPostDTO, id?: string) {
    let slug: string;

    if ('title' in data && data.title) {
      slug = await this.generateSlug(data.title, id);
    } else {
      slug = 'preview-' + Date.now();
    }

    return {
      ...data,
      slug,
      previewUrl: `/blog/preview/${slug}`,
      isPreview: true,
    };
  }

  /**
   * Agendar publicação de post
   */
  async schedulePost(id: string, scheduledFor: Date) {
    const post = await this.findById(id);

    // Validar que a data é futura
    if (scheduledFor <= new Date()) {
      throw new Error('Data de agendamento deve ser no futuro');
    }

    // Apenas posts em DRAFT podem ser agendados
    if (post.status !== PostStatus.DRAFT) {
      throw new Error('Apenas rascunhos podem ser agendados');
    }

    const scheduled = await prisma.blogPost.update({
      where: { id },
      data: {
        scheduledFor,
      },
    });

    return {
      message: 'Post agendado para publicação',
      post: scheduled,
      scheduledFor: scheduled.scheduledFor,
    };
  }

  /**
   * Cancelar agendamento de post
   */
  async cancelSchedule(id: string) {
    await this.findById(id);

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        scheduledFor: null,
      },
    });

    return {
      message: 'Agendamento cancelado',
      post: updated,
    };
  }

  /**
   * Listar posts agendados
   */
  async getScheduledPosts() {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: PostStatus.DRAFT,
        scheduledFor: {
          not: null,
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
    });

    return posts;
  }
}

export const blogService = new BlogService();
