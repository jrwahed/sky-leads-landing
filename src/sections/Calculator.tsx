import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, TrendingUp, AlertCircle, Target, DollarSign } from 'lucide-react';
import { Lang } from '@/hooks/useLanguage';
import { fadeUp, stagger } from '@/lib/animations';
import SectionHeader from '@/components/SectionHeader';
import PrimaryButton from '@/components/PrimaryButton';
import { useContactForm } from '@/contexts/ContactFormContext';

/* ─── Benchmark Data ─── */
const AREA_BENCHMARKS: Record<string, {
  name_ar: string; name_en: string;
  cpl_residential: number; cpl_villas: number; cpl_commercial: number; cpl_chalets: number;
  cpl_avg: number; conv_min: number; conv_max: number; conv_avg: number;
}> = {
  "6_october": {
    name_ar: "6 أكتوبر", name_en: "6th of October",
    cpl_residential: 200, cpl_villas: 300, cpl_commercial: 350, cpl_chalets: 280,
    cpl_avg: 250, conv_min: 3, conv_max: 6, conv_avg: 4.5
  },
  "tagamoa": {
    name_ar: "التجمع الخامس", name_en: "Fifth Settlement",
    cpl_residential: 300, cpl_villas: 350, cpl_commercial: 400, cpl_chalets: 350,
    cpl_avg: 350, conv_min: 2, conv_max: 4, conv_avg: 3
  },
  "new_capital": {
    name_ar: "العاصمة الإدارية", name_en: "New Capital",
    cpl_residential: 250, cpl_villas: 300, cpl_commercial: 350, cpl_chalets: 280,
    cpl_avg: 295, conv_min: 2, conv_max: 5, conv_avg: 3.5
  },
  "mostakbal": {
    name_ar: "مدينة المستقبل", name_en: "Mostakbal City",
    cpl_residential: 250, cpl_villas: 300, cpl_commercial: 350, cpl_chalets: 280,
    cpl_avg: 295, conv_min: 2, conv_max: 5, conv_avg: 3.5
  },
  "sheikh_zayed": {
    name_ar: "الشيخ زايد", name_en: "Sheikh Zayed",
    cpl_residential: 300, cpl_villas: 350, cpl_commercial: 400, cpl_chalets: 320,
    cpl_avg: 340, conv_min: 2, conv_max: 4, conv_avg: 3
  },
  "sahel": {
    name_ar: "الساحل الشمالي", name_en: "North Coast",
    cpl_residential: 300, cpl_villas: 350, cpl_commercial: 400, cpl_chalets: 280,
    cpl_avg: 330, conv_min: 1, conv_max: 3, conv_avg: 2
  },
  "ain_sokhna": {
    name_ar: "العين السخنة", name_en: "Ain Sokhna",
    cpl_residential: 280, cpl_villas: 320, cpl_commercial: 380, cpl_chalets: 260,
    cpl_avg: 310, conv_min: 2, conv_max: 4, conv_avg: 3
  },
};

const AREA_TIPS_AR: Record<string, string> = {
  "6_october": "أكتوبر من أنشط الأسواق العقارية — المنافسة عالية بس الطلب كبير. ركز على التقسيط المريح والمشاريع الجديدة. الجمهور بيهتم بالسعر والموقع القريب من الخدمات. الفيديوهات القصيرة بتجيب نتايج أحسن من الصور.",
  "tagamoa": "التجمع من أجمد المناطق الفترة الجاية — فيه لونشات كتير وجمهوره عنده قدرة شرائية عالية. ركز على الجودة والتشطيبات مش السعر. الفيديو والـ Reels بتشتغل أحسن بكتير من الصور الثابتة.",
  "new_capital": "العاصمة الإدارية سوق استثماري بالدرجة الأولى — ركز على العائد الاستثماري والموقع الاستراتيجي. استهدف المستثمرين ورجال الأعمال. الأرقام والعوائد بتقنع أكتر من الصور.",
  "mostakbal": "المستقبل سيتي من أجمد المناطق الفترة الجاية — سوق ناشئ فيه لونشات كتير والأسعار لسه تنافسية. الجمهور شاب ومتزوجين جدد. ركز على المساحات الصغيرة والتقسيط الطويل.",
  "sheikh_zayed": "زايد من أجمد المناطق الفترة الجاية — جمهوره بيحب الرفاهية والمساحات الخضراء. فيه لونشات كتير جديدة. الـ Instagram Reels والـ lifestyle content بتشتغل هنا أكتر من أي حاجة تانية.",
  "sahel": "الساحل موسمي — ابدأ الكامبينز من مارس وكثّف في أبريل ومايو. ركز على الشاليهات والقرى السياحية الجديدة. الـ Urgency والـ FOMO بتشتغل كويس جداً هنا.",
  "ain_sokhna": "السخنة سوق weekend getaway — ركز على القرب من القاهرة (ساعة بس) والاستثمار السياحي. استهدف سكان القاهرة والتجمع والمعادي. العروض المحدودة بتقنع أسرع.",
};

