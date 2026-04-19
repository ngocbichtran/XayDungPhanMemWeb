import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ChevronRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../../api/axios';
import { useAuthStore } from '../../store/useAuthStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      if (user.roles.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/homepage');
      }
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/auth.php?action=login', { email, password });
      if (response.data.success) {
        const { token, user: loggedInUser } = response.data.data;
        localStorage.setItem('access_token', token);
        login(loggedInUser);
        const roles = loggedInUser.roles;
        if (roles.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/homepage');
        }
      } else {
        setError(response.data.error || 'Login failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 transition-transform hover:rotate-0 duration-300">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <label htmlFor="email-address" className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative group">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded-lg cursor-pointer"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
