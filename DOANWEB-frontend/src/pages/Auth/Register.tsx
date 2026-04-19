import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, ChevronRight, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import api from '../../api/axios';

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth.php?action=register', formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.error || 'Registration failed.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Could not reach server.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-indigo-50 p-6">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-green-100">
          <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-500 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Success!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your account has been created successfully. Redirecting you to login in a few seconds...
          </p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full animate-progress-bar w-full origin-left transition-transform duration-[3000ms] ease-linear"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 transition-transform hover:rotate-0 duration-300">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Join us today and enjoy the best electronics
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl flex items-start space-x-3 shadow-inner">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="full_name">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="John Doe"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="email-address">Email Address</label>
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="phone">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="+84 123 456 789"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1" htmlFor="confirm_password">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all sm:text-sm"
                  placeholder="••••••••"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
