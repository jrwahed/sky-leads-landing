import { motion } from 'framer-motion';
import { Handshake, LineChart, Users, CheckCircle2 } from 'lucide-react';
import { fadeUp, stagger, slideLeft, slideRight } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';
import PrimaryButton from '@/components/PrimaryButton';
import { useContactForm } from '@/contexts/ContactFormContext';

const icons = { Handshake, LineChart };

const en = {
  overline: "WHO THIS IS FOR",
  title: "Built For Real Estate",
  titleAccent: "Companies That Scale.",
  sub: "Sky Leads is designed for mid-size and large real estate developers and brokerages who want full control over their marketing and sales pipeline.",
  items: [
    { icon: "Handshake", title: "Real Estate Brokerages", sub: "Know exactly which leads to prioritize. Close more deals with less wasted effort." },
    { icon: "LineChart", title: "Developers & CEOs", sub: "See how every pound of ad spend translates to actual revenue — in real time." },
  ],
  cardTitle: "Sky Leads For Developers & Brokers",
  cardBody: "Whether you're a developer launching a new project or a brokerage managing a sales team — Sky Leads gives you full control over campaigns, leads, and deals from one place.",
  checks: [
    "No long contracts — start and stop anytime",
    "Dedicated account manager for every client",
    "Visible results within the first 30 days",
  ],
  cardCta: "Start a Campaign",
};

const ar = {
  overline: "ده لمين",
  title: "اتبنى لشركات العقارات",
  titleAccent: "اللي بتكبر.",
  sub: "Sky Leads متصمم لشركات التطوير العقاري والوساطة المتوسطة والكبيرة اللي عاوزين تحكم كامل في التسويق ومسار المبيعات.",
  items: [
    { icon: "Handshake", title: "شركات الوساطة العقارية", sub: "اعرف بالظبط أنهي ليدز تبدأ بيهم. قفّل Deals أكتر بمجهود أقل." },
    { icon: "LineChart", title: "المطورون والـ CEOs", sub: "شوف إزاي كل جنيه إعلانات بيتحول لإيرادات فعلية — لحظياً." },
  ],
  cardTitle: "Sky Leads لشركات التطوير والبروكرز",
  cardBody: "سواء شركة تطوير عقاري بتطلق مشروع جديد أو بروكر بيدير فريق مبيعات — Sky Leads بتديك تحكم كامل في الحملات والليدز والـ Deals من مكان واحد.",
  checks: [
    "من غير عقود طويلة — ابدأ ووقف في أي وقت",
    "أكاونت مانجر مخصص لكل عميل",
    "نتايج واضحة في أول ٣٠ يوم",
  ],
  cardCta: "ابدأ حملة إعلانية",
};

const WhoBenefits = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const { openForm } = useContactForm();

  return (
    <section style={{ background: 'var(--bg-2)', padding: 'var(--section-py) 0' }}>
      <div className="container">
        <div className="whob-layout" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start',
          direction: isAr ? 'rtl' : 'ltr',
        }}>
          {/* Left — List */}
          <div>
            <SectionHeader overline={t.overline} title={t.title} titleAccent={t.titleAccent} subtitle={t.sub} />

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              {t.items.map((item, i) => {
                const IconComp = icons[item.icon as keyof typeof icons];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    style={{
                      padding: '24px 0',
                      borderBottom: i < t.items.length - 1 ? '1px solid var(--border)' : 'none',
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      alignItems: 'center',
                      gap: 20,
                      cursor: 'default',
                      transition: 'var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(200,240,0,0.02)';
                      e.currentTarget.style.paddingLeft = '8px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    <div style={{
                      width: 48, height: 48,
                      background: 'var(--accent-08)',
                      border: '1px solid var(--accent-15)',
                      borderRadius: 'var(--r-md)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {IconComp && <IconComp size={20} color="var(--accent)" />}
                    </div>

                    <div>
                      <div style={{
                        fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700, fontSize: 18, color: '#ffffff',
                      }}>{item.title}</div>
                      <div style={{
                        fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                        fontWeight: 400, fontSize: 18, color: '#e8e8e8', marginTop: 4, lineHeight: 1.6,
                      }}>{item.sub}</div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right — Highlight card */}
          <motion.div
            variants={isAr ? slideRight : slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid rgba(200,240,0,0.2)',
              borderRadius: 'var(--r-xl)',
              padding: 40,
              position: 'sticky',
              top: 100,
            }}
          >
            <Users size={20} color="var(--accent)" />
            <div style={{
              fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700, fontSize: 18, color: '#ffffff', marginTop: 16,
            }}>{t.cardTitle}</div>
            <p style={{
              fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
              fontWeight: 400, fontSize: 18, color: '#e8e8e8', marginTop: 12, lineHeight: 1.8,
            }}>{t.cardBody}</p>

            <div style={{ marginTop: 28, marginBottom: 28, height: 1, background: 'var(--border)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {t.checks.map((check, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                  <span style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                    fontWeight: 500, fontSize: 15, color: '#d4d4d4',
                  }}>{check}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28, width: '100%' }}>
              <PrimaryButton label={t.cardCta} onClick={() => openForm('campaign')} size="lg" />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .whob-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          .whob-layout > div:last-child { position: static !important; }
        }
        @media (max-width: 768px) {
          .whob-layout { gap: 32px !important; }
          .whob-layout > div:last-child {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhoBenefits;
