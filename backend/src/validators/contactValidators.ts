import { z } from 'zod';
import { ContactStatus } from '@prisma/client';

export const createContactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres').max(1000),
});

export const updateContactSchema = z.object({
  status: z.nativeEnum(ContactStatus),
});

export const contactFiltersSchema = z.object({
  status: z.nativeEnum(ContactStatus).optional(),
  search: z.string().optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
});
