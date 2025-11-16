'use client';

import { Clock, BookOpen, Target, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ExecutiveSummaryProps {
  readingTime: number;
  learningPoints: string[];
  outcome: string;
}

export default function ExecutiveSummary({
  readingTime,
  learningPoints,
  outcome
}: ExecutiveSummaryProps) {
  if (!learningPoints || learningPoints.length === 0) {
    return null;
  }

  return (
    <Card className="mb-12 bg-gradient-to-br from-accent/10 via-accent/5 to-background border-l-4 border-accent shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-accent/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">Resumo Executivo</h3>
        </div>

        {/* Reading Time */}
        <div className="mb-6 p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5 text-accent" />
            <span className="font-medium">Tempo de leitura: {readingTime} minutos</span>
          </div>
        </div>

        {/* Learning Points */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
            O que você vai aprender:
          </p>
          <ul className="space-y-3">
            {learningPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                </div>
                <span className="text-base text-muted-foreground leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome */}
        {outcome && (
          <div className="pt-6 border-t-2 border-accent/20">
            <div className="p-4 bg-foreground/5 rounded-lg border-l-4 border-accent">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">
                    Resultado:
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
