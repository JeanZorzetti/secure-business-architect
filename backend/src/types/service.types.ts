export interface CreateServiceDTO {
  title: string;
  icon: string;
  description: string;
  benefits: string[];
  order?: number;
}

export interface UpdateServiceDTO {
  title?: string;
  icon?: string;
  description?: string;
  benefits?: string[];
  order?: number;
  isActive?: boolean;
}

export interface ReorderServiceDTO {
  id: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  benefits: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
