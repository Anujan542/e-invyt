import { matchPath, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { HeroSection } from './components/shared/HeroSection';
import { Header } from './components/shared/Header';
import TemplateContainer from './pages/template/TemplateContainer';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import VerifyEmail from './components/auth/VerifyEmail';

import { useAuth } from './hooks/useAuth'; // <-- import hook
import { useAuthStore } from './store/useAuthStore';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import SuccessPayment from './pages/payment/SuccessPayment';
import OrderContainer from './pages/orders/OrderContainer';
import AboutUs from './pages/about/About';
import ContactUs from './pages/about/Contact';
// import { Footer } from './components/shared/Footer';

const App = () => {
  const location = useLocation();
  const isAuthorized = useAuthStore((state) => state.isAuthorized);
  const isVerified = useAuthStore((state) => state.isVerified);

  const { checkAuth } = useAuth();
  const { isLoading } = checkAuth;

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isResetPasswordRoute = matchPath('/reset-password/:token', location.pathname);

  const hideHeaderRoutes = [
    '/login',
    '/signup',
    '/verifyEmail',
    '/forgot-password',
    isResetPasswordRoute,
  ];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  if (
    isLoading &&
    location.pathname !== '/login' &&
    location.pathname !== '/signup' &&
    location.pathname !== '/verifyEmail' &&
    location.pathname !== '/forgot-password' &&
    !isResetPasswordRoute // use matchPath here
  ) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col">
      {!shouldHideHeader && <Header />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HeroSection />} />

          <Route path="/about" element={<AboutUs />} />

          <Route path="/contact" element={<ContactUs />} />

          <Route path="/template-selection" element={<TemplateContainer />} />

          <Route path="/orders" element={<OrderContainer />} />

          <Route
            path="/signup"
            element={
              isAuthorized ? (
                isVerified ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/verifyEmail" replace />
                )
              ) : (
                <Signup />
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuthorized ? (
                isVerified ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/verifyEmail" replace />
                )
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/verifyEmail"
            element={isAuthorized && !isVerified ? <VerifyEmail /> : <Navigate to="/" replace />}
          />
          <Route
            path="/forgot-password"
            element={isAuthorized ? <Navigate to="/" replace /> : <ForgotPassword />}
          />
          <Route
            path="/reset-password/:token"
            element={isAuthorized ? <Navigate to="/" replace /> : <ResetPassword />}
          />
          <Route path="*" element={<NotFound />} />

          <Route path="/payment-success" element={<SuccessPayment />} />
        </Routes>
      </main>
      {/* <Footer /> */}
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
