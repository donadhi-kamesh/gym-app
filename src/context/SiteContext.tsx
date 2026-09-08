'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BrandSettings,
  HeroSettings,
  BannerSettings,
  Program,
  ClientTransformation,
  Testimonial,
  AboutSettings,
  Registration,
} from '@/types';
import {
  clients as defaultClients,
  programs as defaultPrograms,
  testimonials as defaultTestimonials,
  homeStatistics as defaultStats,
} from '@/data/clients';

export const defaultBrandSettings: BrandSettings = {
  brandName: 'Team Dinesh',
  tagline: 'Premium Fitness Transformation Platform',
  phone: '+91 91773 85668',
  whatsapp: '919177385668',
  email: 'info@teamdinesh.com',
  address: 'Hyderabad, Telangana, India',
  instagramUrl: 'https://instagram.com',
  youtubeUrl: 'https://youtube.com',
  facebookUrl: 'https://facebook.com',
};

export const defaultHeroSettings: HeroSettings = {
  title: 'Transform Your Body, Mind & Life',
  subtitle: 'Scientifically-backed online fitness & nutrition coaching tailored specifically for your lifestyle and personal goals.',
  primaryCtaText: 'Start Transformation',
  secondaryCtaText: 'View Success Stories',
  stats: defaultStats,
};

export const defaultBannerSettings: BannerSettings = {
  enabled: true,
  text: '🔥 New Batch Starting Soon! Special Discount on 6 & 12 Month Transformation Packages.',
  linkText: 'Claim Offer',
  linkUrl: '/register',
};

export const defaultAboutSettings: AboutSettings = {
  title: 'About Team Dinesh',
  subtitle: 'Empowering individuals to achieve their dream physique through sustainable nutrition and progressive strength training.',
  story: 'Founded with a passion for real, long-lasting physical and mental transformations, Team Dinesh has helped hundreds of clients lose weight, build lean muscle, and regain confidence.',
  mission: 'To make sustainable fitness accessible, enjoyable, and life-changing for everyone.',
  vision: 'To build India\'s most trusted community for verified body transformations.',
  values: [
    { title: 'Consistency Over Perfection', description: 'Small daily habits compound into extraordinary long-term transformation.' },
    { title: 'Scientific Approach', description: 'No fad diets or extreme workouts — just evidence-based training and macro nutrition.' },
    { title: '1-on-1 Accountability', description: 'Personalized guidance, check-ins, and support every single week.' },
  ],
  team: [
    {
      id: 't1',
      name: 'Dinesh',
      role: 'Head Fitness Coach & Founder',
      bio: 'Certified Master Trainer with 7+ years of experience transforming 500+ lives.',
      photo: '/placeholders/image-11.svg',
    },
  ],
};

interface SiteContextType {
  brand: BrandSettings;
  hero: HeroSettings;
  banner: BannerSettings;
  programs: Program[];
  clients: ClientTransformation[];
  testimonials: Testimonial[];
  about: AboutSettings;
  registrations: Registration[];
  adminPasscode: string;

  updateBrand: (settings: Partial<BrandSettings>) => void;
  updateHero: (settings: Partial<HeroSettings>) => void;
  updateBanner: (settings: Partial<BannerSettings>) => void;

  setPrograms: (programs: Program[]) => void;
  addProgram: (program: Program) => void;
  updateProgram: (id: string, program: Partial<Program>) => void;
  deleteProgram: (id: string) => void;

  setClients: (clients: ClientTransformation[]) => void;
  addClient: (client: ClientTransformation) => void;
  updateClient: (id: string, client: Partial<ClientTransformation>) => void;
  deleteClient: (id: string) => void;

  setTestimonials: (testimonials: Testimonial[]) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  updateAbout: (settings: Partial<AboutSettings>) => void;

  addRegistration: (registration: Omit<Registration, 'id' | 'submittedAt'>) => void;
  updateRegistrationStatus: (id: string, status: Registration['status']) => void;
  deleteRegistration: (id: string) => void;

