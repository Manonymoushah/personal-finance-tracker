import { Transaction } from '@/components/FinanceDashboard';

export const DEMO_USER_ID = 'demo-user-local';

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    amount: 45000,
    description: 'Monthly Salary',
    category: 'Salary',
    type: 'income',
    date: '2025-11-01',
  },
  {
    id: '2',
    amount: 15000,
    description: 'Freelance Project',
    category: 'Freelance',
    type: 'income',
    date: '2025-11-15',
  },
  {
    id: '3',
    amount: 12000,
    description: 'Apartment Rent',
    category: 'Housing',
    type: 'expense',
    date: '2025-11-05',
  },
  {
    id: '4',
    amount: 3500,
    description: 'Groceries',
    category: 'Food',
    type: 'expense',
    date: '2025-11-10',
  },
  {
    id: '5',
    amount: 2000,
    description: 'Electricity Bill',
    category: 'Utilities',
    type: 'expense',
    date: '2025-11-12',
  },
  {
    id: '6',
    amount: 1500,
    description: 'Movie Night',
    category: 'Entertainment',
    type: 'expense',
    date: '2025-11-18',
  },
  {
    id: '7',
    amount: 5000,
    description: 'Investment Returns',
    category: 'Investments',
    type: 'income',
    date: '2025-11-20',
  },
  {
    id: '8',
    amount: 800,
    description: 'Coffee & Snacks',
    category: 'Food',
    type: 'expense',
    date: '2025-11-22',
  },
  {
    id: '9',
    amount: 4500,
    description: 'New Laptop Accessories',
    category: 'Shopping',
    type: 'expense',
    date: '2025-11-25',
  },
  {
    id: '10',
    amount: 1200,
    description: 'Metro Card Recharge',
    category: 'Transportation',
    type: 'expense',
    date: '2025-11-28',
  },
];

export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
