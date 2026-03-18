import { motion } from 'framer-motion';
import { fadeUp, viewport } from '@/lib/animations';

interface SectionHeaderProps {
  overline: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  center?: boolean;
  isAr?: boolean;
}

const SectionHeader = ({ overline, title, titleAccent, subtitle, center, isAr }: SectionHeaderProps) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={viewport}
    style={{
      marginBottom: 56,
      textAlign: center ? 'center' : 'left',
    }}
  >
    {/* Overline */}
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
      <span style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
      }}>
        {overline}
      </span>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
    </div>

    {/* Title */}
    <h2 style={{
      fontSize: 'clamp(36px, 4.5vw, 56px)',
      lineHeight: isAr ? 1.3 : 1.05,
      letterSpacing: isAr ? 0 : '-0.03em',
      wordSpacing: isAr ? '4px' : 'normal',
    }}>
      {title}
      {titleAccent && <span style={{ color: 'var(--accent)' }}> {titleAccent}</span>}
    </h2>

    {/* Animated underline */}
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: 52, opacity: 1 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      style={{
        height: 2,
        background: 'var(--accent)',
        borderRadius: 2,
        marginTop: 18,
        ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
      }}
    />

    {/* Subtitle */}
    {subtitle && (
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 400,
        fontSize: 16,
        color: 'var(--t2)',
        lineHeight: 1.65,
        maxWidth: 600,
        marginTop: 14,
        ...(center ? { marginLeft: 'auto', marginRight: 'auto' } : {}),
      }}>
        {subtitle}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
