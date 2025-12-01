import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  PiggyBank,
  LogOut,
  Trash2,
  UserCircle2,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseHealth } from "@/hooks/useSupabaseHealth";
import {
  localStorageAdapter,
  getDemoUser,
  setDemoMode as setDemoModeUtil,
} from "@/lib/localStorageAdapter";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";
import { SpendingChart } from "./SpendingChart";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  type: "income" | "expense";
  date: string;
}

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, signOut } = useAuth();
  const { isSupabaseOnline, isDemoMode } = useSupabaseHealth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch transactions from Supabase or localStorage
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);

      // Use localStorage in demo mode or when Supabase is offline
      if (isDemoMode || !isSupabaseOnline) {
        const { data, error } = await localStorageAdapter.select();
        if (error) {
          console.error("Error loading local transactions:", error);
        }
        setTransactions(data || []);
        setLoading(false);
        return;
      }

      // Use Supabase when online and user is authenticated
      if (!user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase query failed:", error);
        setTransactions([]);
      } else {
        const formattedTransactions = (data || []).map((transaction) => ({
          ...transaction,
          type: transaction.type as "income" | "expense",
        }));
        setTransactions(formattedTransactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [isDemoMode, isSupabaseOnline, user?.id]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      // Use localStorage in demo mode
      if (isDemoMode || !isSupabaseOnline) {
        const { data, error } = await localStorageAdapter.insert(transaction);
        if (error) {
          toast({
            title: "Error adding transaction",
            description: error.message,
            variant: "destructive",
          });
        } else {
          await fetchTransactions();
          setShowTransactionForm(false);
          toast({
            title: "Transaction added",
            description: "Your transaction has been saved locally.",
          });
        }
        return;
      }

      // Use Supabase when online
      const { data, error } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: user?.id,
            amount: transaction.amount,
            description: transaction.description,
            category: transaction.category,
            type: transaction.type,
            date: transaction.date,
          },
        ])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error adding transaction",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await fetchTransactions();
        setShowTransactionForm(false);
        toast({
          title: "Transaction added",
          description: "Your transaction has been saved successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction",
        variant: "destructive",
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      // Use localStorage in demo mode
      if (isDemoMode || !isSupabaseOnline) {
        const { error } = await localStorageAdapter.delete(id);
        if (error) {
          toast({
            title: "Error deleting transaction",
            description: error.message,
            variant: "destructive",
          });
        } else {
          await fetchTransactions();
          toast({
            title: "Transaction deleted",
            description: "The transaction has been removed.",
          });
        }
        return;
      }

      // Use Supabase when online
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) {
        toast({
          title: "Error deleting transaction",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await fetchTransactions();
        toast({
          title: "Transaction deleted",
          description: "The transaction has been removed.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    // Clear demo mode
    localStorage.removeItem("finance-tracker-demo-mode");
    // Sign out if authenticated
    await signOut();
    // Navigate to auth page
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Demo Mode Banner */}
        {isDemoMode && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Demo Mode Active:</strong> You're viewing sample data
              stored locally.
              {!isSupabaseOnline && " Supabase is currently offline."}
              All changes are saved in your browser.
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Finance Tracker
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back,{" "}
              {isDemoMode ? "Demo User" : user?.email?.split("@")[0]}! Take
              control of your financial future
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/profile")}
              variant="outline"
              className="border-border hover:bg-muted"
              aria-label="Open profile"
            >
              <UserCircle2 className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              onClick={() => setShowTransactionForm(true)}
              className="bg-gradient-primary hover:opacity-90 transition-smooth"
              aria-label="Add a new transaction"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-border hover:bg-muted"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-white shadow-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Balance
              </CardTitle>
              <IndianRupee className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{balance.toLocaleString()}
              </div>
              <p className="text-xs opacity-80 mt-1">
                {balance >= 0 ? "+" : ""}₹{(balance - 2050).toLocaleString()}{" "}
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-white shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Income
              </CardTitle>
              <TrendingUp className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{totalIncome.toLocaleString()}
              </div>
              <p className="text-xs opacity-80 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Total Expenses
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-expense" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-expense">
                ₹{totalExpenses.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                -8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                Savings Goal
              </CardTitle>
              <PiggyBank className="h-4 w-4 text-savings" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-savings">₹1,500</div>
              <p className="text-xs text-muted-foreground mt-1">
                75% of monthly goal
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Transactions */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              Loading your transactions...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <SpendingChart transactions={transactions} />
            </div>

            <div className="space-y-6">
              <TransactionList
                transactions={transactions}
                onDelete={deleteTransaction}
              />
            </div>
          </div>
        )}

        {/* Transaction Form Modal */}
        {showTransactionForm && (
          <TransactionForm
            onSubmit={addTransaction}
            onClose={() => setShowTransactionForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FinanceDashboard;
