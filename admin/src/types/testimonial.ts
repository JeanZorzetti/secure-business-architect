export interface Testimonial {
  id: string;
  clientName: string;
  clientRole?: string | null;
  content: string;
  rating: number;
  avatar?: string | null;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialDTO {
  clientName: string;
  clientRole?: string;
  content: string;
  rating?: number;
  avatar?: string;
  order?: number;
}

export interface UpdateTestimonialDTO {
  clientName?: string;
  clientRole?: string;
  content?: string;
  rating?: number;
  avatar?: string;
  order?: number;
}

export interface ReorderTestimonialDTO {
  id: string;
  order: number;
}
