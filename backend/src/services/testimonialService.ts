import prisma from '../config/database';
import type {
  CreateTestimonialDTO,
  UpdateTestimonialDTO,
  ReorderTestimonialDTO,
} from '../types/testimonial.types';

export class TestimonialService {
  /**
   * Criar novo depoimento (admin)
   */
  async create(createDTO: CreateTestimonialDTO) {
    // Se order não foi especificado, usar o próximo disponível
    let order = createDTO.order;
    if (order === undefined) {
      const maxOrder = await prisma.testimonial.findFirst({
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      order = maxOrder ? maxOrder.order + 1 : 0;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        ...createDTO,
        order,
        rating: createDTO.rating ?? 5,
      },
    });

    return testimonial;
  }

  /**
   * Listar depoimentos publicados (público)
   */
  async findAllPublic() {
    const testimonials = await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { order: 'asc' },
    });

    return testimonials;
  }

  /**
   * Listar todos os depoimentos (admin)
   */
  async findAll() {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: 'asc' },
    });

    return testimonials;
  }

  /**
   * Buscar depoimento por ID (admin)
   */
  async findById(id: string) {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      throw new Error('Depoimento não encontrado');
    }

    return testimonial;
  }

  /**
   * Atualizar depoimento (admin)
   */
  async update(id: string, updateDTO: UpdateTestimonialDTO) {
    // Verificar se depoimento existe
    await this.findById(id);

    const updated = await prisma.testimonial.update({
      where: { id },
      data: updateDTO,
    });

    return updated;
  }

  /**
   * Deletar depoimento (admin)
   */
  async delete(id: string) {
    await this.findById(id);

    await prisma.testimonial.delete({
      where: { id },
    });

    return { message: 'Depoimento deletado com sucesso' };
  }

  /**
   * Publicar/Despublicar depoimento (admin)
   */
  async togglePublish(id: string) {
    const testimonial = await this.findById(id);

    const updated = await prisma.testimonial.update({
      where: { id },
      data: { isPublished: !testimonial.isPublished },
    });

    return {
      message: `Depoimento ${updated.isPublished ? 'publicado' : 'despublicado'} com sucesso`,
      testimonial: updated,
    };
  }

  /**
   * Reordenar depoimentos (admin)
   */
  async reorder(testimonials: ReorderTestimonialDTO[]) {
    // Atualizar ordem de cada depoimento
    await Promise.all(
      testimonials.map((testimonial) =>
        prisma.testimonial.update({
          where: { id: testimonial.id },
          data: { order: testimonial.order },
        })
      )
    );

    return { message: 'Depoimentos reordenados com sucesso' };
  }
}

export const testimonialService = new TestimonialService();
