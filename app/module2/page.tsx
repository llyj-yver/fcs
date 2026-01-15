"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, X, Sparkles } from 'lucide-react';
import { useModules } from '../components/ModuleContext';
import Image from "next/image";

// Embedded course data
const saladComponents = {
  base: {
    name: "Base",
    description: "The foundation of your salad, typically made of leafy greens that provide the primary texture and serve as the canvas for other ingredients.",
    examples: ["Lettuce", "Spinach", "Arugula", "Mixed Greens", "Kale"],
    color: "from-emerald-500 to-green-600"
  },
  body: {
    name: "Body",
    description: "The main substance of the salad that adds bulk, protein, and variety. This is where the salad gets its character and nutritional value.",
    examples: ["Grilled Chicken", "Chickpeas", "Quinoa", "Tofu", "Hard-boiled Eggs", "Cheese"],
    color: "from-amber-500 to-orange-600"
  },
  garnish: {
    name: "Garnish",
    description: "Decorative and flavorful elements that add visual appeal, texture, and complementary tastes to complete the dish.",
    examples: ["Cherry Tomatoes", "Cucumber Slices", "Croutons", "Nuts", "Seeds", "Fresh Herbs"],
    color: "from-rose-500 to-pink-600"
  },
  dressing: {
    name: "Dressing",
    description: "The liquid seasoning that brings all components together, adding moisture, flavor, and helping to unify the salad's taste profile.",
    examples: ["Vinaigrette", "Ranch", "Caesar", "Balsamic", "Olive Oil & Lemon"],
    color: "from-yellow-500 to-amber-600"
  }
};

const hotspots = [
  { id: 'base', label: 'Base', x: 20, y: 20 },
  { id: 'body', label: 'Body', x: 43, y: 78 },
  { id: 'garnish', label: 'Garnish', x: 70, y: 20 },
  { id: 'dressing', label: 'Dressing', x: 75, y: 75 }
];

const Module2 = () => {
  const router = useRouter();
  const { updateModuleCompletion } = useModules();
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewedComponents, setViewedComponents] = useState<Set<string>>(new Set());
  const [zoomTarget, setZoomTarget] = useState({ x: 50, y: 50 });

  const handleHotspotClick = (id: string, x: number, y: number) => {
    setSelectedComponent(id);
    setViewedComponents((prev) => new Set([...prev, id]));
    setZoomTarget({ x, y });
  };

  const handleComplete = () => {
    updateModuleCompletion(2, true);
    router.push('/navigation');
  };

  const handleBack = () => {
    router.push('/navigation');
  };

  const handleImageClick = () => {
    if (!isZoomed) {
      setIsZoomed(true);
    }
  };

  const allViewed = viewedComponents.size === 4;
  const component = selectedComponent ? saladComponents[selectedComponent as keyof typeof saladComponents] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </div>

      <header className="border-b border-green-200/50 bg-white/70 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors font-medium"
          >
            <ChevronLeft className="h-5 w-5" /> Back to Modules
          </button>
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-md">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {viewedComponents.size} / 4 explored
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent mb-3">
            Components of a Salad
          </h1>
          <p className="text-green-700 text-lg">Click on the salad to zoom in, then explore each component</p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl mx-auto max-w-3xl border-4 border-white"
            style={{ cursor: isZoomed ? 'default' : 'pointer' }}
            animate={{
              scale: isZoomed ? 1.15 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }}
          >
            <motion.div
              className="relative aspect-video w-full"
              onClick={handleImageClick}
              animate={selectedComponent ? {
                x: `${(50 - zoomTarget.x) * 0.3}%`,
                y: `${(50 - zoomTarget.y) * 0.3}%`,
              } : {
                x: 0,
                y: 0
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/image/mods2_2.jpg"
                alt="Components of a Salad"
                width={800}      // use the image's real width
                height={450}     // use the image's real height
                className="object-contain rounded-2xl"
                priority
              />



              {/* Hotspots */}
              <AnimatePresence>
                {isZoomed && hotspots.map((spot, index) => (
                  <motion.button
                    key={spot.id}
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }}
                    className={`absolute w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold shadow-2xl z-10 border-3 border-white ${viewedComponents.has(spot.id)
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-gradient-to-br from-lime-400 to-green-500 animate-pulse'
                      }`}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleHotspotClick(spot.id, spot.x, spot.y);
                    }}
                  >
                    {viewedComponents.has(spot.id) ? (
                      <CheckCircle2 className="h-7 w-7" />
                    ) : (
                      spot.label[0]
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>

              {/* Click to explore overlay */}
              {!isZoomed && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-emerald-900/10 to-lime-900/20 flex items-center justify-center backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Click to explore
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Component details panel */}
        <AnimatePresence mode="wait">
          {component && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="mt-8 bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-green-100 relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${component.color}`}></div>

              <button
                className="absolute top-6 right-6 p-2 hover:bg-green-100 rounded-xl transition-all hover:rotate-90 duration-300"
                onClick={() => setSelectedComponent(null)}
              >
                <X className="h-6 w-6 text-green-700" />
              </button>

              <div className="pr-16">
                <motion.h3
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className={`text-3xl font-bold bg-gradient-to-r ${component.color} bg-clip-text text-transparent mb-4`}
                >
                  {component.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-green-800 mb-6 leading-relaxed text-lg"
                >
                  {component.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200"
                >
                  <span className="font-bold text-green-900 text-lg">Examples: </span>
                  <span className="text-green-700 text-lg">{component.examples.join(', ')}</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Complete button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            onClick={handleComplete}
            disabled={!allViewed}
            whileHover={allViewed ? { scale: 1.05, y: -2 } : {}}
            whileTap={allViewed ? { scale: 0.95 } : {}}
            className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all shadow-xl ${allViewed
              ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-lime-600 text-white hover:shadow-2xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            <CheckCircle2 className="h-6 w-6" />
            {allViewed ? 'Complete Module' : 'View all components to continue'}
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
};

export default Module2;