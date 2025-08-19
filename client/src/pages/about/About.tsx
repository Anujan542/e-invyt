import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex wrapper">
      {/* Background gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 pointer-events-none" /> */}

      <motion.div
        className="relative max-w-3xl mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          🎉 We make your moments unforgettable
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          At <strong>E-Invyt</strong>, we help you create stunning invitation videos in minutes —
          without designers, delays, or complicated tools. Just pick a template, add your details,
          and download.
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our mission is simple : make professional-quality invitations accessible, affordable, and
          fast, so you can focus on celebrating life’s big moments.
        </motion.p>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-2">Why Choose Us</h2>
          <ul className="text-muted-foreground list-disc list-inside text-left max-w-md mx-auto">
            <li>
              <strong>Fast:</strong> Create professional videos in minutes.
            </li>
            <li>
              <strong>Simple:</strong> Easy-to-use editor with ready-made templates.
            </li>
            <li>
              <strong>High-Quality:</strong> Crisp HD output for online or offline sharing.
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button effect="shineHover" onClick={() => navigate('/template-selection')}>
            ✨ Start Creating
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
