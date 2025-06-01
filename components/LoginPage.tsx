"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    }
    getSession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data?.user) {
        // Ensure we have a valid session before redirecting
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/dashboard');
          router.refresh(); // Force a refresh to update the session state
        } else {
          setError('Authentication successful but session not established. Please try again.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResetError('');
    setResetSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setResetSuccess(true);
      setResetEmail('');
      setTimeout(() => {
        setShowResetForm(false);
        setResetSuccess(false);
      }, 3000);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : 'Failed to send reset email');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <img src="/dipapa-logo.png" alt="DIPAPA Logo" className="h-16 mb-2" />
        </div>

        {!showResetForm ? (
          <form onSubmit={handleLogin}>
            <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <div className="mb-4">
              <label className="block mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => setShowResetForm(true)}
              className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <h2 className="mb-4 text-2xl font-bold text-center">Reset Password</h2>
            {resetError && <div className="mb-4 text-red-500">{resetError}</div>}
            {resetSuccess && (
              <div className="mb-4 text-green-500">
                Password reset instructions have been sent to your email address.
                Please check your inbox and follow the instructions to reset your password.
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-1" htmlFor="resetEmail">Email</label>
              <input
                id="resetEmail"
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
            <button
              type="button"
              onClick={() => setShowResetForm(false)}
              className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
