import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { sendOtpAxios, verifyOtpAxios } from '../../_api/admin';
import Cookies from 'js-cookie';

export default function AdminLogin() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (error) setError(null);
    if (successMsg) setSuccessMsg(null);
  };

  const handleOtpChange = (val: string) => {
    setOtp(val);
    if (error) setError(null);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      const msg = 'Please enter your email address';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendOtpAxios(email.trim());
      if (response?.success === false) {
        throw new Error(response?.message || 'Failed to send OTP');
      }
      
      const msg = response?.message || 'OTP sent successfully to your email';
      setSuccessMsg(msg);
      toast.success(msg);
      setStep('otp');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to send OTP';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otp.trim()) {
      const msg = 'Please enter the 6-digit OTP';
      setError(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtpAxios(email.trim(), otp.trim());
      if (response?.success === false) {
        throw new Error(response?.message || 'Invalid or expired OTP');
      }

      const data = response?.data || response;
      const actualToken = data?.accessToken || data?.token || response?.accessToken || response?.token;
      const refreshToken = data?.refreshToken || response?.refreshToken;
      
      if (!actualToken || typeof actualToken !== 'string') {
        throw new Error(response?.message || 'No access token received from server');
      }
      
      // Store token
      Cookies.set('token', actualToken, { expires: 1 });
      if (refreshToken) {
        Cookies.set('refreshToken', refreshToken, { expires: 7 });
      }
      
      toast.success(response?.message || 'Login successful');
      navigate('/admin');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Invalid or expired OTP';
      setError(msg);
      toast.error(msg);
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

        {/* Inline Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{error}</div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Inline Success Notice */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{successMsg}</div>
          </div>
        )}

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
                onChange={(e) => handleEmailChange(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors"
                required
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pine hover:bg-pine/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 cursor-pointer"
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
                onChange={(e) => handleOtpChange(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg border border-line focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors tracking-widest text-center text-xl font-medium"
                required
                disabled={isLoading}
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setSuccessMsg(null);
                  setStep('email');
                }}
                disabled={isLoading}
                className="w-1/3 bg-white text-pine border border-pine hover:bg-ivory/50 font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 bg-pine hover:bg-pine/90 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 cursor-pointer"
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
