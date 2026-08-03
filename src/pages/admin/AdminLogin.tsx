import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendOtpAxios, verifyOtpAxios } from '../../_api/admin';
import Cookies from 'js-cookie';

export default function AdminLogin() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      await sendOtpAxios(email);
      
      toast.success('OTP sent to your email');
      setStep('otp');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtpAxios(email, otp);
      const actualToken = response?.accessToken || response?.token || response?.data?.token;
      const refreshToken = response?.refreshToken || response?.data?.refreshToken;
      
      if (!actualToken || typeof actualToken !== 'string') {
        throw new Error('No token received from server');
      }
      
      // Store token
      Cookies.set('token', actualToken, { expires: 1 });
      if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
      }
      
      toast.success('Login successful');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-line">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-pine mb-2">Admin Portal</h1>
          <p className="text-ink-soft">
            {step === 'email' ? 'Enter your email to receive an OTP' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pine hover:bg-pine/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-ink mb-1">
                One-Time Password
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors tracking-widest text-center text-xl font-medium"
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('email')}
                disabled={isLoading}
                className="w-1/3 bg-white text-pine border border-pine hover:bg-ivory/50 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 bg-pine hover:bg-pine/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Verify & Login'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
