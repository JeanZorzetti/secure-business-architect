export interface Analytics {
  id: string;
  event: string;
  entityId?: string | null;
  entityType?: string | null;
  metadata?: Record<string, any> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

export interface CreateAnalyticsDTO {
  event: string;
  entityId?: string;
  entityType?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface AnalyticsOverview {
  totalViews: number;
  totalContacts: number;
  totalNewsletterSubscribers: number;
  totalBlogPosts: number;
  contactsThisMonth: number;
  subscribersThisMonth: number;
  postsThisMonth: number;
  viewsThisMonth: number;
}

export interface TopPost {
  id: string;
  title: string;
  slug: string;
  viewCount: number;
  publishedAt: Date | null;
}

export interface AnalyticsTrend {
  date: string;
  count: number;
}

export interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
  event?: string;
  entityType?: string;
}

export interface ConversionFunnelStage {
  stage: string;
  count: number;
  percentage: number;
  conversionRate?: number; // Taxa de conversão para próxima etapa
}

export interface ConversionFunnelResponse {
  stages: ConversionFunnelStage[];
  totalLeads: number;
  overallConversionRate: number; // Taxa de NEW -> CONVERTED
}
