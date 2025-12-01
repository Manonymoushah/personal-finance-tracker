import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSupabaseHealth } from '@/hooks/useSupabaseHealth';
import FinanceDashboard from '@/components/FinanceDashboard';

const Index = () => {
  const { user, loading } = useAuth();
  const { isDemoMode } = useSupabaseHealth();
  const navigate = useNavigate();

  useEffect(() => {
    // Allow access if user is logged in OR in demo mode
    if (!loading && !user && !isDemoMode) {
      navigate('/auth');
    }
  }, [user, loading, isDemoMode, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show dashboard if user is logged in OR in demo mode
  if (!user && !isDemoMode) {
    return null; // Will redirect to auth
  }

  return <FinanceDashboard />;
};

export default Index;
