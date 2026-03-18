import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { scaleIn } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const en = {
  overline: "SEE IT IN ACTION",
  title: "Watch Sky Leads",
  titleAccent: "In Action.",
  sub: "2-minute overview of the Sky Leads platform and how AI transforms your campaigns.",
  play: "Watch Overview",
  note: "Video coming soon — placeholder for embed",
};

const ar = {
  overline: "شوفه بنفسك",
  title: "شوف Sky Leads",
  titleAccent: "بتشتغل.",
  sub: "نظرة عامة ٢ دقيقة على منصة Sky Leads وإزاي الـ AI بيحول حملاتك.",
  play: "شوف الفيديو",
  note: "الفيديو قريباً",
};

const Video = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;

  return (
    <section style={{ background: 'var(--bg-2)', padding: 'var(--section-py) 0' }}>
      <div className="container">
        <SectionHeader overline={t.overline} title={t.title} titleAccent={t.titleAccent} subtitle={t.sub} center isAr={isAr} />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{ maxWidth: 900, margin: '0 auto', marginTop: 56 }}
        >
          <div style={{
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            border: '1px solid rgba(200,240,0,0.15)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,240,0,0.06)',
          }}>
            <div style={{
              aspectRatio: '16/9',
              background: 'linear-gradient(135deg, #0d0d0d 0%, #111800 50%, #0d0d0d 100%)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grid lines */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(200,240,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,0,0.03) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }} />

              {/* Corner badge */}
              <div style={{
                position: 'absolute', top: 24,
                right: isAr ? 'auto' : 24,
                left: isAr ? 24 : 'auto',
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-full)',
                padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4444' }}
                />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 12, color: 'var(--t2)' }}>2:14</span>
              </div>

              {/* Center */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(200,240,0,0.4)',
                      '0 0 0 20px rgba(200,240,0,0)',
                      '0 0 0 0 rgba(200,240,0,0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: 64, height: 64,
                    background: 'var(--accent)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    cursor: 'pointer',
                  }}
                >
                  <Play size={28} color="#000" fill="#000" style={{ marginLeft: 4 }} />
                </motion.div>
                <span style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 500, fontSize: 16, color: 'var(--t2)',
                }}>{t.play}</span>
              </div>
            </div>
          </div>

          <p style={{
            textAlign: 'center', marginTop: 20,
            fontFamily: "'Outfit', sans-serif", fontWeight: 400, fontSize: 13, color: 'var(--t4)',
          }}>{t.note}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