const AREA_TIPS_EN: Record<string, string> = {
  "6_october": "October is one of the most active real estate markets — high competition but high demand. Focus on flexible installments and new projects. Audience cares about price and location near services.",
  "tagamoa": "Fifth Settlement is one of the hottest areas right now — many new launches and high purchasing power audience. Focus on quality and finishing, not price. Video and Reels perform much better than static images.",
  "new_capital": "New Capital is primarily an investment market — focus on ROI and strategic location. Target investors and business owners. Numbers and returns convince more than photos.",
  "mostakbal": "Mostakbal City is one of the hottest emerging areas — many new launches with competitive prices. Young couples are the primary audience. Focus on small units and long installment plans.",
  "sheikh_zayed": "Sheikh Zayed is trending with many new launches — audience loves luxury and green spaces. Instagram Reels and lifestyle content work best here.",
  "sahel": "North Coast is seasonal — start campaigns in March, peak in April-May. Focus on new tourist villages and chalets. Urgency and FOMO work very well here.",
  "ain_sokhna": "Ain Sokhna is a weekend getaway market — focus on proximity to Cairo (just 1 hour) and tourism investment. Target Cairo, Fifth Settlement, and Maadi residents.",
};

const PROPERTY_TYPES_AR = ['شقق سكنية', 'فيلات', 'وحدات تجارية', 'شاليهات'];
const PROPERTY_TYPES_EN = ['Apartments', 'Villas', 'Commercial', 'Chalets'];
const PROPERTY_CPL_KEYS = ['cpl_residential', 'cpl_villas', 'cpl_commercial', 'cpl_chalets'] as const;

