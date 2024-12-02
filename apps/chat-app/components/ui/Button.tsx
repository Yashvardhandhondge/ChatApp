import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', className = '' }) => {
  const baseStyles = 'px-6 py-3 rounded-md transition duration-200 flex items-center gap-2';
  const primaryStyles = 'bg-purple-500 text-white hover:text-purple-500 border hover:bg-white hover:border-purple-400';
  const outlineStyles = 'text-white border border-white hover:bg-white hover:text-purple-600';

  return (
    <motion.button
      onClick={onClick}
      className={`${baseStyles} ${variant === 'outline' ? outlineStyles : primaryStyles} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
