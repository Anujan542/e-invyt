import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '../theme-provider';
import { Moon, Sun } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useAuthStore } from '@/store/useAuthStore';
import UserProfile from '../auth/UserProfile';

export const Header = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [menuState, setMenuState] = useState(false);
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  const { theme, setTheme } = useTheme();

  const menuItems = [
    { name: 'Home', href: '/template-selection' },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-20 w-full pt-2">
        <div
          className={cn(
            'mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12',
            'bg-background/50 backdrop-blur-2xl'
          )}
        >
          <motion.div
            key={1}
            className={cn(
              'relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6',
              'lg:py-4'
            )}
          >
            <div className="flex w-full items-center justify-between cursor-pointer gap-12 lg:w-auto">
              <NavLink to="/" className="flex items-center space-x-0">
                <img src={logo} alt="logo" height={40} width={40} />
                <h3>E-Invyt</h3>
              </NavLink>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn(
                            'block duration-150',
                            isActive
                              ? 'text-accent-foreground font-semibold '
                              : 'text-muted-foreground hover:text-accent-foreground'
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn(
                            'block duration-150',
                            isActive
                              ? 'text-accent-foreground font-semibold '
                              : 'text-muted-foreground hover:text-accent-foreground'
                          )
                        }
                        onClick={() => setMenuState(!menuState)}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3  sm:space-y-0 md:w-fit">
                {theme === 'system' ? (
                  <Button
                    className="cursor-pointer"
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon />
                  </Button>
                ) : theme === 'dark' ? (
                  <Button
                    className="cursor-pointer"
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => setTheme('light')}
                  >
                    <Sun />
                  </Button>
                ) : (
                  <Button
                    className="cursor-pointer"
                    size={'icon'}
                    variant={'ghost'}
                    onClick={() => setTheme('dark')}
                  >
                    <Moon />
                  </Button>
                )}
                {isAuthorized ? (
                  <>
                    <UserProfile />
                  </>
                ) : (
                  <>
                    <Button className="cursor-pointer" variant="outline" size="sm">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="cursor-pointer" size="sm">
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};