/* ─── Translations ─── */
const t = {
  en: {
    overline: "CPL Calculator",
    title: "Calculate Your",
    titleAccent: "Lead Cost.",
    subtitle: "Calculate your cost per lead and compare with Egyptian market benchmarks — free",
    budgetLabel: "Monthly Budget (EGP)",
    areaLabel: "Target Area",
    areaPlaceholder: "Select area...",
    propertyLabel: "Property Type",
    platformLabel: "Platform",
    platformNote: "Currently available for Meta Ads only",
    calculate: "Calculate Now",
    benchmarkTitle: (area: string) => `Market Benchmarks in ${area}`,
    cplRange: "CPL Range",
    avgCpl: "Average CPL",
    convRange: "Conversion Rate",
    expectedLeads: "Expected Leads",
    expectedDeals: "Expected Deals",
    expectedCpl: "Expected CPL",
    rangeFrom: "From",
    rangeTo: "to",
    diagnosisTitle: "Smart Diagnosis",
    cplExcellent: (area: string) => `CPL in ${area} is excellent — opportunity to scale budget`,
    cplGood: (area: string) => `CPL in ${area} is good — acceptable performance`,
    cplHigh: (area: string) => `CPL in ${area} is high — focus on targeting`,
    ctrTip1: "If CTR < 2% → creative problem",
    ctrTip2: "If CTR is high but CPL is expensive → audience problem",
    qualityTip: "Ideal ready leads (Quality) ratio: 25-35%",
    dealsDisclaimer: "* Numbers are estimates and vary based on targeting and content quality",
    budgetSmall: "Budget is small — ads need 5-7 days to learn",
    budgetMedium: "Good budget — start with 100-150 EGP/day per Ad Set",
    budgetLarge: "Excellent budget — split across 3-5 different Ad Sets",
    areaTipsTitle: "Area Tips",
    ctaTitle: "Want full analysis of your real campaigns?",
    ctaSub: "Sky Leads platform analyzes your campaigns with AI and gives you real-time recommendations",
    ctaBtn: "Start a Campaign",
    ctaTrust: "Join 50+ real estate companies using Sky Leads",
  },
  ar: {
    overline: "حاسبة تكلفة الليد",
    title: "احسب تكلفة الليد",
    titleAccent: "العقاري.",
    subtitle: "احسب تكلفة الليد وقارن بمتوسط السوق المصري — مجاناً",
    budgetLabel: "الميزانية الشهرية (جنيه)",
    areaLabel: "المنطقة",
    areaPlaceholder: "اختار المنطقة...",
    propertyLabel: "نوع العقار",
    platformLabel: "المنصة",
    platformNote: "حالياً متاح لـ Meta Ads فقط",
    calculate: "احسب الآن",
    benchmarkTitle: (area: string) => `معايير السوق في ${area}`,
    cplRange: "نطاق تكلفة الليد",
    avgCpl: "متوسط تكلفة الليد",
    convRange: "معدل التحويل",
    expectedLeads: "الليدز المتوقعة",
    expectedDeals: "الـ Deals المتوقعة",
    expectedCpl: "تكلفة الليد المتوقعة",
    rangeFrom: "من",
    rangeTo: "إلى",
    diagnosisTitle: "تشخيص ذكي",
    cplExcellent: (area: string) => `تكلفة الليد في ${area} ممتازة — فرصة لزيادة الميزانية`,
    cplGood: (area: string) => `تكلفة الليد في ${area} جيدة — أداء مقبول`,
    cplHigh: (area: string) => `تكلفة الليد في ${area} مرتفعة — ركز على الاستهداف`,
    ctrTip1: "لو الـ CTR أقل من 2% → مشكلة في الـ Creative",
    ctrTip2: "لو الـ CTR عالي والليد غالي → مشكلة في الـ Audience",
    qualityTip: "نسبة الليدز الجاهزة (Quality) المثالية: 25-35%",
    dealsDisclaimer: "* الأرقام تقديرية وبتختلف حسب جودة الاستهداف والمحتوى",
    budgetSmall: "الميزانية صغيرة — الإعلان محتاج 5-7 أيام عشان يتعلم",
    budgetMedium: "ميزانية مناسبة — ابدأ بـ 100-150 جنيه/يوم لكل Ad Set",
    budgetLarge: "ميزانية ممتازة — وزعها على 3-5 Ad Sets مختلفة",
    areaTipsTitle: "نصائح للمنطقة",
    ctaTitle: "عاوز تحليل كامل للكامبينز بتاعتك الحقيقية؟",
    ctaSub: "منصة Sky Leads بتحلل الكامبينز بالذكاء الاصطناعي وبتديك توصيات لحظية",
    ctaBtn: "ابدأ كامبين",
    ctaTrust: "انضم لـ +50 شركة عقارية بتستخدم Sky Leads",
  },
};

/* ─── Count-up hook ─── */
const useCountUp = (end: number, duration = 1500, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) { setCount(0); return; }
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return count;
};

const AnimatedNumber = ({ value, started, suffix = '' }: { value: number; started: boolean; suffix?: string }) => {
  const count = useCountUp(value, 1500, started);
  return <>{count.toLocaleString()}{suffix}</>;
};

