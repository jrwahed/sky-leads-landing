import { createContext, useContext, useState, ReactNode } from 'react';

type FormMode = 'campaign' | 'demo';

interface ContactFormContextType {
  isOpen: boolean;
  mode: FormMode;
  openForm: (mode: FormMode) => void;
  closeForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType>({
  isOpen: false,
  mode: 'campaign',
  openForm: () => {},
  closeForm: () => {},
});

export const useContactForm = () => useContext(ContactFormContext);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>('campaign');

  const openForm = (m: FormMode) => {
    setMode(m);
    setIsOpen(true);
  };

  return (
    <ContactFormContext.Provider value={{ isOpen, mode, openForm, closeForm: () => setIsOpen(false) }}>
      {children}
    </ContactFormContext.Provider>
  );
};
