import { motion } from 'framer-motion';

interface PrimaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { padding: '10px 22px', fontSize: 13 },
  md: { padding: '13px 30px', fontSize: 15 },
  lg: { padding: '16px 40px', fontSize: 17 },
};

const PrimaryButton = ({ label, href, onClick, size = 'md' }: PrimaryButtonProps) => {
  const s = sizes[size];

  const handleClick = () => {
    if (href) window.open(href, '_blank');
    onClick?.();
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.04, boxShadow: 'var(--accent-glow)' }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: 'var(--accent)',
        color: '#000',
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 700,
        fontSize: s.fontSize,
        padding: s.padding,
        borderRadius: 'var(--r-full)',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        transition: 'var(--transition)',
      }}
    >
      {label}
    </motion.button>
  );
};

export default PrimaryButton;
