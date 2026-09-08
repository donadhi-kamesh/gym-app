import { ClientTransformation, Program, Testimonial } from '@/types';

export const homeStatistics = [
  { number: '500+', label: 'Transformations' },
  { number: '10,000+', label: 'Progress Photos' },
  { number: '95%', label: 'Client Satisfaction' },
];

export const clients: ClientTransformation[] = [
  {
    id: '1',
    name: 'Maruthi',
    verified: true,
    beforeWeight: 58,
    afterWeight: 48,
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    duration: 4,
    goal: 'Weight Loss & Muscle Definition',
    currentPhase: 'Post-Transformation Maintenance',
    trainingConsistency: 92,
    progressPercentage: 82,
    journeyDescription: 'Stop saying you don\'t have time. Start making time for the version of yourself you want to become.',
    profilePhoto: '/placeholders/image-11.svg',
    testimonial: 'This program changed my life. The consistency and support made all the difference.',
    photos: [
      {
        id: 'p1-before',
        url: '/placeholders/image-12.svg',
        type: 'before',
        caption: 'Starting Point'
      },
      {
        id: 'p1-progress1',
        url: '/placeholders/image-13.svg',
        type: 'progress',
        month: 1,
        caption: 'Month 1 - 2kg Loss'
      },
      {
        id: 'p1-progress2',
        url: '/placeholders/image-14.svg',
        type: 'progress',
        month: 2,
        caption: 'Month 2 - 4kg Loss'
      },
      {
        id: 'p1-progress3',
        url: '/placeholders/image-15.svg',
        type: 'progress',
        month: 3,
        caption: 'Month 3 - 7kg Loss'
      },
      {
        id: 'p1-after',
        url: '/placeholders/image-16.svg',
        type: 'after',
        caption: 'Final Result - 10kg Transformation'
      },
    ],
  },
  {
    id: '2',
    name: 'Arjun',
    verified: true,
    beforeWeight: 82,
    afterWeight: 72,
    startDate: '2024-02-01',
    endDate: '2024-06-01',
    duration: 4,
    goal: 'Muscle Building & Strength',
    currentPhase: 'Advanced Training',
    trainingConsistency: 95,
    progressPercentage: 88,
    journeyDescription: 'Transform your body, transform your mind. Every rep counts.',
    profilePhoto: '/placeholders/image-17.svg',
    testimonial: 'Incredible program. The structured approach and nutrition guidance were game-changers.',
    photos: [
      {
        id: 'p2-before',
        url: '/placeholders/image-18.svg',
        type: 'before',
        caption: 'Starting Point'
      },
      {
        id: 'p2-progress1',
        url: '/placeholders/image-19.svg',
        type: 'progress',
        month: 2,
        caption: 'Month 2 - First Gains'
      },
      {
        id: 'p2-after',
        url: '/placeholders/image-20.svg',
        type: 'after',
        caption: 'Final Result - Lean Muscle Definition'
      },
    ],
  },
  {
    id: '3',
    name: 'Priya',
    verified: true,
    beforeWeight: 65,
    afterWeight: 55,
    startDate: '2023-12-01',
    endDate: '2024-04-01',
    duration: 4,
    goal: 'Overall Body Transformation',
    currentPhase: 'Maintenance & Toning',
    trainingConsistency: 90,
    progressPercentage: 85,
    journeyDescription: 'Your body is a reflection of your discipline. Make it a masterpiece.',
    profilePhoto: '/placeholders/image-21.svg',
    testimonial: 'The best investment in myself. Amazing results and wonderful coaching.',
    photos: [
      {
        id: 'p3-before',
        url: '/placeholders/image-22.svg',
        type: 'before',
        caption: 'Starting Point'
      },
      {
        id: 'p3-progress1',
        url: '/placeholders/image-23.svg',
        type: 'progress',
        month: 2,
        caption: 'Month 2 - Visible Changes'
      },
      {
        id: 'p3-progress2',
        url: '/placeholders/image-24.svg',
        type: 'progress',
        month: 3,
        caption: 'Month 3 - Major Transformation'
      },
      {
        id: 'p3-after',
        url: '/placeholders/image-25.svg',
        type: 'after',
        caption: 'Final Result - Confidence Achieved'
      },
    ],
  },
];

export const programs: Program[] = [
  {
    id: '1',
    name: '3 Month Package',
    description: '3 months of personalized coaching with diet and workout plans.',
    image: '/placeholders/image-7.svg',
    duration: '3 Months',
    ctaText: 'Choose 3 Months - ₹12,000',
    price: '₹12,000',
  },
  {
    id: '2',
    name: '6 Month Package',
    description: '6 months of dedicated coaching with advanced tracking and support.',
    image: '/placeholders/image-8.svg',
    duration: '6 Months',
    ctaText: 'Choose 6 Months - ₹20,000',
    price: '₹20,000',
  },
  {
    id: '3',
    name: '9 Month Package',
    description: '9 months of comprehensive transformation with full support.',
    image: '/placeholders/image-9.svg',
    duration: '9 Months',
    ctaText: 'Choose 9 Months - ₹30,000',
    price: '₹30,000',
  },
  {
    id: '4',
    name: '12 Month Package',
    description: 'Full year of premium coaching for complete life transformation.',
    image: '/placeholders/image-10.svg',
    duration: '12 Months',
    ctaText: 'Choose 12 Months - ₹35,000',
    price: '₹35,000',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Maruthi',
    clientPhoto: '/placeholders/image-11.svg',
    transformation: '58kg → 48kg (4 months)',
    testimonial: 'Stop saying you don\'t have time. This program taught me to make time for myself and it changed everything.',
    verified: true,
  },
  {
    id: '2',
    clientName: 'Arjun',
    clientPhoto: '/placeholders/image-17.svg',
    transformation: '82kg → 72kg with muscle gain',
    testimonial: 'The combination of strength training and nutrition guidance is unbeatable. Results speak for themselves.',
    verified: true,
  },
  {
    id: '3',
    clientName: 'Priya',
    clientPhoto: '/placeholders/image-21.svg',
    transformation: '65kg → 55kg (4 months)',
    testimonial: 'Best investment in my health and confidence. The coaching style is professional yet motivating.',
    verified: true,
  },
];
