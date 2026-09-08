export interface TransformationImage {
  id: string;
  url: string;
  type: 'before' | 'progress' | 'after';
  month?: number;
  caption?: string;
}

export interface ClientTransformation {
  id: string;
  name: string;
  photos: TransformationImage[];
  beforeWeight: number;
  afterWeight: number;
  startDate: string;
  endDate: string;
  duration: number; // in months
  goal: string;
  currentPhase: string;
  trainingConsistency: number; // percentage
  progressPercentage: number;
  journeyDescription: string;
  verified: boolean;
  testimonial?: string;
  profilePhoto?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
  duration: string;
  price?: string;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientPhoto: string;
  transformation: string;
  testimonial: string;
  verified: boolean;
}

export interface Registration {
  id: string;
  name: string;
  age: string;
  gender: string;
  mobileNumber: string;
  height: string;
  weight: string;
  experienceLevel: string;
  fitnessGoal: string;
  dietPreference: string;
  profession: string;
  commitmentLevel: string;
  startDate: string;
  package: string;
  foundVia: string;
  submittedAt: string;
  status?: 'New' | 'Contacted' | 'Enrolled' | 'Archived';
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
}

export interface HeroStatistic {
  number: string;
  label: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  stats: HeroStatistic[];
}

export interface BannerSettings {
  enabled: boolean;
  text: string;
  linkText?: string;
  linkUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
}

export interface AboutSettings {
  title: string;
  subtitle: string;
  story: string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
  team: TeamMember[];
}

