/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const { signup } = useAuth();
  const { mutate: createUser, isPending } = signup;
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    createUser(data, {
      onSuccess: () => {
        navigate('/verifyEmail', {
          state: { email: data.email },
        });
      },
    });
  };

  return (
    <section className="flex min-h-screen bg-zinc-50 px-4  dark:bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
          <div className="text-center">
            <Link to="/" aria-label="go home" className="mx-auto block w-fit">
              <img src={logo} alt="logo" height={60} width={60} />
            </Link>
            <h1 className="text-title mb-1 mt-4 text-xl font-semibold">Create a E-Invyt Account</h1>
          </div>

          <div className="mt-0 space-y-5">
            <div className="grid grid-cols-2 gap-3"></div>
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Username
              </Label>
              <Input {...register('name')} type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm">
                Email Address
              </Label>
              <Input {...register('email')} type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pwd" className="text-title text-sm">
                Password
              </Label>
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
            >
              {isPending && <Loader2 className="animate-spin h-4 w-4" />}
              {isPending ? '' : 'Signup'}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-accent-foreground text-center text-sm">
            Have an account ?
            <Button asChild variant="link" className="px-2 cursor-pointer">
              <Link to="/login">Sign In</Link>
            </Button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Signup;
