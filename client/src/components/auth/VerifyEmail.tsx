/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '../ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const { mutate: verifyOtp, isPending } = verifyEmail;
  const email = location.state?.email;
  const [otp, setOtp] = useState<string>('');

  const handleSubmit = () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code.');
      return;
    }

    verifyOtp(otp, {
      onSuccess: () => {
        toast.success('Email verified successfully!');
        navigate('/');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Invalid code');
      },
    });
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <div className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <h1 className="mb-1 mt-4 text-2xl font-bold">Verify Your Email</h1>
            <span className="text-sm">
              We sent a 6-digit verification code to <strong>{email}</strong>
            </span>
          </div>

          <div className="mt-6 space-y-6 flex flex-col justify-center items-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button
              className="w-full flex justify-center items-center gap-2 cursor-pointer"
              type="submit"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              {isPending ? 'Verifying...' : 'Verify Email'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
