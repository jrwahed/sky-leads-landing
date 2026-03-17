import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface OutlineButtonProps {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
}

const OutlineButton = ({ label, onClick, icon }: OutlineButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ borderColor: 'var(--accent)', color: '#fff', scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'transparent',
        color: 'var(--t2)',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        fontSize: 15,
        padding: '13px 30px',
        borderRadius: 'var(--r-full)',
        border: '1px solid rgba(255,255,255,0.12)',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'var(--transition)',
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
};

export default OutlineButton;
