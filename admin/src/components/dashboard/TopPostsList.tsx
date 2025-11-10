import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { TopPost } from '@/types/analytics';
import { Eye, TrendingUp } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TopPostsListProps {
  posts: TopPost[];
}

export function TopPostsList({ posts }: TopPostsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Posts Mais Visualizados
        </CardTitle>
        <CardDescription>Top {posts.length} posts com mais visualizações</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="flex gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight mb-1 truncate">
                    {post.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">/{post.slug}</p>
                  {post.publishedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Publicado em{' '}
                      {format(parseISO(post.publishedAt), "dd 'de' MMMM, yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                <Eye className="h-4 w-4" />
                <span className="font-semibold text-sm">{post.viewCount.toLocaleString()}</span>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Nenhum post visualizado ainda</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