/* ─── Main Component ─── */
const Calculator = ({ lang }: { lang: Lang }) => {
  const isAr = lang === 'ar';
  const l = isAr ? t.ar : t.en;
  const { openForm } = useContactForm();
  const font = isAr ? "'Tajawal', sans-serif" : "'Outfit', sans-serif";
  const dir = isAr ? 'rtl' : 'ltr';

  const [budget, setBudget] = useState(50000);
  const [area, setArea] = useState('');
  const [propertyType, setPropertyType] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [resultsKey, setResultsKey] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatNum = (n: number) => n.toLocaleString();

  const handleCalculate = () => {
    if (!area) return;
    setShowResults(false);
    setResultsKey(k => k + 1);
    setTimeout(() => {
      setShowResults(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 50);
  };

  const bench = area ? AREA_BENCHMARKS[area] : null;
  const areaName = bench ? (isAr ? bench.name_ar : bench.name_en) : '';
  const cplKey = PROPERTY_CPL_KEYS[propertyType];
  const cplForType = bench ? bench[cplKey] : 0;
  const leadsAvg = bench ? Math.round(budget / cplForType) : 0;
  const leadsMin = bench ? Math.round(leadsAvg * 0.7) : 0;
  const leadsMax = bench ? Math.round(leadsAvg * 1.3) : 0;
  const dealsAvg = bench ? Math.round(leadsAvg * bench.conv_avg / 100) : 0;
  const dealsMin = bench ? Math.round(leadsMin * bench.conv_min / 100) : 0;
  const dealsMax = bench ? Math.round(leadsMax * bench.conv_max / 100) : 0;
  const cplAvg = cplForType;

  const cplColor = cplAvg < 250 ? '#22c55e' : cplAvg <= 350 ? '#c8f000' : '#f97316';

  const sliderPercent = ((budget - 5000) / (500000 - 5000)) * 100;

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', minHeight: 48,
    background: 'var(--bg-2)', border: '1px solid var(--border-2)',
    borderRadius: 'var(--r-md)', color: 'var(--t1)',
    fontFamily: font, fontSize: 15, outline: 'none', direction: dir,
    cursor: 'pointer', appearance: 'none' as const, WebkitAppearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: isAr ? '16px center' : 'calc(100% - 16px) center',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: font, fontWeight: 600, fontSize: 14,
    color: 'var(--t2)', marginBottom: 8, display: 'block',
  };

  const propertyTypes = isAr ? PROPERTY_TYPES_AR : PROPERTY_TYPES_EN;

  return (
    <section id="calculator" style={{
      background: 'var(--bg-2)', padding: 'var(--section-py) 0',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(200,240,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(200,240,0,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px', pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(200,240,0,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeader
          overline={l.overline}
          title={l.title}
          titleAccent={l.titleAccent}
          subtitle={l.subtitle}
          center
          isAr={isAr}
        />

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="calc-card"
          style={{
            maxWidth: 800, margin: '0 auto',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)', padding: 48,
            direction: dir, transition: 'box-shadow 0.3s ease',
          }}
          whileHover={{ boxShadow: '0 0 60px rgba(200,240,0,0.08)' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Field 1: Budget */}
            <div>
              <label style={labelStyle}>{l.budgetLabel}</label>
              <div style={{
                width: '100%', padding: '14px 16px', minHeight: 48,
                background: 'var(--bg-2)', border: '1px solid var(--border-2)',
                borderRadius: 'var(--r-md)', color: 'var(--accent)',
                fontFamily: font, fontSize: 20, fontWeight: 700,
                direction: dir, textAlign: isAr ? 'right' : 'left',
              }}>
                {formatNum(budget)} {isAr ? 'ج.م' : 'EGP'}
              </div>
              <input
                type="range"
                min={5000} max={500000} step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="calc-slider"
                style={{
                  width: '100%', marginTop: 12, height: 6,
                  appearance: 'none', WebkitAppearance: 'none',
                  background: `linear-gradient(to ${isAr ? 'left' : 'right'}, #c8f000 ${sliderPercent}%, var(--bg-2) ${sliderPercent}%)`,
                  borderRadius: 4, outline: 'none', cursor: 'pointer',
                }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginTop: 6,
                fontFamily: font, fontSize: 12, color: 'var(--t4)',
              }}>
                <span>5,000</span>
                <span>500,000</span>
              </div>
            </div>

            {/* Field 2: Area */}
            <div>
              <label style={labelStyle}>{l.areaLabel}</label>
              <select value={area} onChange={(e) => setArea(e.target.value)} style={selectStyle}>
                <option value="" disabled>{l.areaPlaceholder}</option>
                {Object.entries(AREA_BENCHMARKS).map(([key, val]) => (
                  <option key={key} value={key}>{isAr ? val.name_ar : val.name_en}</option>
                ))}
              </select>
            </div>

            {/* Field 3: Property Type */}
            <div>
              <label style={labelStyle}>{l.propertyLabel}</label>
              <select value={propertyType} onChange={(e) => setPropertyType(Number(e.target.value))} style={selectStyle}>
                {propertyTypes.map((pt, i) => (
                  <option key={i} value={i}>{pt}</option>
                ))}
              </select>
            </div>

            {/* Field 4: Platform (disabled) */}
            <div>
              <label style={labelStyle}>{l.platformLabel}</label>
              <div style={{
                width: '100%', padding: '14px 16px', minHeight: 48,
                background: 'var(--bg-2)', border: '1px solid var(--border-2)',
                borderRadius: 'var(--r-md)', color: 'var(--t3)',
                fontFamily: font, fontSize: 15, direction: dir,
                display: 'flex', alignItems: 'center', gap: 10, opacity: 0.7,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#888"/>
                </svg>
                Meta Ads
              </div>
              <p style={{ fontFamily: font, fontSize: 12, color: 'var(--t4)', marginTop: 6 }}>
                {l.platformNote}
              </p>
            </div>

            {/* Calculate Button */}
            <motion.button
              onClick={handleCalculate}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200,240,0,0.25)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '16px 24px', marginTop: 8,
                background: area ? 'var(--accent)' : 'rgba(200,240,0,0.3)',
                color: '#000', fontFamily: font, fontWeight: 700, fontSize: 18,
                borderRadius: 'var(--r-full)', border: 'none',
                cursor: area ? 'pointer' : 'not-allowed',
                transition: 'var(--transition)',
              }}
            >
              {l.calculate}
            </motion.button>
          </div>
        </motion.div>

        {/* ─── Results ─── */}
        <AnimatePresence>
          {showResults && bench && (
            <motion.div
              ref={resultsRef}
              key={resultsKey}
              variants={stagger(0.12)}
              initial="hidden"
              animate="visible"
              className="calc-results"
              style={{ maxWidth: 800, margin: '40px auto 0', direction: dir }}
            >
              {/* Card 1: Market Benchmarks */}
              <motion.div variants={fadeUp} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', padding: 32,
                borderLeft: isAr ? 'none' : '4px solid var(--accent)',
                borderRight: isAr ? '4px solid var(--accent)' : 'none',
                marginBottom: 20,
              }}>
                <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: 18, color: 'var(--t1)', marginBottom: 24 }}>
                  <TrendingUp size={18} color="var(--accent)" style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
                  {l.benchmarkTitle(areaName)}
                </h3>

                {/* CPL Range bar */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: font, fontSize: 13, color: 'var(--t3)', marginBottom: 8 }}>
                    <span>{l.cplRange}</span>
                    <span>{bench.cpl_residential} - {bench.cpl_commercial} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div style={{ position: 'relative', height: 8, background: 'var(--bg-2)', borderRadius: 4 }}>
                    <div style={{
                      position: 'absolute', height: '100%', borderRadius: 4,
                      background: 'linear-gradient(90deg, #22c55e, #c8f000, #f97316)',
                      left: 0, right: 0,
                    }} />
                    <div style={{
                      position: 'absolute', top: -4,
                      left: `${((cplForType - bench.cpl_residential) / (bench.cpl_commercial - bench.cpl_residential)) * 100}%`,
                      width: 16, height: 16, borderRadius: '50%',
                      background: '#fff', border: '3px solid var(--accent)',
                      transform: 'translateX(-50%)',
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: font, fontSize: 11, color: 'var(--t4)', marginTop: 4 }}>
                    <span>{bench.cpl_residential}</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{l.avgCpl}: {cplForType}</span>
                    <span>{bench.cpl_commercial}</span>
                  </div>
                </div>

                <div style={{ fontFamily: font, fontSize: 14, color: 'var(--t2)' }}>
                  {l.convRange}: {bench.conv_min}% - {bench.conv_max}%
                </div>
              </motion.div>

              {/* Card 2: 3 Metrics */}
              <motion.div variants={fadeUp} className="calc-metrics" style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20,
              }}>
                {/* Leads */}
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', padding: 24, textAlign: 'center',
                }}>
                  <div style={{ fontFamily: font, fontSize: 13, color: 'var(--t3)', marginBottom: 8 }}>
                    {l.expectedLeads}
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, color: 'var(--accent)', lineHeight: 1 }}>
                    <AnimatedNumber value={leadsAvg} started={showResults} />
                  </div>
                  <div style={{ fontFamily: font, fontSize: 12, color: 'var(--t4)', marginTop: 8 }}>
                    {l.rangeFrom} {leadsMin} {l.rangeTo} {leadsMax}
                  </div>
                </div>

                {/* Deals */}
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', padding: 24, textAlign: 'center',
                }}>
                  <div style={{ fontFamily: font, fontSize: 13, color: 'var(--t3)', marginBottom: 8 }}>
                    {l.expectedDeals}
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, color: 'var(--accent)', lineHeight: 1 }}>
                    <AnimatedNumber value={dealsAvg} started={showResults} />
                  </div>
                  <div style={{ fontFamily: font, fontSize: 12, color: 'var(--t4)', marginTop: 8 }}>
                    {l.rangeFrom} {dealsMin} {l.rangeTo} {dealsMax}
                  </div>
                  <div style={{ fontFamily: font, fontSize: 10, color: 'var(--t4)', marginTop: 6, lineHeight: 1.4 }}>
                    {l.dealsDisclaimer}
                  </div>
                </div>

                {/* CPL */}
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', padding: 24, textAlign: 'center',
                }}>
                  <div style={{ fontFamily: font, fontSize: 13, color: 'var(--t3)', marginBottom: 8 }}>
                    {l.expectedCpl}
                  </div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 36, color: cplColor, lineHeight: 1 }}>
                    <AnimatedNumber value={cplAvg} started={showResults} />
                  </div>
                  <div style={{ fontFamily: font, fontSize: 12, color: 'var(--t4)', marginTop: 8 }}>
                    {isAr ? 'ج.م / ليد' : 'EGP / lead'}
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Smart Diagnosis */}
              <motion.div variants={fadeUp} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', padding: 32, marginBottom: 20,
              }}>
                <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: 18, color: 'var(--t1)', marginBottom: 20 }}>
                  <Target size={18} color="var(--accent)" style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
                  {l.diagnosisTitle}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {/* CPL Assessment */}
                  <DiagCard
                    color={cplColor}
                    icon={<DollarSign size={16} />}
                    text={cplAvg < 250 ? l.cplExcellent(areaName) : cplAvg <= 350 ? l.cplGood(areaName) : l.cplHigh(areaName)}
                    font={font}
                  />

                  {/* CTR Tips */}
                  <DiagCard color="#3b82f6" icon={<AlertCircle size={16} />} text={l.ctrTip1} font={font} />
                  <DiagCard color="#3b82f6" icon={<AlertCircle size={16} />} text={l.ctrTip2} font={font} />

                  {/* Quality */}
                  <DiagCard color="#eab308" icon={<Target size={16} />} text={l.qualityTip} font={font} />

                  {/* Budget Recommendation */}
                  <DiagCard
                    color="#8b5cf6"
                    icon={<DollarSign size={16} />}
                    text={budget < 30000 ? l.budgetSmall : budget <= 100000 ? l.budgetMedium : l.budgetLarge}
                    font={font}
                  />
                </div>
              </motion.div>

              {/* Card 4: Area Tips */}
              <motion.div variants={fadeUp} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)', padding: 32,
                borderLeft: isAr ? 'none' : '4px solid var(--accent)',
                borderRight: isAr ? '4px solid var(--accent)' : 'none',
                marginBottom: 48,
              }}>
                <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: 18, color: 'var(--t1)', marginBottom: 16 }}>
                  <Lightbulb size={18} color="var(--accent)" style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
                  {l.areaTipsTitle}
                </h3>
                <p style={{ fontFamily: font, fontSize: 15, color: 'var(--t2)', lineHeight: 1.8 }}>
                  {isAr ? AREA_TIPS_AR[area] : AREA_TIPS_EN[area]}
                </p>
              </motion.div>

              {/* Bottom CTA */}
              <motion.div variants={fadeUp} style={{ textAlign: 'center', paddingTop: 32, borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: font, fontWeight: 700, fontSize: 22, color: 'var(--t1)', marginBottom: 12 }}>
                  {l.ctaTitle}
                </h3>
                <p style={{ fontFamily: font, fontSize: 16, color: 'var(--t2)', marginBottom: 28, lineHeight: 1.7 }}>
                  {l.ctaSub}
                </p>
                <motion.div
                  animate={{ boxShadow: ['0 0 0 0 rgba(200,240,0,0)', '0 0 40px 8px rgba(200,240,0,0.2)', '0 0 0 0 rgba(200,240,0,0)'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ display: 'inline-block', borderRadius: 'var(--r-full)' }}
                >
                  <PrimaryButton label={l.ctaBtn} onClick={() => openForm('campaign')} size="lg" />
                </motion.div>
                <p style={{ fontFamily: font, fontSize: 14, color: 'var(--t4)', marginTop: 20 }}>
                  {l.ctaTrust}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #c8f000;
          cursor: pointer;
          border: 3px solid #000;
          margin-top: -7px;
        }
        .calc-slider::-moz-range-thumb {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: #c8f000;
          cursor: pointer;
          border: 3px solid #000;
        }
        @media (max-width: 1024px) {
          .calc-card { padding: 32px !important; }
        }
        @media (max-width: 768px) {
          .calc-card { padding: 20px !important; }
          .calc-metrics { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* ─── Diagnosis Card ─── */
const DiagCard = ({ color, icon, text, font }: { color: string; icon: React.ReactNode; text: string; font: string }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 12,
    padding: '14px 16px', borderRadius: 'var(--r-md)',
    background: 'var(--bg-2)', borderInlineStart: `3px solid ${color}`,
  }}>
    <span style={{ color, flexShrink: 0, marginTop: 2 }}>{icon}</span>
    <span style={{ fontFamily: font, fontSize: 14, color: 'var(--t2)', lineHeight: 1.7 }}>{text}</span>
  </div>
);

export default Calculator;