  updateAdminPasscode: (passcode: string) => void;
  resetAllToDefault: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brand, setBrandState] = useState<BrandSettings>(defaultBrandSettings);
  const [hero, setHeroState] = useState<HeroSettings>(defaultHeroSettings);
  const [banner, setBannerState] = useState<BannerSettings>(defaultBannerSettings);
  const [programs, setProgramsState] = useState<Program[]>(defaultPrograms);
  const [clients, setClientsState] = useState<ClientTransformation[]>(defaultClients);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(defaultTestimonials);
  const [about, setAboutState] = useState<AboutSettings>(defaultAboutSettings);
  const [registrations, setRegistrationsState] = useState<Registration[]>([]);
  const [adminPasscode, setAdminPasscodeState] = useState<string>('admin123');

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const storedBrand = localStorage.getItem('cms_brand');
      if (storedBrand) setBrandState(JSON.parse(storedBrand));

      const storedHero = localStorage.getItem('cms_hero');
      if (storedHero) setHeroState(JSON.parse(storedHero));

      const storedBanner = localStorage.getItem('cms_banner');
      if (storedBanner) setBannerState(JSON.parse(storedBanner));

      const storedPrograms = localStorage.getItem('cms_programs');
      if (storedPrograms) setProgramsState(JSON.parse(storedPrograms));

      const storedClients = localStorage.getItem('cms_clients') || localStorage.getItem('clients');
      if (storedClients) setClientsState(JSON.parse(storedClients));

      const storedTestimonials = localStorage.getItem('cms_testimonials');
      if (storedTestimonials) setTestimonialsState(JSON.parse(storedTestimonials));

      const storedAbout = localStorage.getItem('cms_about');
      if (storedAbout) setAboutState(JSON.parse(storedAbout));

      const storedRegistrations = localStorage.getItem('cms_registrations') || localStorage.getItem('registrations');
      if (storedRegistrations) setRegistrationsState(JSON.parse(storedRegistrations));

      const storedPasscode = localStorage.getItem('cms_passcode');
      if (storedPasscode) setAdminPasscodeState(storedPasscode);
    } catch (e) {
      console.error('Failed to load CMS state from storage:', e);
    }
  }, []);

  const updateBrand = (settings: Partial<BrandSettings>) => {
    setBrandState((prev) => {
      const updated = { ...prev, ...settings };
      localStorage.setItem('cms_brand', JSON.stringify(updated));
      return updated;
    });
  };

  const updateHero = (settings: Partial<HeroSettings>) => {
    setHeroState((prev) => {
      const updated = { ...prev, ...settings };
      localStorage.setItem('cms_hero', JSON.stringify(updated));
      return updated;
    });
  };

  const updateBanner = (settings: Partial<BannerSettings>) => {
    setBannerState((prev) => {
      const updated = { ...prev, ...settings };
      localStorage.setItem('cms_banner', JSON.stringify(updated));
      return updated;
    });
  };

  const setPrograms = (newPrograms: Program[]) => {
    setProgramsState(newPrograms);
    localStorage.setItem('cms_programs', JSON.stringify(newPrograms));
  };

  const addProgram = (program: Program) => {
    setProgramsState((prev) => {
      const updated = [...prev, program];
      localStorage.setItem('cms_programs', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProgram = (id: string, program: Partial<Program>) => {
    setProgramsState((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...program } : p));
      localStorage.setItem('cms_programs', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProgram = (id: string) => {
    setProgramsState((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem('cms_programs', JSON.stringify(updated));
      return updated;
    });
  };

  const setClients = (newClients: ClientTransformation[]) => {
    setClientsState(newClients);
    localStorage.setItem('cms_clients', JSON.stringify(newClients));
    localStorage.setItem('clients', JSON.stringify(newClients));
  };

  const addClient = (client: ClientTransformation) => {
    setClientsState((prev) => {
      const updated = [client, ...prev];
      localStorage.setItem('cms_clients', JSON.stringify(updated));
      localStorage.setItem('clients', JSON.stringify(updated));
      return updated;
    });
  };

  const updateClient = (id: string, client: Partial<ClientTransformation>) => {
    setClientsState((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...client } : c));
      localStorage.setItem('cms_clients', JSON.stringify(updated));
      localStorage.setItem('clients', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteClient = (id: string) => {
    setClientsState((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      localStorage.setItem('cms_clients', JSON.stringify(updated));
      localStorage.setItem('clients', JSON.stringify(updated));
      return updated;
    });
  };

  const setTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonialsState(newTestimonials);
    localStorage.setItem('cms_testimonials', JSON.stringify(newTestimonials));
  };

  const addTestimonial = (testimonial: Testimonial) => {
    setTestimonialsState((prev) => {
      const updated = [testimonial, ...prev];
      localStorage.setItem('cms_testimonials', JSON.stringify(updated));
      return updated;
    });
  };

  const updateTestimonial = (id: string, testimonial: Partial<Testimonial>) => {
    setTestimonialsState((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, ...testimonial } : t));
      localStorage.setItem('cms_testimonials', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteTestimonial = (id: string) => {
    setTestimonialsState((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      localStorage.setItem('cms_testimonials', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAbout = (settings: Partial<AboutSettings>) => {
    setAboutState((prev) => {
      const updated = { ...prev, ...settings };
      localStorage.setItem('cms_about', JSON.stringify(updated));
      return updated;
    });
  };

  const addRegistration = (regData: Omit<Registration, 'id' | 'submittedAt'>) => {
    const newReg: Registration = {
      ...regData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'New',
    };
    setRegistrationsState((prev) => {
      const updated = [newReg, ...prev];
      localStorage.setItem('cms_registrations', JSON.stringify(updated));
      localStorage.setItem('registrations', JSON.stringify(updated));
      return updated;
    });
  };

  const updateRegistrationStatus = (id: string, status: Registration['status']) => {
    setRegistrationsState((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status } : r));
      localStorage.setItem('cms_registrations', JSON.stringify(updated));
      localStorage.setItem('registrations', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteRegistration = (id: string) => {
    setRegistrationsState((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem('cms_registrations', JSON.stringify(updated));
      localStorage.setItem('registrations', JSON.stringify(updated));
      return updated;
    });
  };

  const updateAdminPasscode = (passcode: string) => {
    setAdminPasscodeState(passcode);
    localStorage.setItem('cms_passcode', passcode);
  };

  const resetAllToDefault = () => {
    localStorage.clear();
    setBrandState(defaultBrandSettings);
    setHeroState(defaultHeroSettings);
    setBannerState(defaultBannerSettings);
    setProgramsState(defaultPrograms);
    setClientsState(defaultClients);
    setTestimonialsState(defaultTestimonials);
    setAboutState(defaultAboutSettings);
    setRegistrationsState([]);
    setAdminPasscodeState('admin123');
  };

  return (
    <SiteContext.Provider
      value={{
        brand,
        hero,
        banner,
        programs,
        clients,
        testimonials,
        about,
        registrations,
        adminPasscode,
        updateBrand,
        updateHero,
        updateBanner,
        setPrograms,
        addProgram,
        updateProgram,
        deleteProgram,
        setClients,
        addClient,
        updateClient,
        deleteClient,
        setTestimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateAbout,
        addRegistration,
        updateRegistrationStatus,
        deleteRegistration,
        updateAdminPasscode,
        resetAllToDefault,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
