import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Transaction } from './FinanceDashboard';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
}

export const TransactionList = ({ transactions, onDelete }: TransactionListProps) => {
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="bg-white shadow-card border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {sortedTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transactions yet. Add your first transaction to get started!
            </p>
          ) : (
            sortedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-income/10 text-income' 
                      : 'bg-expense/10 text-expense'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {onDelete && (
                    <Button 
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${transaction.description} on ${formatDate(transaction.date)}`}
                      title="Delete transaction"
                      onClick={() => {
                        const confirmDelete = window.confirm('Delete this transaction? This cannot be undone.');
                        if (confirmDelete) {
                          onDelete(transaction.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )}
                  <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' 
                      ? 'text-income' 
                      : 'text-expense'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    ₹{transaction.amount.toLocaleString()}
                  </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};