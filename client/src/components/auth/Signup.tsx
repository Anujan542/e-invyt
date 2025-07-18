/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { PasswordStrengthBar } from './PasswordUi/PasswordStrengthBar';
import { PasswordHints } from './PasswordUi/PasswordHints';

const Signup = () => {
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: createUser, isPending } = signup;
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  const password = watch('password') || '';

  const onSubmit = (data: any) => {
    createUser(data, {
      onSuccess: () => {
        navigate('/verifyEmail', {
          state: { email: data.email },
        });
      },
    });
  };

  const passwordStrength = zxcvbn(password).score;

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
              <Label htmlFor="password">Password</Label>

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

            <Button
              className="w-full flex justify-center items-center gap-2 cursor-pointer"
              type="submit"
              disabled={isPending}
              effect="shineHover"
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
