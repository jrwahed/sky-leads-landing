export const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay }
  }
});

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const slideLeft = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const slideRight = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export const viewport = { once: true, margin: "-80px" } as const;
