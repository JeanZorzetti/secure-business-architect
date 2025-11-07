import prisma from '../config/database';
import { ContactStatus } from '@prisma/client';
import type { CreateContactDTO, ContactFilters, PaginatedContacts } from '../types/contact.types';

export class ContactService {
  /**
   * Cria um novo contato (público - formulário do site)
   */
  async create(createContactDTO: CreateContactDTO) {
    const contact = await prisma.contact.create({
      data: {
        ...createContactDTO,
        status: ContactStatus.PENDING,
      },
    });

    return contact;
  }

  /**
   * Lista contatos com filtros e paginação (admin)
   */
  async findAll(filters: ContactFilters): Promise<PaginatedContacts> {
    const { status, search, page = 1, limit = 10 } = filters;

    const skip = (page - 1) * limit;

    // Construir where clause
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Buscar contatos
    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count({ where }),
    ]);

    return {
      contacts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Busca contato por ID (admin)
   */
  async findById(id: string) {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new Error('Contato não encontrado');
    }

    // Se estava PENDING, marcar como READ
    if (contact.status === ContactStatus.PENDING) {
      await this.updateStatus(id, ContactStatus.READ);
      contact.status = ContactStatus.READ;
    }

    return contact;
  }

  /**
   * Atualiza status do contato (admin)
   */
  async updateStatus(id: string, status: ContactStatus) {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new Error('Contato não encontrado');
    }

    const updated = await prisma.contact.update({
      where: { id },
      data: { status },
    });

    return updated;
  }

  /**
   * Deleta contato (admin)
   */
  async delete(id: string) {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      throw new Error('Contato não encontrado');
    }

    await prisma.contact.delete({
      where: { id },
    });

    return { message: 'Contato deletado com sucesso' };
  }

  /**
   * Estatísticas de contatos (admin)
   */
  async getStats() {
    const [total, pending, read, archived] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: ContactStatus.PENDING } }),
      prisma.contact.count({ where: { status: ContactStatus.READ } }),
      prisma.contact.count({ where: { status: ContactStatus.ARCHIVED } }),
    ]);

    return {
      total,
      pending,
      read,
      archived,
    };
  }
}

export const contactService = new ContactService();
