import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import { Lang } from '@/hooks/useLanguage';
import SectionHeader from '@/components/SectionHeader';

const en = {
  overline: "SEE IT IN ACTION",
  title: "Watch Sky Leads",
  titleAccent: "In Action.",
  sub: "2-minute overview of the Sky Leads platform and how AI transforms your campaigns.",
};

const ar = {
  overline: "شوفه بنفسك",
  title: "شوف Sky Leads",
  titleAccent: "بتشتغل.",
  sub: "نظرة عامة ٢ دقيقة على منصة Sky Leads وإزاي الـ AI بيحول الكامبين بتاعك.",
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
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            marginTop: 56,
            paddingBottom: '56.25%',
            height: 0,
            overflow: 'hidden',
            borderRadius: 'var(--r-lg)',
            border: '1px solid var(--border)',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/s3zHhFdNg-E?rel=0&modestbranding=1&showinfo=0"
            title="Sky Leads — AI Real Estate Marketing System"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 'var(--r-lg)',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
