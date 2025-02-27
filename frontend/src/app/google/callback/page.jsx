'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/authProvider';

export default function GoogleCallback() {
  const auth = useAuth()
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code || !state) {
        console.error('Missing code or state parameters');
        router.push('/login'); // Redirect to login on error
        return;
      }

      try {
        const response = await fetch('/api/google/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        let data = {}
        try {
          data = await response.json()
        } catch (error) {
          
        }
        // const data = await response.json()
        if (response.ok) {
            auth.login(data?.username)
        } else {
          setError(data.message || "Login failed. Please check your credentials.")
        }
    
        router.push('/'); // Redirect to dashboard on success
      } catch (error) {
        console.error('Error during authentication:', error);
        router.push('/login'); // Redirect to login on error
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Authenticating...</h1>
        <p>Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
}