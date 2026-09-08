'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useSite } from '@/context/SiteContext';
import { Label } from '@/components/ui';

interface FormData {
  name: string; age: string; gender: string; mobileNumber: string;
  height: string; weight: string; experienceLevel: string; fitnessGoal: string;
  dietPreference: string; profession: string; commitmentLevel: string;
  startDate: string; package: string; foundVia: string;
}

const steps = ['About you', 'Baseline', 'Preferences', 'Review'];
const labelCls = 'block text-[12px] font-semibold text-zinc-400 mb-2';

export default function RegistrationPage() {
  const { brand, addRegistration } = useSite();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '', age: '', gender: '', mobileNumber: '', height: '', weight: '',
    experienceLevel: '', fitnessGoal: '', dietPreference: '', profession: '',
    commitmentLevel: '', startDate: '', package: '', foundVia: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRegistration(formData);
    const message = [
      `Hello ${brand.brandName} — I'd like to apply for coaching.`,
      ``,
      `Name: ${formData.name} | Age: ${formData.age} | ${formData.gender} | ${formData.mobileNumber}`,
      `Height: ${formData.height}cm | Weight: ${formData.weight}kg | Experience: ${formData.experienceLevel} | Goal: ${formData.fitnessGoal}`,
      `Diet: ${formData.dietPreference} | Work: ${formData.profession} | Availability: ${formData.commitmentLevel}`,
      `Start: ${formData.startDate} | Plan: ${formData.package} | Found via: ${formData.foundVia}`,
    ].join('\n');
    const num = brand.whatsapp.replace(/\D/g, '') || '919177385668';
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(message)}`, '_blank');
    setTimeout(() => { window.location.href = '/'; }, 1500);
  };

  return (
    <main className="min-h-screen">
      <div className="pt-36 md:pt-40 pb-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <Label index={`Step ${currentStep + 1} / 4`}>Application</Label>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-[-0.025em] text-white leading-[1.02]">
              Apply for coaching.
            </h1>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              Two minutes. A coach reviews every application personally.
            </p>
          </motion.div>

          <div className="mt-8 flex items-center gap-1.5 sm:gap-2">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 min-w-0">
                <div className={`h-1 rounded-full ${i <= currentStep ? 'bg-white' : 'bg-white/10'}`} />
                <p className={`mt-2 text-[10px] sm:text-[11px] font-semibold truncate ${i <= currentStep ? 'text-zinc-200' : 'text-zinc-600'}`}>{s}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="card mt-6 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2"><label className={labelCls}>Full name *</label><input name="name" value={formData.name} onChange={onChange} required className="field" placeholder="Your name" /></div>
                  <div><label className={labelCls}>Age *</label><input type="number" name="age" value={formData.age} onChange={onChange} required className="field" placeholder="28" /></div>
                  <div><label className={labelCls}>Gender *</label><select name="gender" value={formData.gender} onChange={onChange} required className="field"><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Mobile *</label><input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={onChange} required className="field" placeholder="+91" /></div>
                </motion.div>
              )}
              {currentStep === 1 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Height (cm) *</label><input type="number" name="height" value={formData.height} onChange={onChange} required className="field" placeholder="175" /></div>
                  <div><label className={labelCls}>Weight (kg) *</label><input type="number" name="weight" value={formData.weight} onChange={onChange} required className="field" placeholder="82" /></div>
                  <div><label className={labelCls}>Experience *</label><select name="experienceLevel" value={formData.experienceLevel} onChange={onChange} required className="field"><option value="">Select</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
                  <div><label className={labelCls}>Goal *</label><select name="fitnessGoal" value={formData.fitnessGoal} onChange={onChange} required className="field"><option value="">Select</option><option>Weight Loss</option><option>Muscle Gain</option><option>Strength</option><option>Overall Transformation</option></select></div>
                </motion.div>
              )}
              {currentStep === 2 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className={labelCls}>Diet *</label><select name="dietPreference" value={formData.dietPreference} onChange={onChange} required className="field"><option value="">Select</option><option>Vegetarian</option><option>Non-Vegetarian</option><option>Vegan</option><option>No Preference</option></select></div>
                  <div><label className={labelCls}>Work *</label><input name="profession" value={formData.profession} onChange={onChange} required className="field" placeholder="What do you do?" /></div>
                  <div><label className={labelCls}>Availability *</label><select name="commitmentLevel" value={formData.commitmentLevel} onChange={onChange} required className="field"><option value="">Select</option><option>6–7 days/week</option><option>4–5 days/week</option><option>2–3 days/week</option><option>1–2 days/week</option></select></div>
                  <div><label className={labelCls}>Start date *</label><input type="date" name="startDate" value={formData.startDate} onChange={onChange} required className="field" /></div>
                  <div><label className={labelCls}>Plan *</label><select name="package" value={formData.package} onChange={onChange} required className="field"><option value="">Select</option><option>3 Months — ₹12,000</option><option>6 Months — ₹20,000</option><option>9 Months — ₹30,000</option><option>12 Months — ₹35,000</option></select></div>
                  <div><label className={labelCls}>Found us via *</label><select name="foundVia" value={formData.foundVia} onChange={onChange} required className="field"><option value="">Select</option><option>Instagram</option><option>YouTube</option><option>Referral</option><option>Google</option><option>Other</option></select></div>
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                  <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                    {Object.entries(formData).filter(([, v]) => v).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
                        <dt className="text-zinc-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</dt>
                        <dd className="text-zinc-100 font-medium text-right truncate">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 flex items-start gap-2 text-sm text-zinc-400">
                    <Check size={15} className="mt-0.5 text-[#d7f542] shrink-0" />
                    Submitting opens WhatsApp with your application pre-filled.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
              {currentStep < 3 ? (
                <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="btn-primary">
                  Continue <ArrowRight size={16} strokeWidth={2.25} />
                </button>
              ) : (
                <button type="submit" className="btn-primary">
                  Submit application <ArrowRight size={16} strokeWidth={2.25} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
