import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { AnalyticsTrend } from '@/types/analytics';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface TrendChartProps {
  title: string;
  description?: string;
  data: AnalyticsTrend[];
  color?: string;
  dataKey?: string;
  formatValue?: (value: number) => string;
  headerActions?: ReactNode;
  comparisonData?: {
    current: number;
    previous: number;
    label: string;
  };
}

export function TrendChart({
  title,
  description,
  data,
  color = '#3b82f6',
  dataKey = 'count',
  formatValue = (value: number) => value.toString(),
  headerActions,
  comparisonData,
}: TrendChartProps) {
  // Formatar dados para o gráfico
  const chartData = data.map((item) => ({
    date: item.date,
    [dataKey]: item.count,
    formattedDate: format(parseISO(item.date), 'dd/MMM', { locale: ptBR }),
  }));

  // Calcular mudança percentual
  let percentageChange: number | null = null;
  let isIncrease = false;
  if (comparisonData) {
    const { current, previous } = comparisonData;
    if (previous > 0) {
      percentageChange = ((current - previous) / previous) * 100;
      isIncrease = percentageChange > 0;
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
            {comparisonData && percentageChange !== null && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-bold">
                  {formatValue(comparisonData.current)}
                </span>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    isIncrease ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isIncrease ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {Math.abs(percentageChange).toFixed(1)}%
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  vs {comparisonData.label}
                </span>
              </div>
            )}
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="formattedDate"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Data
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].payload.formattedDate}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Total
                          </span>
                          <span className="font-bold">
                            {formatValue(payload[0].value as number)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
