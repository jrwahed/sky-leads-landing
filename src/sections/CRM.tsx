import { motion } from 'framer-motion';
import { Flame, Droplets, Snowflake } from 'lucide-react';
import { fadeUp, stagger, slideLeft, slideRight } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';
import PrimaryButton from '@/components/PrimaryButton';
import { useContactForm } from '@/contexts/ContactFormContext';

const featureIcons = { Flame, Droplets, Snowflake };

const en = {
  overline: "SMART CRM",
  title: "Every Lead. Tracked.",
  titleAccent: "Scored. Closed.",
  sub: "The CRM doesn't just store contacts — it tells your sales team exactly who to call, when to call, and what to say. AI does the thinking.",
  features: [
    { icon: "Flame", label: "Hot Lead", color: "#ff4444", desc: "Visited 3+ times, high engagement — ready to buy now.", fill: 90 },
    { icon: "Droplets", label: "Warm Lead", color: "#f5a623", desc: "Showed interest, needs one more touchpoint to convert.", fill: 60 },
    { icon: "Snowflake", label: "Cold Lead", color: "#4a9eff", desc: "Early stage — needs a nurturing campaign before any sales call.", fill: 25 },
  ],
  pipelineLabel: "SALES PIPELINE",
  pipeline: [
    { stage: "New Lead", count: 847 },
    { stage: "Contacted", count: 612 },
    { stage: "Qualified", count: 284 },
    { stage: "Proposal Sent", count: 98 },
    { stage: "Deal Closed", count: 23 },
  ],
  stats: [
    { value: "23%", label: "Lead-to-Deal Rate" },
    { value: "< 1m", label: "Avg. Response Time" },
    { value: "AI", label: "Scoring Engine" },
  ],
  cta: "Request a Free Demo",
};

const ar = {
  overline: "الـ CRM الذكي",
  title: "كل ليد. متتبع.",
  titleAccent: "متصنف. متقفّل.",
  sub: "الـ CRM مش بس بيحفظ أرقام — بيقول لفريقك بالظبط مين يكلمه، امتى، ويقوله إيه. الـ AI بيفكر بدالك.",
  features: [
    { icon: "Flame", label: "ليد سخن", color: "#ff4444", desc: "زار ٣+ مرات، تفاعل عالي — مستعد يشتري دلوقتي.", fill: 90 },
    { icon: "Droplets", label: "ليد فاتر", color: "#f5a623", desc: "أبدى اهتمام، محتاج نقطة تواصل واحدة كمان وهيحوّل.", fill: 60 },
    { icon: "Snowflake", label: "ليد بارد", color: "#4a9eff", desc: "لسه بدري — محتاج كامبين nurturing قبل أي مكالمة بيع.", fill: 25 },
  ],
  pipelineLabel: "خط أنابيب المبيعات",
  pipeline: [
    { stage: "ليد جديد", count: 847 },
    { stage: "تم التواصل", count: 612 },
    { stage: "مؤهل", count: 284 },
    { stage: "عرض مُرسل", count: 98 },
    { stage: "Deal مغلق", count: 23 },
  ],
  stats: [
    { value: "٢٣٪", label: "معدل تحويل الليد لـ Deal" },
    { value: "< ١ دقيقة", label: "متوسط وقت الاستجابة" },
    { value: "AI", label: "محرك التصنيف" },
  ],
  cta: "اطلب نسخة تجريبية مجاناً",
};

const opacities = [1.0, 0.85, 0.65, 0.45, 0.30];

const CRM = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const t = isAr ? ar : en;
  const { openForm } = useContactForm();

  return (
    <section style={{ background: 'var(--bg)', padding: 'var(--section-py) 0' }}>
      <div className="container">
        <div className="crm-layout" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
          direction: isAr ? 'rtl' : 'ltr',
        }}>
          {/* Left — CRM Visual */}
          <div>
            {/* Lead scoring cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {t.features.map((feat, i) => {
                const IconComp = featureIcons[feat.icon as keyof typeof featureIcons];
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderLeft: isAr ? '1px solid var(--border)' : `3px solid ${feat.color}`,
                      borderRight: isAr ? `3px solid ${feat.color}` : '1px solid var(--border)',
                      borderRadius: 'var(--r-md)',
                      padding: '16px 20px',
                      display: 'flex', alignItems: 'center', gap: 16,
                      transition: 'var(--transition-fast)',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = isAr ? 'translateX(-6px)' : 'translateX(6px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      width: 36, height: 36,
                      background: feat.color + '1a',
                      borderRadius: 'var(--r-sm)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <IconComp size={18} color={feat.color} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 700, fontSize: 16, color: '#ffffff',
                      }}>{feat.label}</div>
                      <div style={{
                        fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                        fontWeight: 400, fontSize: 18, color: '#e8e8e8', marginTop: 2,
                      }}>{feat.desc}</div>
                    </div>

                    <div style={{
                      width: 80, height: 6,
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 6, overflow: 'hidden', flexShrink: 0,
                    }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: feat.fill + '%' }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                        style={{ height: '100%', background: feat.color, borderRadius: 6 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pipeline */}
            <div style={{ marginTop: 8 }}>
              <div style={{
                fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                fontWeight: 600, fontSize: 12, color: 'var(--t3)',
                textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16,
              }}>{t.pipelineLabel}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {t.pipeline.map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    flexDirection: isAr ? 'row-reverse' : 'row',
                  }}>
                    <span style={{
                      fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                      fontWeight: 400, fontSize: 13, color: 'var(--t2)',
                      width: 120, flexShrink: 0,
                      textAlign: isAr ? 'right' : 'left',
                    }}>{p.stage}</span>

                    <div style={{
                      flex: 1, height: 8,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 8, overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: (p.count / 847 * 100) + '%' }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 1.0 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          height: '100%',
                          background: 'var(--accent)',
                          borderRadius: 8,
                          opacity: opacities[i],
                        }}
                      />
                    </div>

                    <span style={{
                      fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                      fontWeight: 700, fontSize: 13, color: 'var(--accent)',
                      width: 36, textAlign: isAr ? 'left' : 'right',
                    }}>{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <motion.div
            variants={isAr ? slideRight : slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <SectionHeader overline={t.overline} title={t.title} titleAccent={t.titleAccent} subtitle={t.sub} isAr={isAr} />

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
              marginTop: 40, marginBottom: 40,
            }}>
              {t.stats.map((s, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)',
                  padding: 20,
                  textAlign: 'center',
                  transition: 'var(--transition-fast)',
                  cursor: 'default',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  <div style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800, fontSize: 28, color: 'var(--accent)',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                    fontWeight: 400, fontSize: 12, color: 'var(--t3)', marginTop: 6,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            <PrimaryButton label={t.cta} onClick={() => openForm('demo')} size="lg" />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .crm-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 768px) {
          .crm-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
};

export default CRM;
