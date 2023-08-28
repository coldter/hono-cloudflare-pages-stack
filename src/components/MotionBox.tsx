import { motion } from 'framer-motion';
import React from 'react';
import { BaseComponentProps } from '../types';

export const MotionBox: React.FC<BaseComponentProps> = ({ children, ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
