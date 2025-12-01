import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from './FinanceDashboard';

interface SpendingChartProps {
  transactions: Transaction[];
}

export const SpendingChart = ({ transactions }: SpendingChartProps) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  // Aggregate by category and guard against bad/zero values
  const rawCategoryData = expenseTransactions.reduce((acc, transaction) => {
    const amount = Number(transaction.amount) || 0;
    if (amount <= 0) return acc;
    const existing = acc.find(item => item.name === transaction.category);
    if (existing) {
      existing.value += amount;
    } else {
      acc.push({ name: transaction.category, value: amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Sort categories for stable color assignment
  const categoryData = rawCategoryData.sort((a, b) => a.name.localeCompare(b.name));

  const COLORS = [
    'hsl(210 85% 25%)',  // primary
    'hsl(150 60% 45%)',  // secondary  
    'hsl(200 90% 50%)',  // accent
    'hsl(0 75% 55%)',    // danger
    'hsl(270 70% 55%)',  // purple
    'hsl(30 85% 55%)',   // orange
    'hsl(180 70% 45%)',  // teal
    'hsl(45 90% 55%)',   // yellow
  ];

  // Deterministic color per category
  const colorMap = new Map<string, string>();
  categoryData.forEach((item, idx) => {
    colorMap.set(item.name, COLORS[idx % COLORS.length]);
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-elevated border border-border">
          <p className="font-medium text-card-foreground">{payload[0]?.name}</p>
          <p className="text-sm text-expense">
            ₹{Number(payload[0]?.value || 0).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categoryData.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              No expense data to display.<br />
              Add some expenses to see your spending breakdown.
            </p>
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}-${index}`}
                      fill={colorMap.get(entry.name)}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span className="text-sm text-muted-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};