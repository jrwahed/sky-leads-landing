import { motion } from 'framer-motion';
import { LayoutDashboard, Bot, Users, Star } from 'lucide-react';
import { scaleIn, stagger } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const icons = { LayoutDashboard, Bot, Users, Star };

const en = {
  overline: "WHAT THE AI DOES",
  title: "One System.",
  titleAccent: "Four Powerful Capabilities.",
  features: [
    { icon: "LayoutDashboard", title: "Live Performance Dashboard", body: "Your own private dashboard showing every campaign's real performance — spend, leads, CPL, and conversions. All live, all the time. No waiting for weekly reports.", tag: "Real-time" },
    { icon: "Bot", title: "AI Campaign Optimization", body: "The AI doesn't just report — it acts. It monitors campaigns continuously and tells you exactly which to scale, which to pause, and where to shift budget for maximum ROI.", tag: "Automated" },
    { icon: "Users", title: "Smart Real Estate CRM", body: "Track every lead from first click to signed contract. AI scores each lead — hot, warm, or cold — so your team focuses only on buyers ready to close.", tag: "Smart CRM" },
    { icon: "Star", title: "AI Lead Scoring", body: "Every lead gets scored instantly based on behavior, source, and engagement. Your team calls the right people first — saving time and closing faster.", tag: "AI-Powered" },
  ],
};

const ar = {
  overline: "الـ AI بيعمل إيه",
  title: "نظام واحد.",
  titleAccent: "أربع قدرات قوية.",
  features: [
    { icon: "LayoutDashboard", title: "داشبورد أداء لايف", body: "داشبورد خاص بيك بيوريك أداء كل حملة الحقيقي — إنفاق، ليدز، تكلفة الليد، ومعدل التحويل. كله لايف، طول الوقت. من غير انتظار ريبورتات أسبوعية.", tag: "لحظي" },
    { icon: "Bot", title: "تحسين الحملات بالـ AI", body: "الـ AI مش بس بيعمل ريبورت — بيتصرف. بيراقب الحملات باستمرار وبيقولك بالظبط أنهي تكبّر، أنهي توقف، وفين تحوّل الميزانية لأعلى ROI.", tag: "أوتوماتيك" },
    { icon: "Users", title: "CRM عقاري ذكي", body: "تابع كل ليد من أول كليك لحد توقيع العقد. الـ AI بيصنف كل ليد — سخن، فاتر، أو بارد — فريقك يركز بس على المشترين الجاهزين يقفلوا.", tag: "CRM ذكي" },
    { icon: "Star", title: "تسجيل الليدز بالـ AI", body: "كل ليد بياخد score فوراً بناءً على سلوكه ومصدره وتفاعله. فريقك بيكلم الناس الصح الأول — بيوفر وقت وبيقفل أسرع.", tag: "مدعوم بالـ AI" },
  ],
};

const WhatYouGet = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;

  return (
    <section style={{ background: 'var(--bg)', padding: 'var(--section-py) 0' }}>
      <div className="container">
        <SectionHeader overline={t.overline} title={t.title} titleAccent={t.titleAccent} center />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="wyg-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 72 }}
        >
          {t.features.map((feat, i) => {
            const IconComp = icons[feat.icon as keyof typeof icons];
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderTop: '2px solid var(--accent)',
                  borderRadius: 'var(--r-lg)',
                  padding: 40,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'var(--transition)',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,240,0,0.1)';
                  el.style.borderColor = 'rgba(200,240,0,0.3)';
                  el.style.borderTopColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'var(--border)';
                  el.style.borderTopColor = 'var(--accent)';
                }}
              >
                {/* BG decoration */}
                <div style={{
                  position: 'absolute',
                  bottom: -30,
                  right: isAr ? 'auto' : -30,
                  left: isAr ? -30 : 'auto',
                  width: 120, height: 120,
                  background: 'radial-gradient(circle, rgba(200,240,0,0.04) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div style={{
                    width: 52, height: 52,
                    background: 'var(--accent-08)',
                    border: '1px solid var(--accent-15)',
                    borderRadius: 'var(--r-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <IconComp size={24} color="var(--accent)" />
                  </div>
                  <span style={{
                    background: 'var(--accent-08)',
                    border: '1px solid var(--accent-15)',
                    borderRadius: 'var(--r-full)',
                    padding: '4px 12px',
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                    fontWeight: 600, fontSize: 11, color: 'var(--accent)',
                    letterSpacing: isAr ? 0 : '0.1em',
                    textTransform: isAr ? 'none' : 'uppercase',
                  }}>
                    {feat.tag}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 22, color: '#ffffff',
                  lineHeight: 1.25, letterSpacing: isAr ? 0 : '-0.02em', marginBottom: 14,
                }}>{feat.title}</h3>

                <p style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 400, fontSize: 18, color: '#e8e8e8', lineHeight: 1.85,
                }}>{feat.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wyg-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .wyg-grid > div { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default WhatYouGet;
