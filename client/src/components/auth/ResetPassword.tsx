/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';

import logo from '@/assets/logo.png';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PasswordStrengthBar } from './PasswordUi/PasswordStrengthBar';
import { PasswordHints } from './PasswordUi/PasswordHints';
import zxcvbn from 'zxcvbn';
import { useState } from 'react';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password') || '';

  const passwordStrength = zxcvbn(password).score;

  const { mutateAsync, isPending } = resetPassword;

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    toast
      .promise(
        mutateAsync({
          data: {
            password: data.password,
          },
          token: `${token}`,
        }),
        {
          loading: 'Reseting password...',
          success: 'Password reset successfull',
          error: (err) => err?.response?.data?.message || 'Reset password fail',
        }
      )
      .then(() => {
        navigate('/login');
      });
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link to="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logo} alt="logo" height={60} width={60} />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Reset Password</h1>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>

              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="pr-10" // add space for the icon
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {password.length > 0 && (
                <>
                  <PasswordStrengthBar score={passwordStrength} />
                  <PasswordHints password={password} />
                </>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="block text-sm">
                Confirm Password
              </Label>
              <Input type="password" required {...register('confirmPassword')} />
            </div>
            {errors.confirmPassword?.message && (
              <p className="text-sm text-red-600">{String(errors.confirmPassword.message)}</p>
            )}

            <Button
              className="w-full flex justify-center items-center gap-2 cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              {isPending ? 'Resetting...' : 'Reset'}
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
