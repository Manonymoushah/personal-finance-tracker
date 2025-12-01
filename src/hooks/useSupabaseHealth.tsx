import { isDemoMode as checkDemoMode } from '@/lib/localStorageAdapter';

export const useSupabaseHealth = () => {
  // Simplified - just check if demo mode is active
  // No need for async health checks that slow down loading
  const isDemoMode = checkDemoMode();

  return { 
    isSupabaseOnline: !isDemoMode,
    isDemoMode
  };
};
