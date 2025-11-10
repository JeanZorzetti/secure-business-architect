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
  publishedAt: string | null;
}

export interface AnalyticsTrend {
  date: string;
  count: number;
}
