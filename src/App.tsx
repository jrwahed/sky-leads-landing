import { useLanguage } from '@/hooks/useLanguage';
import { ContactFormProvider } from '@/contexts/ContactFormContext';
import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import PainPoints from '@/sections/PainPoints';
import HowItWorks from '@/sections/HowItWorks';
import WhatYouGet from '@/sections/WhatYouGet';
import CRM from '@/sections/CRM';
import Video from '@/sections/Video';
import Calculator from '@/sections/Calculator';
import WhoBenefits from '@/sections/WhoBenefits';
import Reviews from '@/sections/Reviews';
import Clients from '@/sections/Clients';
import FinalCTA from '@/sections/FinalCTA';
import Footer from '@/components/Footer';

const App = () => {
  const { lang, switchLang } = useLanguage();

  return (
    <ContactFormProvider>
      <Navbar lang={lang} switchLang={switchLang} />
      <main style={{ paddingTop: 72 }}>
        <Hero lang={lang} />
        <Video lang={lang} />
        <PainPoints lang={lang} />
        <HowItWorks lang={lang} />
        <Calculator lang={lang} />
        <WhatYouGet lang={lang} />
        <CRM lang={lang} />
        <WhoBenefits lang={lang} />
        <Reviews lang={lang} />
        <Clients lang={lang} />
        <FinalCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <ContactForm lang={lang} />
    </ContactFormProvider>
  );
};

export default App;
