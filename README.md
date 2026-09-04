# Team Dinesh - Premium Fitness Transformation Website

A modern, premium, fully responsive fitness transformation platform built with Next.js, React, Tailwind CSS, and Framer Motion. This complete website showcases verified client transformations, premium fitness programs, and provides an admin dashboard for managing content.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Development server runs on `http://localhost:3000`

## ✨ Project Features

- ✅ **Hero Section** with animated statistics and CTA buttons
- ✅ **Transformation Gallery** with image carousel and before/after stats
- ✅ **Individual Transformation Pages** with detailed client profiles
- ✅ **Image Modal Viewer** for fullscreen viewing
- ✅ **Transformation Timeline** visualization
- ✅ **Premium Programs Page** with 5 detailed programs and FAQ
- ✅ **Client Testimonials** with verified badges
- ✅ **About Page** with mission, values, team, and company stats
- ✅ **Contact Page** with form and contact information
- ✅ **Admin Dashboard** for managing clients, programs, and testimonials
- ✅ **Fully Responsive** mobile-first design (mobile, tablet, desktop)
- ✅ **Dark Premium Aesthetic** with green and orange accents
- ✅ **Smooth Animations** with Framer Motion throughout
- ✅ **TypeScript** for full type safety
- ✅ **Realistic Sample Data** with 3 client transformations

## 📂 Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Home page
│   ├── layout.tsx                    # Root layout with Navbar
│   ├── about/page.tsx                # About page
│   ├── contact/page.tsx              # Contact page with form
│   ├── admin/page.tsx                # Admin dashboard
│   ├── programs/page.tsx             # Programs showcase
│   ├── transformations/
│   │   ├── page.tsx                  # Transformations gallery
│   │   └── [id]/page.tsx             # Individual transformation
│   └── globals.css                   # Global styles
├── components/
│   ├── Navbar.tsx                    # Navigation bar
│   ├── Hero.tsx                      # Hero section
│   ├── ImageCarousel.tsx             # Image carousel
│   ├── ImageModal.tsx                # Fullscreen viewer
│   ├── ClientProfile.tsx             # Client stats
│   ├── StatsCard.tsx                 # Stat component
│   ├── TransformationTimeline.tsx   # Timeline visualization
│   ├── ProgramCard.tsx               # Program card
│   ├── TestimonialCard.tsx           # Testimonial card
│   ├── CTASection.tsx                # Call-to-action
│   └── Footer.tsx                    # Footer
├── data/clients.ts                   # Sample data
├── types/index.ts                    # TypeScript types
└── utils/format.ts                   # Utility functions
```

## 🎯 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero and featured content |
| Transformations | `/transformations` | Gallery of all client transformations |
| Transformation Detail | `/transformations/[id]` | Individual transformation with carousel |
| Programs | `/programs` | Premium fitness programs with FAQ |
| About | `/about` | Company mission, values, team, stats |
| Contact | `/contact` | Contact form and information |
| Admin | `/admin` | Dashboard for managing content |

## 🎨 Design Highlights

- **Dark Premium Theme** - Black background with subtle gradients
- **Green Success Indicators** - Verification badges and highlights
- **Orange Achievement Numbers** - Weight loss and progress metrics
- **Responsive Grid Layouts** - Adapts to all screen sizes
- **Smooth Animations** - Framer Motion throughout
- **Professional Typography** - Bold, modern headings
- **Glassmorphism Effects** - Subtle backdrop blur effects

## 🛠️ Technology Stack

- **Framework**: Next.js 16.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Turbopack

## 📦 Dependencies

```json
{
  "next": "^16.3.2",
  "react": "^19.0.0",
  "framer-motion": "^11.x",
  "lucide-react": "^latest",
  "tailwindcss": "^4.x",
  "typescript": "^5.x"
}
```

## 🚀 Build & Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms

- **Netlify**: Connect GitHub repo directly
- **AWS Amplify**: Follow AWS deployment guide
- **Docker**: Create Dockerfile for containerization

## 📊 Sample Data

The project includes realistic sample data:

### Clients (3)
- **Maruthi**: 58kg → 48kg (4 months, 82% progress)
- **Arjun**: 82kg → 72kg with muscle gain (95% consistency)
- **Priya**: 65kg → 55kg (4 months, 85% progress)

### Programs (5)
1. Weight Loss (12 weeks)
2. Muscle Building (16 weeks)
3. Strength Training (12 weeks)
4. Body Transformation (20 weeks)
5. Personalized Coaching (Custom)

### Features Included
- Expert Coaching
- Nutrition Plans
- Progress Tracking
- 24/7 Support
- Workout Plans
- Community Access

## 🎯 Customization Guide

### Update Brand Information

**Change brand name:**
```typescript
// src/components/Navbar.tsx - Line 21
<span className="text-white font-bold text-xl">Team Dinesh</span>

// src/app/layout.tsx - Line 16
title: "Team Dinesh - Fitness Transformations"
```

**Update contact details:**
```typescript
// src/components/CTASection.tsx
Phone: +91 91773 85668
Email: info@teamdinesh.com
WhatsApp: +91 91773 85668
```

### Add New Client

**Edit `src/data/clients.ts`:**
```typescript
{
  id: '4',
  name: 'New Client Name',
  beforeWeight: 80,
  afterWeight: 70,
  // ... other fields
}
```

### Add New Program

**Edit `src/data/clients.ts`:**
```typescript
{
  id: '6',
  name: 'New Program',
  description: 'Program description',
  image: 'image-url',
  duration: '12 Weeks',
  ctaText: 'Start Program'
}
```

## 🔐 Admin Dashboard

**Access:** Navigate to `/admin`

**Current Features:**
- View all clients
- Add new clients
- Edit client information
- View transformation statistics
- Manage programs (UI ready, backend integration needed)
- Manage testimonials (UI ready, backend integration needed)

**Before Production:**
- Add authentication/login
- Connect to database (MongoDB, PostgreSQL, etc.)
- Implement backend API
- Add file upload for images
- Add email notifications

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile**: < 640px (single column, optimized touches)
- **Tablet**: 640px - 1024px (2-column layouts)
- **Desktop**: > 1024px (full multi-column layouts)

## 🐛 Troubleshooting

**Port 3000 Already in Use:**
```bash
# Kill process using port 3000
npx kill-port 3000
npm run dev
```

**Clear Cache & Rebuild:**
```bash
rm -rf .next
npm run build
npm run dev
```

**Module Not Found Errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Key Files to Modify

1. **Brand & Contact**: `src/components/Navbar.tsx`, `src/components/CTASection.tsx`, `src/components/Footer.tsx`
2. **Sample Data**: `src/data/clients.ts`
3. **Page Content**: `src/app/*/page.tsx` files
4. **Styles**: Tailwind classes throughout components
5. **Theme Colors**: Update color utilities (green-400, orange-400, etc.)

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

## 📄 License

This project is open for modification and deployment.

---

**Built with ❤️ for fitness transformation success**

Created: August 2026

