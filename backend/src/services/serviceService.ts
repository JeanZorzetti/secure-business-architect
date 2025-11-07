import prisma from '../config/database';
import type { CreateServiceDTO, UpdateServiceDTO, ReorderServiceDTO } from '../types/service.types';

export class ServiceService {
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
      const existing = await prisma.service.findUnique({
        where: { slug: finalSlug },
      });

      // Se não existe ou é o próprio serviço sendo atualizado
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
   * Criar novo serviço (admin)
   */
  async create(createDTO: CreateServiceDTO) {
    const slug = await this.generateSlug(createDTO.title);

    // Se order não foi especificado, usar o próximo disponível
    let order = createDTO.order;
    if (order === undefined) {
      const maxOrder = await prisma.service.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      order = maxOrder ? maxOrder.order + 1 : 0;
    }

    const service = await prisma.service.create({
      data: {
        ...createDTO,
        slug,
        order,
      },
    });

    return service;
  }

  /**
   * Listar serviços ativos (público)
   */
  async findAllPublic() {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    return services;
  }

  /**
   * Listar todos os serviços (admin)
   */
  async findAll() {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });

    return services;
  }

  /**
   * Buscar serviço por slug (público)
   */
  async findBySlug(slug: string) {
    const service = await prisma.service.findUnique({
      where: { slug },
    });

    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    // Se não está ativo, não retornar para público
    if (!service.isActive) {
      throw new Error('Serviço não encontrado');
    }

    return service;
  }

  /**
   * Buscar serviço por ID (admin)
   */
  async findById(id: string) {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new Error('Serviço não encontrado');
    }

    return service;
  }

  /**
   * Atualizar serviço (admin)
   */
  async update(id: string, updateDTO: UpdateServiceDTO) {
    // Verificar se serviço existe
    const existing = await this.findById(id);

    // Se título mudou, gerar novo slug
    let slug = existing.slug;
    if (updateDTO.title && updateDTO.title !== existing.title) {
      slug = await this.generateSlug(updateDTO.title, id);
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...updateDTO,
        slug,
      },
    });

    return updated;
  }

  /**
   * Deletar serviço (admin)
   */
  async delete(id: string) {
    await this.findById(id);

    await prisma.service.delete({
      where: { id },
    });

    return { message: 'Serviço deletado com sucesso' };
  }

  /**
   * Reordenar serviços (admin)
   */
  async reorder(services: ReorderServiceDTO[]) {
    // Atualizar ordem de cada serviço
    await Promise.all(
      services.map((service) =>
        prisma.service.update({
          where: { id: service.id },
          data: { order: service.order },
        })
      )
    );

    return { message: 'Serviços reordenados com sucesso' };
  }

  /**
   * Toggle ativo/inativo (admin)
   */
  async toggleActive(id: string) {
    const service = await this.findById(id);

    const updated = await prisma.service.update({
      where: { id },
      data: { isActive: !service.isActive },
    });

    return {
      message: `Serviço ${updated.isActive ? 'ativado' : 'desativado'} com sucesso`,
      service: updated,
    };
  }
}

export const serviceService = new ServiceService();
