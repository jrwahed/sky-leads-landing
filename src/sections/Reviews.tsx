import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeUp, stagger } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const en = {
  overline: "CLIENT STORIES",
  title: "Real Results From",
  titleAccent: "Our Clients.",
  reviews: [
    { stars: 5, quote: "Sky Leads transformed how we run campaigns. We went from guessing to knowing — our CPL dropped 38% in the first month.", name: "Ahmed Khalil", title: "Marketing Director", company: "Capital Hills Developments", initials: "AK" },
    { stars: 5, quote: "The live dashboard alone was worth it. Our sales team now knows exactly who to call first. Deal speed doubled in 6 weeks.", name: "Sara Mostafa", title: "Sales Director", company: "Palm Hills Developments", initials: "SM" },
    { stars: 5, quote: "Finally an agency that speaks our language — results, not just reach. We hit 200% ROI on our Q3 campaigns.", name: "Omar Farouk", title: "CEO", company: "Sobek Developments", initials: "OF" },
  ],
};

const ar = {
  overline: "قصص عملاء",
  title: "نتايج حقيقية من",
  titleAccent: "عملائنا.",
  reviews: [
    { stars: 5, quote: "Sky Leads غيرت طريقة شغلنا بالكامل. وصلنا من التخمين للتأكد — والـ CPL انخفض ٣٨٪ في أول شهر.", name: "أحمد خليل", title: "مدير التسويق", company: "Capital Hills Developments", initials: "أح" },
    { stars: 5, quote: "الداشبورد اللايف وحده كان يستاهل. فريق المبيعات دلوقتي عارف بالظبط مين يكلمه الأول. سرعة الإغلاق اتضاعفت في ٦ أسابيع.", name: "سارة مصطفى", title: "مديرة المبيعات", company: "Palm Hills Developments", initials: "سم" },
    { stars: 5, quote: "أخيراً وكالة بتتكلم بلغتنا — نتايج مش مجرد وصول. وصلنا لـ ROI بـ ٢٠٠٪ في حملات الربع التالت.", name: "عمر فاروق", title: "CEO", company: "Sobek Developments", initials: "عف" },
  ],
};

const Reviews = ({ lang }: { lang: Lang }) => {
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
          className="reviews-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 72 }}
        >
          {t.reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: 36,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'var(--transition)',
                position: 'relative',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(200,240,0,0.18)';
                el.style.transform = 'translateY(-5px)';
                el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--border)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4 }}>
                {Array(review.stars).fill(0).map((_, j) => (
                  <Star key={j} size={15} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              {/* Quote */}
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{
                  position: 'absolute', top: -8,
                  left: isAr ? 'auto' : 0, right: isAr ? 0 : 'auto',
                  fontSize: 48, lineHeight: 1, color: 'rgba(200,240,0,0.15)',
                  fontFamily: 'Georgia, serif', pointerEvents: 'none',
                }}>"</span>
                <p style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                  fontWeight: 400, fontSize: 16, color: 'var(--t2)',
                  lineHeight: 1.8, fontStyle: 'italic', paddingTop: 16,
                }}>{review.quote}</p>
              </div>

              {/* Bottom */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                flexDirection: isAr ? 'row-reverse' : 'row',
              }}>
                <div style={{
                  width: 44, height: 44, flexShrink: 0, borderRadius: '50%',
                  background: 'var(--accent-08)', border: '1px solid var(--accent-25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: 14, color: 'var(--accent)',
                }}>{review.initials}</div>
                <div style={{ textAlign: isAr ? 'right' : 'left' }}>
                  <div style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600, fontSize: 14, color: 'var(--t1)',
                  }}>{review.name}</div>
                  <div style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif",
                    fontWeight: 400, fontSize: 13, color: 'var(--t3)',
                  }}>{review.title} · {review.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) { .reviews-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Reviews;
