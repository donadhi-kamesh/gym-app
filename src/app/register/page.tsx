'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { useSite } from '@/context/SiteContext';

interface FormData {
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
}

const steps = [
  { title: 'Personal Info', description: 'Tell us about yourself' },
  { title: 'Body Metrics', description: 'Your fitness baseline' },
  { title: 'Program Details', description: 'Customization & preference' },
  { title: 'Confirmation', description: 'Review & submit' },
];

export default function RegistrationPage() {
  const { brand, addRegistration } = useSite();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    mobileNumber: '',
    height: '',
    weight: '',
    experienceLevel: '',
    fitnessGoal: '',
    dietPreference: '',
    profession: '',
    commitmentLevel: '',
    startDate: '',
    package: '',
    foundVia: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save lead into CMS store
    addRegistration(formData);

    const message = `
Hello ${brand.brandName}! 🏋️

I've completed my fitness assessment and would like to start my transformation journey!

📋 *Personal Information*
Name: ${formData.name}
Age: ${formData.age}
Gender: ${formData.gender}
Phone: ${formData.mobileNumber}

📊 *Body Metrics*
Height: ${formData.height} cm
Weight: ${formData.weight} kg
Experience: ${formData.experienceLevel}
Goal: ${formData.fitnessGoal}

🎯 *Program Details*
Diet Preference: ${formData.dietPreference}
Profession: ${formData.profession}
Commitment: ${formData.commitmentLevel}
Start Date: ${formData.startDate}
Package: ${formData.package}
Found via: ${formData.foundVia}

Looking forward to my transformation! 💪
    `.trim();

    const whatsappNumber = brand.whatsapp.replace(/\D/g, '') || '919177385668';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Background overlay for registration form focus */}
      <div className="fixed inset-0 bg-black/50 pointer-events-none -z-10" />

      <div className="relative z-10 pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              Start Your Transformation 💪
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join {brand.brandName} and get your personalized fitness program
            </p>
          </motion.div>

          {/* Steps Indicator */}
          <div className="mb-12">
            <div className="flex justify-between mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 mb-3 ${
                      index <= currentStep
                        ? 'bg-gradient-to-r from-green-400 to-emerald-600 text-black font-extrabold'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </motion.div>
                  <p className={`text-center text-sm font-bold ${
                    index <= currentStep ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1 hidden md:block">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-800 p-8 mb-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Info */}
              {currentStep === 0 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                    />
                    <input
                      type="number"
                      name="age"
                      placeholder="Age *"
                      value={formData.age}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    >
                      <option value="">Select Gender *</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number *"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Body Metrics */}
              {currentStep === 1 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Body Metrics
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="number"
                      name="height"
                      placeholder="Height (cm) *"
                      value={formData.height}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                    />
                    <input
                      type="number"
                      name="weight"
                      placeholder="Weight (kg) *"
                      value={formData.weight}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    >
                      <option value="">Experience Level *</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <select
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    >
                      <option value="">Fitness Goal *</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Strength">Strength Training</option>
                      <option value="Endurance">Endurance</option>
                      <option value="Overall Transformation">Overall Transformation</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Program Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Program Customization
                  </h2>

                  <select
                    name="dietPreference"
                    value={formData.dietPreference}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                  >
                    <option value="">Diet Preference *</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="No Preference">No Preference</option>
                  </select>

                  <input
                    type="text"
                    name="profession"
                    placeholder="Your Profession *"
                    value={formData.profession}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                  />

                  <select
                    name="commitmentLevel"
                    value={formData.commitmentLevel}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                  >
                    <option value="">How committed are you? *</option>
                    <option value="Very High - 6-7 days per week">Very High - 6-7 days/week</option>
                    <option value="High - 4-5 days per week">High - 4-5 days/week</option>
                    <option value="Medium - 2-3 days per week">Medium - 2-3 days/week</option>
                    <option value="Low - 1-2 days per week">Low - 1-2 days/week</option>
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    />
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                    >
                      <option value="">Choose Package *</option>
                      <option value="3 Months - ₹12,000">3 Months - ₹12,000</option>
                      <option value="6 Months - ₹20,000">6 Months - ₹20,000</option>
                      <option value="9 Months - ₹30,000">9 Months - ₹30,000</option>
                      <option value="12 Months - ₹35,000">12 Months - ₹35,000</option>
                    </select>
                  </div>

                  <select
                    name="foundVia"
                    value={formData.foundVia}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400 transition-colors"
                  >
                    <option value="">How did you find us? *</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Word of Mouth">Word of Mouth</option>
                    <option value="Google">Google</option>
                    <option value="Other">Other</option>
                  </select>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-8">
                    Review Your Information
                  </h2>

                  <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="text-white font-bold">{formData.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Age</p>
                        <p className="text-white font-bold">{formData.age}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Gender</p>
                        <p className="text-white font-bold">{formData.gender}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Mobile</p>
                        <p className="text-white font-bold">{formData.mobileNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Height</p>
                        <p className="text-white font-bold">{formData.height} cm</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Weight</p>
                        <p className="text-white font-bold">{formData.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Experience</p>
                        <p className="text-white font-bold">{formData.experienceLevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Goal</p>
                        <p className="text-white font-bold">{formData.fitnessGoal}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Diet</p>
                        <p className="text-white font-bold">{formData.dietPreference}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Profession</p>
                        <p className="text-white font-bold">{formData.profession}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Commitment</p>
                        <p className="text-white font-bold">{formData.commitmentLevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Start Date</p>
                        <p className="text-white font-bold">{formData.startDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Package</p>
                        <p className="text-white font-bold">{formData.package}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Found Via</p>
                        <p className="text-white font-bold">{formData.foundVia}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 mt-6">
                    <p className="text-green-400 text-center font-bold">
                      ✓ All information looks good! Click Submit to proceed to WhatsApp.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              <motion.button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  currentStep === 0
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                <ChevronLeft size={20} />
                Previous
              </motion.button>

              <div className="flex gap-4">
                {currentStep < 3 && (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-extrabold rounded-lg transition-all"
                  >
                    Next
                    <ChevronRight size={20} />
                  </motion.button>
                )}

                {currentStep === 3 && (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-black font-extrabold rounded-lg transition-all"
                  >
                    Submit & Open WhatsApp
                  </motion.button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
