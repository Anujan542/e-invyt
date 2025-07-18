/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = login;

  const onSubmit = (data: any) => {
    toast
      .promise(mutateAsync(data), {
        loading: 'Logging in...',
        success: 'Welcome back!',
        error: (err) => err?.response?.data?.message || 'Invalid code',
      })
      .then(() => {
        navigate('/');
      });
  };
  return (
    <section className="flex min-h-screen bg-zinc-50  dark:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link to="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logo} alt="logo" height={60} width={60} />
            </Link>
            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to E-Invyt</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email
              </Label>
              <Input {...register('email')} type="email" required />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="pwd" className="text-title text-sm">
                  Password
                </Label>
                <Button asChild variant="link" size="sm">
                  <Link to="/forgot-password" className="link intent-info variant-ghost text-sm">
                    Forgot your Password ?
                  </Link>
                </Button>
              </div>
              <Input
                {...register('password')}
                type="password"
                required
                className="input sz-md variant-mixed"
              />
            </div>
            <Button
              className="w-full flex justify-center items-center gap-2 cursor-pointer"
              type="submit"
              disabled={isPending}
              effect="shineHover"
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              {isPending ? '' : 'Login'}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account ?
            <Button asChild variant="link" className="px-2">
              <Link to="/signup">Create account</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
