"use client";

import React, { useState } from 'react';
import { X, Check, AlertCircle, Home, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface Ingredient {
  id: string;
  name: string;
}

interface Salad {
  id: string;
  name: string;
  description: string;
  dressingType: string;
  image: string;
}

interface DressingType {
  id: string;
  name: string;
  image: string;
  description: string;
  examples: string[];
  correctIngredients: string[];
  allIngredients: Ingredient[];
}

const dressingData: DressingType[] = [
  {
    id: 'oil-vinegar',
    name: 'Oil and Vinegar Dressing',
    image: '🫒',
    description: 'A simple combination of oil and vinegar, typically in a 3:1 ratio. This is the foundation of most dressings, offering a light, tangy flavor that enhances fresh vegetables.',
    examples: ['Italian Salad', 'Greek Salad', 'Balsamic Salad', 'House Salad'],
    correctIngredients: ['oil', 'vinegar', 'salt'],
    allIngredients: [
      { id: 'oil', name: 'Olive Oil' },
      { id: 'vinegar', name: 'Vinegar' },
      { id: 'salt', name: 'Salt' },
      { id: 'mayo', name: 'Mayonnaise' },
      { id: 'cream', name: 'Heavy Cream' },
      { id: 'egg', name: 'Egg Yolk' }
    ]
  },
  {
    id: 'emulsified',
    name: 'Emulsified Dressing',
    image: '🥫',
    description: 'A stable mixture where oil and water-based ingredients are permanently blended using an emulsifier like egg yolk or mustard. Creates a thick, creamy consistency that coats ingredients evenly.',
    examples: ['Caesar Salad', 'Thousand Island', 'Russian Dressing', 'Honey Mustard'],
    correctIngredients: ['egg', 'oil', 'lemon'],
    allIngredients: [
      { id: 'egg', name: 'Egg Yolk' },
      { id: 'oil', name: 'Oil' },
      { id: 'lemon', name: 'Lemon Juice' },
      { id: 'vinegar', name: 'Vinegar' },
      { id: 'flour', name: 'Flour' },
      { id: 'sugar', name: 'Sugar' }
    ]
  },
  {
    id: 'other',
    name: 'Other Dressing',
    image: '🌿',
    description: 'Unique dressings that don\'t fit traditional categories. These include yogurt-based, nut-based, or specialty dressings that offer distinctive flavors and textures.',
    examples: ['Tahini Dressing', 'Peanut Dressing', 'Yogurt Herb', 'Avocado Lime'],
    correctIngredients: ['yogurt', 'herbs', 'lemon'],
    allIngredients: [
      { id: 'yogurt', name: 'Yogurt' },
      { id: 'herbs', name: 'Fresh Herbs' },
      { id: 'lemon', name: 'Lemon Juice' },
      { id: 'oil', name: 'Oil' },
      { id: 'mayo', name: 'Mayonnaise' },
      { id: 'egg', name: 'Eggs' }
    ]
  },
  {
    id: 'temporary',
    name: 'Temporary Emulsion',
    image: '🥗',
    description: 'A mixture that temporarily combines oil and vinegar through vigorous shaking or whisking. The ingredients will separate over time and need to be re-mixed before use.',
    examples: ['Vinaigrette', 'French Dressing', 'Shaken Herb', 'Citrus Vinaigrette'],
    correctIngredients: ['oil', 'vinegar', 'mustard'],
    allIngredients: [
      { id: 'oil', name: 'Oil' },
      { id: 'vinegar', name: 'Vinegar' },
      { id: 'mustard', name: 'Mustard' },
      { id: 'egg', name: 'Egg Yolk' },
      { id: 'flour', name: 'Flour' },
      { id: 'cream', name: 'Cream' }
    ]
  },
  {
    id: 'permanent',
    name: 'Permanent Dressing',
    image: '🧈',
    description: 'A stable emulsion that remains blended without separating. The emulsifier creates permanent bonds between oil and water, maintaining a consistent texture indefinitely.',
    examples: ['Mayonnaise', 'Ranch Dressing', 'Blue Cheese', 'Green Goddess'],
    correctIngredients: ['egg', 'oil', 'vinegar'],
    allIngredients: [
      { id: 'egg', name: 'Egg Yolk' },
      { id: 'oil', name: 'Oil' },
      { id: 'vinegar', name: 'Vinegar' },
      { id: 'flour', name: 'Flour' },
      { id: 'sugar', name: 'Sugar' },
      { id: 'herbs', name: 'Herbs' }
    ]
  },
  {
    id: 'cooked',
    name: 'Cooked Salad Dressing',
    image: '🍳',
    description: 'A dressing thickened by cooking with starch (flour or cornstarch) and eggs. Heat creates a smooth, pudding-like consistency that\'s typically sweeter and milder than raw dressings.',
    examples: ['Fruit Salad Dressing', 'Waldorf Dressing', 'Boiled Dressing', 'Ambrosia Dressing'],
    correctIngredients: ['flour', 'egg', 'sugar', 'vinegar'],
    allIngredients: [
      { id: 'flour', name: 'Flour' },
      { id: 'egg', name: 'Eggs' },
      { id: 'sugar', name: 'Sugar' },
      { id: 'vinegar', name: 'Vinegar' },
      { id: 'oil', name: 'Oil' },
      { id: 'mayo', name: 'Mayonnaise' }
    ]
  }
];

const saladsData: Salad[] = [
  { id: '1', name: 'Italian Salad', description: 'Fresh greens with Italian oil and vinegar', dressingType: 'oil-vinegar', image: '🥗' },
  { id: '2', name: 'Greek Salad', description: 'Tomatoes, cucumber, feta with oil and vinegar', dressingType: 'oil-vinegar', image: '🥗' },
  { id: '3', name: 'Balsamic Salad', description: 'Mixed greens with balsamic vinaigrette', dressingType: 'oil-vinegar', image: '🥬' },
  { id: '4', name: 'House Salad', description: 'Simple greens with basic oil and vinegar', dressingType: 'oil-vinegar', image: '🍅' },
  { id: '5', name: 'Caesar Salad', description: 'Romaine with creamy Caesar dressing', dressingType: 'emulsified', image: '🥬' },
  { id: '6', name: 'Thousand Island', description: 'Lettuce with creamy thousand island', dressingType: 'emulsified', image: '🥗' },
  { id: '7', name: 'Russian Dressing', description: 'Mixed greens with Russian dressing', dressingType: 'emulsified', image: '🥬' },
  { id: '8', name: 'Honey Mustard', description: 'Salad with honey mustard emulsion', dressingType: 'emulsified', image: '🥔' },
  { id: '9', name: 'Tahini Salad', description: 'Mediterranean with tahini dressing', dressingType: 'other', image: '🥙' },
  { id: '10', name: 'Peanut Salad', description: 'Asian greens with peanut dressing', dressingType: 'other', image: '🥜' },
  { id: '11', name: 'Yogurt Herb', description: 'Fresh vegetables with yogurt herb dressing', dressingType: 'other', image: '🥗' },
  { id: '12', name: 'Avocado Lime', description: 'Greens with creamy avocado lime', dressingType: 'other', image: '🥑' },
  { id: '13', name: 'Vinaigrette', description: 'Classic salad with French vinaigrette', dressingType: 'temporary', image: '🥗' },
  { id: '14', name: 'French Dressing', description: 'Lettuce with French dressing', dressingType: 'temporary', image: '🥬' },
  { id: '15', name: 'Shaken Herb', description: 'Garden salad with shaken herb dressing', dressingType: 'temporary', image: '🌿' },
  { id: '16', name: 'Citrus Vinaigrette', description: 'Mixed greens with citrus vinaigrette', dressingType: 'temporary', image: '🍊' },
  { id: '17', name: 'Mayonnaise Salad', description: 'Vegetables with mayonnaise', dressingType: 'permanent', image: '🥗' },
  { id: '18', name: 'Ranch Dressing', description: 'Greens with ranch dressing', dressingType: 'permanent', image: '🥬' },
  { id: '19', name: 'Blue Cheese', description: 'Salad with blue cheese dressing', dressingType: 'permanent', image: '🧀' },
  { id: '20', name: 'Green Goddess', description: 'Herbs and greens with green goddess', dressingType: 'permanent', image: '🌿' },
  { id: '21', name: 'Fruit Salad', description: 'Fresh fruits with sweet cooked dressing', dressingType: 'cooked', image: '🍇' },
  { id: '22', name: 'Waldorf Dressing', description: 'Apple, celery with cooked dressing', dressingType: 'cooked', image: '🍎' },
  { id: '23', name: 'Boiled Dressing', description: 'Classic salad with boiled dressing', dressingType: 'cooked', image: '🥗' },
  { id: '24', name: 'Ambrosia Dressing', description: 'Fruit salad with ambrosia dressing', dressingType: 'cooked', image: '🍊' },
];

export default function SaladDressingModule() {
  const [isCompleted, setIsCompleted] = useState(false);  
  const [selectedDressing, setSelectedDressing] = useState<DressingType | null>(null);
  const [droppedItems, setDroppedItems] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  const [clickedDressings, setClickedDressings] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (clickedDressings.size === dressingData.length && !isCompleted) {
      setIsCompleted(true);
      alert('🎉 Congratulations! Module 3 completed! You\'ve explored all dressing types.');
    }
  }, [clickedDressings, isCompleted]);

  const filteredSalads = activeFilters.includes('all')
    ? saladsData
    : saladsData.filter(salad => activeFilters.includes(salad.dressingType));

  const handleDressingClick = (dressing: DressingType): void => {
    setSelectedDressing(dressing);
    setDroppedItems([]);
    setShowResult(false);
    setIsCorrect(false);
    setClickedDressings(prev => new Set([...prev, dressing.id]));
  };

  const handleCloseModal = (): void => {
    setSelectedDressing(null);
    setDroppedItems([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ingredientId: string): void => {
    e.dataTransfer.setData('ingredientId', ingredientId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const ingredientId = e.dataTransfer.getData('ingredientId');

    if (!droppedItems.includes(ingredientId)) {
      setDroppedItems([...droppedItems, ingredientId]);
    }
  };

  const handleRemoveItem = (ingredientId: string): void => {
    setDroppedItems(droppedItems.filter(id => id !== ingredientId));
  };

  const handleCheckAnswer = (): void => {
    if (!selectedDressing) return;

    const correct = selectedDressing.correctIngredients.every(ing =>
      droppedItems.includes(ing)
    ) && droppedItems.length === selectedDressing.correctIngredients.length;

    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleReset = (): void => {
    setDroppedItems([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleFilterChange = (filter: string): void => {
    if (filter === 'all') {
      setActiveFilters(['all']);
    } else {
      const newFilters = activeFilters.includes(filter)
        ? activeFilters.filter(f => f !== filter)
        : [...activeFilters.filter(f => f !== 'all'), filter];

      if (newFilters.length === 0 || newFilters.length === dressingData.length) {
        setActiveFilters(['all']);
      } else {
        setActiveFilters(newFilters);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-lime-50/20 to-emerald-50/30">
      <div className="relative bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 py-16 px-8 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(132,204,22,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => window.location.href = "/navigation"}
            className="text-emerald-700 hover:text-emerald-900 transition-colors mb-6 flex items-center gap-2 group"
          >
            <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Home › Module 3</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-800 via-lime-700 to-green-700 bg-clip-text text-transparent">
                Types of Salad Dressing
              </h1>
              <p className="text-lg text-emerald-700 font-medium">
                Discover delicious dressing varieties and master their ingredients
              </p>
            </div>
            
            {isCompleted && (
              <div className="flex items-center gap-3 bg-white text-emerald-700 px-6 py-3 rounded-2xl shadow-lg border-2 border-emerald-200">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold text-lg">Completed!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-emerald-900 mb-8">
            Explore Dressing Types
          </h2>
          <div className="overflow-x-auto pb-6 -mx-8 px-8">
            <div className="flex gap-6 min-w-max">
              {dressingData.map((dressing) => (
                <button
                  key={dressing.id}
                  onClick={() => handleDressingClick(dressing)}
                  className="group flex-shrink-0 w-80 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 text-left overflow-hidden border border-emerald-100 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-br from-emerald-50 to-lime-50 h-48 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>
                    <span className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-300">{dressing.image}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors">
                      {dressing.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {dressing.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-700 font-semibold text-sm group-hover:text-emerald-600 transition-colors">Learn more →</span>
                      {clickedDressings.has(dressing.id) && (
                        <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Done</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-emerald-900 mb-3">
            Example Salads
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Filter by dressing type to explore
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${activeFilters.includes('all')
                ? 'bg-gradient-to-r from-emerald-600 to-lime-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md'
              }`}
          >
            All Salads
          </button>
          {dressingData.map((dressing) => (
            <button
              key={dressing.id}
              onClick={() => handleFilterChange(dressing.id)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${activeFilters.includes(dressing.id)
                  ? 'bg-gradient-to-r from-emerald-600 to-lime-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-emerald-700 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-md'
                }`}
            >
              {dressing.name}
            </button>
          ))}
        </div>

        <motion.div
          className="relative min-h-[600px] mb-12"
          layout
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredSalads.map((salad) => (
                <motion.div
                  key={salad.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-emerald-100 hover:-translate-y-1 group"
                  onClick={() => {
                    const dressing = dressingData.find(d => d.id === salad.dressingType);
                    if (dressing) handleDressingClick(dressing);
                  }}
                >
                  <div className="bg-gradient-to-br from-emerald-50 to-lime-50 h-40 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]"></div>
                    <span className="text-7xl relative z-10 group-hover:scale-110 transition-transform duration-300">{salad.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-base text-emerald-900 mb-2 group-hover:text-emerald-700 transition-colors">{salad.name}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{salad.description}</p>
                    <span className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-lime-100 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                      {dressingData.find(d => d.id === salad.dressingType)?.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {filteredSalads.length === 0 && (
          <div className="text-center py-16 absolute inset-0 flex items-center justify-center">
            <p className="text-gray-500 text-base">No salads match your filter selection</p>
          </div>
        )}

        <AnimatePresence>
          {selectedDressing && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto shadow-2xl rounded-3xl border border-emerald-200"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-lime-600 text-white p-8 flex justify-between items-center z-10 rounded-t-3xl">
                  <div className="flex items-center gap-5">
                    <span className="text-6xl">{selectedDressing.image}</span>
                    <h2 className="text-3xl font-bold">
                      {selectedDressing.name}
                    </h2>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-white hover:bg-white/20 p-2.5 rounded-full transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4">About this dressing</h3>
                    <p className="text-gray-700 leading-relaxed text-base">
                      {selectedDressing.description}
                    </p>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-5">Example Salads</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedDressing.examples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-emerald-50 to-lime-50 border-2 border-emerald-200 p-4 text-center rounded-xl hover:shadow-md transition-all"
                        >
                          <span className="text-sm font-medium text-emerald-900">
                            {example}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50 border-2 border-emerald-300 p-8 rounded-2xl shadow-inner">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                      🎯 Practice Activity
                    </h3>
                    <p className="text-gray-700 mb-8 text-base">
                      Drag the correct ingredients that are typically used in <strong className="text-emerald-700">{selectedDressing.name}</strong>:
                    </p>

                    <div className="mb-8">
                      <h4 className="font-semibold text-emerald-900 mb-4 text-base">Available Ingredients:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedDressing.allIngredients
                          .filter(ing => !droppedItems.includes(ing.id))
                          .map((ingredient) => (
                            <div
                              key={ingredient.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, ingredient.id)}
                              className="bg-white border-2 border-emerald-300 p-4 cursor-move hover:border-emerald-500 hover:shadow-lg transition-all rounded-xl hover:-translate-y-0.5"
                            >
                              <span className="text-sm font-semibold text-emerald-900">
                                {ingredient.name}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className={`min-h-36 border-4 border-dashed p-6 rounded-2xl transition-all ${droppedItems.length === 0
                          ? 'border-emerald-300 bg-white'
                          : 'border-lime-400 bg-lime-50'
                        }`}
                    >
                      <h4 className="font-semibold text-emerald-900 mb-4 text-base">
                        Drop ingredients here:
                      </h4>
                      {droppedItems.length === 0 ? (
                        <p className="text-gray-400 text-center py-6 text-base">
                          Drag ingredients here...
                        </p>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {droppedItems.map((itemId) => {
                            const ingredient = selectedDressing.allIngredients.find(
                              ing => ing.id === itemId
                            );
                            return (
                              <div
                                key={itemId}
                                className="bg-gradient-to-br from-lime-100 to-emerald-100 border-2 border-lime-400 p-4 flex justify-between items-center rounded-xl shadow-sm"
                              >
                                <span className="text-sm font-semibold text-emerald-900">
                                  {ingredient?.name}
                                </span>
                                <button
                                  onClick={() => handleRemoveItem(itemId)}
                                  className="text-red-500 hover:text-red-700 ml-2 hover:bg-red-100 rounded-full p-1 transition-all"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {showResult && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`mt-8 p-6 border-2 rounded-2xl ${isCorrect
                              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
                              : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400'
                            }`}
                        >
                          <div className="flex items-start gap-4">
                            {isCorrect ? (
                              <Check className="w-7 h-7 text-green-600 flex-shrink-0 mt-1" />
                            ) : (
                              <AlertCircle className="w-7 h-7 text-red-600 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-1">
                              <h4
                                className={`font-bold mb-3 text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'
                                  }`}
                              >
                                {isCorrect ? '🎉 Excellent!' : '❌ Not quite right'}
                              </h4>
                              <p className="text-gray-700 text-base leading-relaxed">
                                {isCorrect
                                  ? `Perfect! You've correctly identified all the key ingredients for ${selectedDressing.name}.`
                                  : `Try again. Make sure you have all the correct ingredients: ${selectedDressing.correctIngredients
                                    .map(id =>
                                      selectedDressing.allIngredients.find(ing => ing.id === id)?.name
                                    )
                                    .join(', ')}.`}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-4 mt-8">
                      {!showResult ? (
                        <>
                          <button
                            onClick={handleCheckAnswer}
                            disabled={droppedItems.length === 0}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 transition-all rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none"
                          >
                            Check Answer
                          </button>
                          <button
                            onClick={handleReset}
                            className="flex-1 bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-600 font-bold py-4 px-8 transition-all rounded-xl shadow-md hover:shadow-lg"
                          >
                            Reset
                          </button>
                        </>
                      ) : isCorrect ? (
                        <button
                          onClick={handleCloseModal}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-lime-600 hover:from-emerald-700 hover:to-lime-700 text-white font-bold py-4 px-8 transition-all rounded-xl shadow-lg hover:shadow-xl"
                        >
                          Continue →
                        </button>
                      ) : (
                        <button
                          onClick={handleReset}
                          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 transition-all rounded-xl shadow-lg hover:shadow-xl"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-20"></div>
    </div>
  );
}