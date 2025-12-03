# Personal Finance Tracker

A modern, responsive web application for tracking personal finances with income, expenses, and savings goals visualization.

**🌐 Live Demo:** [https://personal-fi.netlify.app/](https://personal-fi.netlify.app/)

## ✨ Features

- 📊 **Dashboard Overview** - View total balance, income, expenses, and savings at a glance
- 💰 **Transaction Management** - Add, view, and delete financial transactions
- 📈 **Visual Analytics** - Interactive pie charts showing spending by category
- 🏷️ **Category Organization** - Organize transactions by predefined categories
- 🎨 **Modern UI** - Clean, gradient-based design with Tailwind CSS
- 🔐 **Authentication** - Secure user authentication via Supabase
- 🎮 **Demo Mode** - Try the app without creating an account
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Demo Mode

The app includes an automatic **Demo Mode** feature that allows users to explore the full functionality even when the backend is unavailable:

- **Automatic Fallback** - Switches to demo mode if Supabase is offline
- **Local Storage** - All demo transactions are saved in your browser
- **Full CRUD Operations** - Add, view, and delete transactions in demo mode
- **Sample Data** - Pre-loaded with realistic financial transactions

Click "Try Demo Mode" on the login page to explore without signing up!

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Backend**: Supabase (PostgreSQL + Auth)
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Charts**: Recharts
- **Form Handling**: React Hook Form + Zod validation

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Manonymoushah/personal-finance-tracker.git
cd personal-finance-tracker

# Install dependencies
npm install

# Set up environment variables
# Create a .env file and add your Supabase credentials:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

# Run development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**Note:** The app will run in demo mode if these are not configured.

## 📝 Database Schema

The app uses two main tables:

### Transactions
- `id` - UUID primary key
- `user_id` - Foreign key to auth.users
- `amount` - Decimal (transaction amount)
- `description` - Text
- `category` - Text (e.g., "Food", "Housing", "Salary")
- `type` - Enum ("income" or "expense")
- `date` - Date
- `created_at` / `updated_at` - Timestamps

### Profiles
- `id` - UUID primary key
- `user_id` - Foreign key to auth.users
- `display_name` - Text (optional)

Row-Level Security (RLS) policies ensure users can only access their own data.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn/ui)
│   ├── FinanceDashboard.tsx
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── SpendingChart.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx
│   └── useSupabaseHealth.tsx
├── lib/                # Utility functions
│   ├── demoData.ts
│   ├── localStorageAdapter.ts
│   └── utils.ts
├── pages/              # Route pages
│   ├── Index.tsx
│   ├── Auth.tsx
│   ├── Profile.tsx
│   └── NotFound.tsx
├── integrations/       # Third-party integrations
│   └── supabase/
└── App.tsx            # Main app component
```

## 🌐 Deployment

### Deploy to Netlify

1. **Connect your repository** to Netlify
2. **Add environment variables** in Site Settings → Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. **Deploy settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy**

### Deploy to Vercel

1. Import your GitHub repository
2. Add the same environment variables
3. Deploy with one click

### Manual Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🐛 Known Issues & Solutions

**Supabase going offline?** The app automatically switches to demo mode with local storage, so users can always explore the functionality.

**Need to reset demo data?** Clear your browser's localStorage or click the reset button (if implemented).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/)
- **Charts**: [Recharts](https://recharts.org/)

---

**Built with ❤️ by [Manonymoushah](https://github.com/Manonymoushah)**
