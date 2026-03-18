import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Lang } from '@/hooks/useLanguage';
import { useContactForm } from '@/contexts/ContactFormContext';

const t = {
  en: {
    campaignTitle: 'Start Your Campaign',
    campaignSub: 'Fill in your details and we\'ll get your campaign running.',
    demoTitle: 'Request a Free Demo',
    demoSub: 'See the full platform in action before you start.',
    company: 'Company Name',
    phone: 'Phone Number',
    title: 'Your Title (e.g. CEO, Marketing Director)',
    budgetLabel: 'Monthly Ad Budget',
    budgetNote: 'Our management fee is 20% of ad spend',
    submit: 'Submit & Connect on WhatsApp',
    required: 'This field is required',
    phoneError: 'Phone number must be numeric',
  },
  ar: {
    campaignTitle: 'ابدأ الكامبين بتاعك',
    campaignSub: 'املا بياناتك وهنبدأ نشغّلك الكامبين.',
    demoTitle: 'اطلب نسخة تجريبية مجاناً',
    demoSub: 'شوف المنصة كلها شغالة قبل ما تبدأ.',
    company: 'اسم الشركة',
    phone: 'رقم الموبايل',
    title: 'المسمى الوظيفي (مثال: CEO، مدير تسويق)',
    budgetLabel: 'الميزانية الإعلانية الشهرية',
    budgetNote: 'رسوم الإدارة ٢٠٪ من الإنفاق الإعلاني',
    submit: 'أرسل وتواصل على واتساب',
    required: 'هذا الحقل مطلوب',
    phoneError: 'رقم الموبايل لازم يكون أرقام بس',
  },
};

const budgetOptions = [
  '40,000 - 100,000 EGP',
  '100,000 - 250,000 EGP',
  '250,000 - 500,000 EGP',
  '500,000+ EGP',
];

const ContactForm = ({ lang }: { lang: Lang }) => {
  const { isOpen, mode, closeForm } = useContactForm();
  const isAr = lang === 'ar';
  const l = isAr ? t.ar : t.en;

  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formTitle = mode === 'campaign'
    ? (isAr ? l.campaignTitle : l.campaignTitle)
    : (isAr ? l.demoTitle : l.demoTitle);
  const formSub = mode === 'campaign'
    ? (isAr ? l.campaignSub : l.campaignSub)
    : (isAr ? l.demoSub : l.demoSub);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!company.trim()) e.company = l.required;
    if (!phone.trim()) e.phone = l.required;
    else if (!/^[\d+\-\s()]+$/.test(phone.trim())) e.phone = l.phoneError;
    if (!jobTitle.trim()) e.jobTitle = l.required;
    if (mode === 'campaign' && !budget) e.budget = l.required;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const prefix = mode === 'campaign' ? '🚀 Campaign Request' : '👀 Demo Request';
    let msg = `${prefix}\nCompany: ${company.trim()}\nPhone: ${phone.trim()}\nTitle: ${jobTitle.trim()}`;
    if (mode === 'campaign' && budget) msg += `\nBudget: ${budget}`;
    msg += `\nSource: Sky Leads Landing Page`;
    window.open(`https://wa.me/201034575482?text=${encodeURIComponent(msg)}`, '_blank');
    closeForm();
    setCompany('');
    setPhone('');
    setJobTitle('');
    setBudget('');
    setErrors({});
  };

  const font = isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif";
  const dir = isAr ? 'rtl' : 'ltr';

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px',
    minHeight: 48,
    background: 'var(--bg-2)',
    border: `1px solid ${hasError ? '#ff4444' : 'var(--border-2)'}`,
    borderRadius: 'var(--r-md)',
    color: 'var(--t1)',
    fontFamily: font,
    fontSize: 15,
    outline: 'none',
    transition: 'var(--transition-fast)',
    direction: dir,
  });

  const errorStyle: React.CSSProperties = {
    fontFamily: font,
    fontSize: 12,
    color: '#ff4444',
    marginTop: 4,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: font,
    fontWeight: 600,
    fontSize: 14,
    color: 'var(--t2)',
    marginBottom: 8,
    display: 'block',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeForm}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="contact-form-modal"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              width: '100%',
              maxWidth: 480,
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 32,
              position: 'relative',
              direction: dir,
            }}
          >
            {/* Close */}
            <button
              onClick={closeForm}
              style={{
                position: 'absolute',
                top: 16,
                [isAr ? 'left' : 'right']: 16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <X size={20} color="var(--t3)" />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 8 }}>
              {/* Title & Subtitle */}
              <div>
                <h3 style={{
                  fontFamily: isAr ? "'Tajawal', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: 'var(--t1)',
                  marginBottom: 6,
                }}>{formTitle}</h3>
                <p style={{
                  fontFamily: font,
                  fontWeight: 400,
                  fontSize: 14,
                  color: 'var(--t3)',
                  lineHeight: 1.6,
                }}>{formSub}</p>
              </div>

              {/* Company */}
              <div>
                <input
                  type="text"
                  placeholder={l.company}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={inputStyle(!!errors.company)}
                />
                {errors.company && <div style={errorStyle}>{errors.company}</div>}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder={l.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle(!!errors.phone)}
                />
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
              </div>

              {/* Job Title */}
              <div>
                <input
                  type="text"
                  placeholder={l.title}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  style={inputStyle(!!errors.jobTitle)}
                />
                {errors.jobTitle && <div style={errorStyle}>{errors.jobTitle}</div>}
              </div>

              {/* Budget (only for campaign) */}
              {mode === 'campaign' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <label style={labelStyle}>{l.budgetLabel}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setBudget(opt)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: 'var(--r-sm)',
                          border: `1.5px solid ${budget === opt ? 'var(--accent)' : 'var(--border-2)'}`,
                          background: budget === opt ? 'var(--accent-08)' : 'var(--bg-2)',
                          color: budget === opt ? 'var(--accent)' : 'var(--t2)',
                          fontFamily: font,
                          fontWeight: 500,
                          fontSize: 14,
                          cursor: 'pointer',
                          textAlign: isAr ? 'right' : 'left',
                          transition: 'var(--transition-fast)',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.budget && <div style={errorStyle}>{errors.budget}</div>}
                  <p style={{
                    fontFamily: font,
                    fontSize: 12,
                    color: 'var(--t4)',
                    marginTop: 8,
                  }}>{l.budgetNote}</p>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, boxShadow: 'var(--accent-glow)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  background: 'var(--accent)',
                  color: '#000',
                  fontFamily: font,
                  fontWeight: 700,
                  fontSize: 16,
                  borderRadius: 'var(--r-full)',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: 4,
                  transition: 'var(--transition)',
                }}
              >
                {l.submit}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .contact-form-modal {
            width: 95% !important;
            max-height: 90vh !important;
            padding: 24px !important;
            border-radius: var(--r-lg) !important;
          }
          .contact-form-modal input,
          .contact-form-modal select,
          .contact-form-modal button {
            min-height: 48px !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default ContactForm;
