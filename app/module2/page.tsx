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
    nutrients: [
      "Fiber",
      "Vitamin A",
      "Vitamin C",
      "Vitamin K",
      "Folate",
      "Iron",
      "Antioxidants"
    ],
    nutrientDescription: "Provides essential vitamins, minerals, and fiber that support digestion, immunity, and overall health.",
    color: "from-emerald-500 to-green-600"
  },

  body: {
    name: "Body",
    description: "The main substance of the salad that adds bulk, protein, and variety. This is where the salad gets its character and nutritional value.",
    examples: ["Grilled Chicken", "Chickpeas", "Quinoa", "Tofu", "Hard-boiled Eggs", "Cheese"],
    nutrients: [
      "Protein",
      "Healthy Fats",
      "Iron",
      "Calcium",
      "Magnesium",
      "B Vitamins",
      "Complex Carbohydrates"
    ],
    nutrientDescription: "Supplies protein and key nutrients that help build muscles, provide energy, and keep you full longer.",
    color: "from-amber-500 to-orange-600"
  },

  garnish: {
    name: "Garnish",
    description: "Decorative and flavorful elements that add visual appeal, texture, and complementary tastes to complete the dish.",
    examples: ["Cherry Tomatoes", "Cucumber Slices", "Croutons", "Nuts", "Seeds", "Fresh Herbs"],
    nutrients: [
      "Antioxidants",
      "Vitamin C",
      "Vitamin E",
      "Fiber",
      "Healthy Fats (from nuts & seeds)",
      "Phytonutrients"
    ],
    nutrientDescription: "Adds extra vitamins, antioxidants, and healthy fats that enhance flavor and boost nutritional value.",
    color: "from-rose-500 to-pink-600"
  },

  dressing: {
    name: "Dressing",
    description: "The liquid seasoning that brings all components together, adding moisture, flavor, and helping to unify the salad's taste profile.",
    examples: ["Vinaigrette", "Ranch", "Caesar", "Balsamic", "Olive Oil & Lemon"],
    nutrients: [
      "Healthy Fats (if oil-based)",
      "Vitamin E",
      "Omega-3 (if made with certain oils)",
      "Small amounts of vitamins depending on ingredients"
    ],
    nutrientDescription: "Provides healthy fats and enhances nutrient absorption, especially fat-soluble vitamins.",
    color: "from-yellow-500 to-amber-600"
  }
};

const hotspots = [
  { id: 'base', label: 'Base', x: 20, y: 35 },
  { id: 'body', label: 'Body', x: 43, y: 78 },
  { id: 'garnish', label: 'Garnish', x: 70, y: 20 },
  { id: 'dressing', label: 'Dressing', x: 75, y: 75 }
];

const Module2 = () => {
  const router = useRouter();
  const { updateModuleCompletion } = useModules();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewedComponents, setViewedComponents] = useState<Set<string>>(new Set());
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleHotspotClick = (id: string) => {
    // If clicking the same hotspot, zoom out
    if (activeHotspot === id) {
      setActiveHotspot(null);
      setSelectedComponent(null);
    } else {
      // Zoom into the new hotspot
      setSelectedComponent(id);
      setViewedComponents((prev) => new Set([...prev, id]));
      setActiveHotspot(id);
    }
  };

  const handleComplete = () => {
    updateModuleCompletion(2, true);
    router.push('/navigation');
  };

  const handleBack = () => {
    router.push('/navigation');
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

      <main className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 bg-clip-text text-transparent mb-3">
            Components of a Salad
          </h1>
          <p className="text-green-700 text-lg">Click on any hotspot to zoom in and explore, click again to zoom out</p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Image with Hotspots */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <motion.div
              className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white sticky top-24"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <motion.div
                  className="relative w-full h-full"
                  animate={activeHotspot ? {
                    scale: 1.8,
                    x: `${(50 - (hotspots.find(h => h.id === activeHotspot)?.x || 50)) * 1.2}%`,
                    y: `${(50 - (hotspots.find(h => h.id === activeHotspot)?.y || 50)) * 1.2}%`,
                  } : {
                    scale: 1,
                    x: 0,
                    y: 0
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <Image
                    src="/image/mods2_2.jpg"
                    alt="Components of a Salad"
                    fill
                    className="object-contain rounded-2xl"
                    priority
                  />

                  {/* Hotspots - Always visible */}
                  {hotspots.map((spot, index) => (
                    <motion.button
                      key={spot.id}
                      initial={{ scale: 0, opacity: 0, rotate: -180 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        rotate: 0
                      }}
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
                        } ${activeHotspot === spot.id ? 'ring-4 ring-yellow-300 ring-offset-2' : ''}`}
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHotspotClick(spot.id);
                      }}
                    >
                      {viewedComponents.has(spot.id) ? (
                        <CheckCircle2 className="h-7 w-7" />
                      ) : (
                        spot.label[0]
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Component Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {component ? (
                <motion.div
                  key={selectedComponent}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl border-2 border-green-100 relative overflow-hidden sticky top-24"
                >
                  {/* Decorative gradient */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${component.color}`}></div>

                  <button
                    className="absolute top-6 right-6 p-2 hover:bg-green-100 rounded-xl transition-all hover:rotate-90 duration-300"
                    onClick={() => {
                      setSelectedComponent(null);
                      setActiveHotspot(null);
                    }}
                  >
                    <X className="h-6 w-6 text-green-700" />
                  </button>

                  <div className="pr-16">
                    <motion.h3
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      className={`text-4xl font-bold bg-gradient-to-r ${component.color} bg-clip-text text-transparent mb-4`}
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
                      <span className="font-bold text-green-900 text-lg block mb-2">Examples:</span>
                      <div className="flex flex-wrap gap-2">
                        {component.examples.map((example, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            className="bg-white text-green-700 px-3 py-2 rounded-lg text-sm font-medium border border-green-200 shadow-sm"
                          >
                            {example}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                    {/* ---- ADDED: Nutrients section ---- */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="bg-gradient-to-br from-emerald-50 to-lime-50 rounded-xl p-5 border border-emerald-200 mt-4"
                    >
                      <span className="font-bold text-green-900 text-lg block mb-2">Nutrients:</span>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {component.nutrients.map((nutrient, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + idx * 0.05 }}
                            className="bg-white text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium border border-emerald-200 shadow-sm"
                          >
                            {nutrient}
                          </motion.span>
                        ))}
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-green-700 text-sm leading-relaxed italic"
                      >
                        {component.nutrientDescription}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 shadow-xl border-2 border-green-100 flex items-center justify-center min-h-[400px] sticky top-24"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center shadow-lg"
                    >
                      <Sparkles className="h-12 w-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-800 mb-3">
                      Select a Component
                    </h3>
                    <p className="text-green-600 text-lg">
                      Click on the hotspots to learn about each salad component
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

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