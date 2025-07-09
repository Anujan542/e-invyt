/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const { register, handleSubmit } = useForm();
  const { mutate, isPending } = forgotPassword;

  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(data?.message || 'Password reset link sent to your email');
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || 'Invalid token');
      },
    });
  };

  return (
    <section className="flex min-h-screen  px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link to="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logo} alt="logo" height={60} width={60} />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
            <p className="text-sm">Enter your email to receive a reset link</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input type="email" required {...register('email')} placeholder="name@example.com" />
            </div>

            <Button
              className="w-full flex justify-center items-center cursor-pointer"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              {isPending ? 'Sending....' : 'Send Reset Link'}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              We'll send you a link to reset your password.
            </p>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Remembered your password?
            <Button asChild variant="link" className="px-2">
              <Link to="/login">Log in</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;
