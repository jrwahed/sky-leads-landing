import { motion } from 'framer-motion';
import { BarChart2, Target, TrendingUp, Clock } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const icons: Record<string, typeof BarChart2> = {
  BarChart2, Target, TrendingUp, Clock,
};

const en = {
  overline: "THE REAL PROBLEM",
  title: "The Biggest Gap in",
  titleAccent: "Real Estate Companies.",
  subtitle: "The industry's real problem isn't bad ads. It's the disconnect between marketing spend and actual sales.",
  cards: [
    { icon: "BarChart2", title: "Marketing and Sales Speak Different Languages", body: "Marketing reports clicks and impressions. Sales reports calls and deals. But nobody connects the two — so no one knows what's actually working." },
    { icon: "Target", title: "Leads That Never Convert", body: "Your sales team wastes days chasing leads that were never serious. No scoring, no filtering — just guesswork." },
    { icon: "TrendingUp", title: "Budget Goes Up, Results Don't", body: "You increase spend hoping for better results. Nothing changes — because the problem is targeting and tracking, not budget." },
    { icon: "Clock", title: "Leads Go Cold in Minutes", body: "A lead contacted in the first minute is 10x more likely to close. Without automation, your team can't move that fast." },
  ],
};

const ar = {
  overline: "المشكلة الحقيقية",
  title: "أكبر فجوة في",
  titleAccent: "شركات العقارات.",
  subtitle: "المشكلة الحقيقية مش إعلانات وحشة. المشكلة إن مفيش ربط بين اللي بتصرفه على التسويق والمبيعات الفعلية.",
  cards: [
    { icon: "BarChart2", title: "التسويق والمبيعات مش متوصلين", body: "التسويق بيتكلم عن clicks و impressions. المبيعات بيتكلموا عن مكالمات و Deals. بس محدش بيربط الاتنين ببعض — فمحدش عارف إيه اللي شغال فعلاً." },
    { icon: "Target", title: "ليدز مش هتشتري أصلاً", body: "فريق المبيعات بيضيع أيام ورا ناس مش جادين. مفيش تصنيف، مفيش فلترة — كله تخمين." },
    { icon: "TrendingUp", title: "الميزانية بتزيد والنتيجة ثابتة", body: "بترفع الميزانية وتستنى نتايج أحسن. مفيش حاجة بتتغير — لأن المشكلة في الاستهداف والتتبع مش في الميزانية." },
    { icon: "Clock", title: "الليدز بتبرد في دقايق", body: "الليد اللي بتكلمه في أول دقيقة احتمال يشتري ١٠ أضعاف. من غير أتمتة، فريقك مش هيقدر يتحرك بالسرعة دي." },
  ],
};

const PainPoints = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;

  return (
    <section style={{ background: 'var(--bg)', padding: '72px 0 var(--section-py) 0', marginTop: 0 }}>
      <div className="container">
        <SectionHeader
          overline={t.overline}
          title={t.title}
          titleAccent={t.titleAccent}
          subtitle={t.subtitle}
          center
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="pain-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
            marginTop: 56,
          }}
        >
          {t.cards.map((card, i) => {
            const IconComp = icons[card.icon];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)',
                  padding: 40,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(200,240,0,0.22)';
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,240,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--border)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Corner glow */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: isAr ? 'auto' : 0,
                  left: isAr ? 0 : 'auto',
                  width: 140,
                  height: 140,
                  background: isAr
                    ? 'radial-gradient(circle at top left, rgba(200,240,0,0.05), transparent 65%)'
                    : 'radial-gradient(circle at top right, rgba(200,240,0,0.05), transparent 65%)',
                  pointerEvents: 'none',
                }} />

                {/* Icon */}
                <div style={{
                  width: 48,
                  height: 48,
                  background: 'var(--accent-08)',
                  border: '1px solid var(--accent-15)',
                  borderRadius: 'var(--r-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 28,
                }}>
                  {IconComp && <IconComp size={22} color="var(--accent)" />}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#ffffff',
                  lineHeight: 1.3,
                  letterSpacing: isAr ? 0 : '-0.02em',
                  marginBottom: 14,
                }}>
                  {card.title}
                </h3>

                <p style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  color: '#e8e8e8',
                  lineHeight: 1.85,
                }}>
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pain-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .pain-grid > div {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PainPoints;
