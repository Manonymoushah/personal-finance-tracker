import { Transaction } from '@/components/FinanceDashboard';
import { sampleTransactions, generateId, DEMO_USER_ID } from './demoData';

const STORAGE_KEY = 'finance-tracker-transactions';
const DEMO_MODE_KEY = 'finance-tracker-demo-mode';

export interface StorageResult<T> {
  data: T | null;
  error: Error | null;
}

class LocalStorageAdapter {
  private initializeStorage() {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTransactions));
    }
  }

  private getTransactions(): Transaction[] {
    this.initializeStorage();
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }

  async select(): Promise<StorageResult<Transaction[]>> {
    try {
      const transactions = this.getTransactions();
      return { data: transactions, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async insert(transaction: Omit<Transaction, 'id'>): Promise<StorageResult<Transaction>> {
    try {
      const transactions = this.getTransactions();
      const newTransaction: Transaction = {
        ...transaction,
        id: generateId(),
      };
      transactions.push(newTransaction);
      this.saveTransactions(transactions);
      return { data: newTransaction, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async delete(id: string): Promise<StorageResult<boolean>> {
    try {
      const transactions = this.getTransactions();
      const filtered = transactions.filter(t => t.id !== id);
      this.saveTransactions(filtered);
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async update(id: string, updates: Partial<Transaction>): Promise<StorageResult<Transaction>> {
    try {
      const transactions = this.getTransactions();
      const index = transactions.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error('Transaction not found');
      }
      transactions[index] = { ...transactions[index], ...updates };
      this.saveTransactions(transactions);
      return { data: transactions[index], error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  resetToSampleData(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTransactions));
  }

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const localStorageAdapter = new LocalStorageAdapter();

// Demo mode management
export const setDemoMode = (enabled: boolean) => {
  localStorage.setItem(DEMO_MODE_KEY, enabled.toString());
};

export const isDemoMode = (): boolean => {
  return localStorage.getItem(DEMO_MODE_KEY) === 'true';
};

export const getDemoUser = () => ({
  id: DEMO_USER_ID,
  email: 'demo@example.com',
  user_metadata: {
    display_name: 'Demo User'
  }
});
