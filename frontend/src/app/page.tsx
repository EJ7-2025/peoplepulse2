
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    // Redirecionar para dashboard se já estiver autenticado
    if (token) {
      router.push('/dashboard');
    } else {
      // Caso contrário, redirecionar para login
      router.push('/login');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando...</p>
      </div>
    </div>
  );
}
