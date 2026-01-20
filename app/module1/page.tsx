"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Home, BookOpen, Clock, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useModules } from "../components/ModuleContext";
import Image from "next/image";

const salads = [
  {
    id: 1,
    type: "Appetizer Salad",
    description: "Light and refreshing salads served at the beginning of a meal to stimulate the appetite. Usually small portions with crisp greens and a light vinaigrette.",
    image: "/image/Apetizercover.jpg",
    lectureNote: "Appetizer salads are crucial for setting the tone of a meal. They should be light enough to stimulate appetite without filling up your guests. Focus on crisp, fresh ingredients with bright, acidic dressings. Remember: presentation matters most in appetizer salads as they create the first impression.",
    flashcard: {
      front: "What is the main purpose of an Appetizer Salad?",
      back: "To stimulate appetite and set the tone for the meal. It should be light, crisp, and visually appealing without being too filling."
    },
    examples: [
      { name: "Caesar Salad", image: "/image/examples/ceasarsalad.png" },
      { name: "Garden Salad", image: "/image/examples/gardensalad.png" },
    ],
    keyPoints: ["Small portions", "Crisp greens", "Light vinaigrette", "Served first"]
  },
  {
    id: 2,
    type: "Side Salad",
    description: "Accompanies the main course and complements the flavors of the entrée. Often features seasonal vegetables and simple dressings.",
    image: "/image/Sidesaladcover.png",
    lectureNote: "Side salads serve as a complementary dish to the main course. The key is balance - they should enhance, not overpower, the entrée. Consider the flavors and textures of your main dish when selecting ingredients. A simple vinaigrette often works best to keep the focus on the main course.",
    flashcard: {
      front: "How should a Side Salad relate to the main course?",
      back: "It should complement and enhance the main dish without overpowering it. Use simple dressings and consider the flavors of the entrée when choosing ingredients."
    },
    examples: [
      { name: "Coleslaw", image: "/image/examples/coleslaw.png" },
      { name: "Mixed Green Salad", image: "/image/examples/mixsalad.png" },
    ],
    keyPoints: ["Complements entrée", "Simple flavors", "Seasonal vegetables", "Balance is key"]
  },
  {
    id: 3,
    type: "Main Course Salad",
    description: "Substantial salads with protein like chicken, fish, or beans that serve as the primary dish. Nutritionally balanced and filling.",
    image: "/image/maincoursecover.png",
    lectureNote: "Main course salads must be nutritionally complete and satisfying. Include quality protein sources, complex carbohydrates, and healthy fats. These salads should be substantial enough to be the centerpiece of the meal. Pay attention to portion sizes and nutritional balance throughout.",
    flashcard: {
      front: "What makes a Main Course Salad nutritionally complete?",
      back: "It must include quality protein, complex carbohydrates, and healthy fats in substantial portions. It should be filling and serve as the meal's centerpiece."
    },
    examples: [
      { name: "Chef Salad", image: "/image/examples/chef.png" },
      { name: "Cobb Salad", image: "/image/examples/cobb.png" },
    ],
    keyPoints: ["Contains protein", "Nutritionally complete", "Substantial portions", "Meal centerpiece"]
  },
  {
    id: 4,
    type: "Dessert Salad",
    description: "Sweet salads made with fruits, nuts, and creamy dressings. Often served at the end of a meal or as a refreshing treat.",
    image: "/image/DessertSaladcover.png",
    lectureNote: "Dessert salads offer a lighter alternative to traditional desserts. They combine fresh or preserved fruits with sweet, creamy dressings. Popular at gatherings and potlucks, these salads provide a refreshing end to a meal while still satisfying the sweet tooth.",
    flashcard: {
      front: "What role does a Dessert Salad play in a meal?",
      back: "It serves as a lighter alternative to traditional desserts, using fruits and sweet dressings to provide a refreshing yet sweet ending to the meal."
    },
    examples: [
      { name: "Waldorf Salad", image: "/image/examples/waldrof.png" },
      { name: "Ambrosia Salad", image: "/image/examples/ambrosia.png" }
    ],
    keyPoints: ["Sweet dressings", "Fresh fruits", "Light dessert option", "Refreshing finish"]
  },
  {
    id: 5,
    type: "Separate Course (Dessert) Salad",
    description: "Sweet salads served as a separate course or dessert, made with fruits, nuts, gelatin, or sweetened dressings.",
    image: "/image/DessertSaladcover.png",
    lectureNote: "Dessert salads are served at the end of a meal as a lighter alternative to traditional desserts. They often use fruits, sweet dressings, whipped cream, or gelatin and should be refreshing rather than heavy.",
    flashcard: {
      front: "When is a dessert salad served?",
      back: "At the end of a meal as a light and refreshing dessert."
    },
    examples: [
      { name: "Waldorf Salad", image: "/image/examples/waldrof.png" },
      { name: "Ambrosia Salad", image: "/image/examples/ambrosia.png" }
    ],
    keyPoints: ["Sweet ingredients", "Served last", "Light dessert option", "Refreshing"]
  },
  {
    id: 6,
    type: "Accompaniment Salad",
    description: "Salads served alongside the main course to complement flavors and add freshness to the meal.",
    image: "/image/accompanimentcover.png",
    lectureNote: "Accompaniment salads balance rich main dishes. They are usually simple, lightly dressed, and should not overpower the main course.",
    flashcard: {
      front: "What is the purpose of an accompaniment salad?",
      back: "To complement and balance the main dish."
    },
    examples: [
      { name: "Coleslaw", image: "/image/examples/coleslaw.png" },
      { name: "Side Garden Salad", image: "/image/examples/gardensalad.png" }
    ],
    keyPoints: ["Served with main dish", "Simple flavors", "Light dressing", "Enhances meal"]
  },
  {
    id: 7,
    type: "Green Salads",
    description: "Salads made primarily from leafy greens such as lettuce, spinach, or arugula, usually tossed with dressing.",
    image: "/image/greensaladcover.png",
    lectureNote: "Green salads are the most common type of salad. Freshness, crispness, and proper drying of greens are essential for quality.",
    flashcard: {
      front: "What is the main ingredient of green salads?",
      back: "Leafy green vegetables like lettuce or spinach."
    },
    examples: [
      { name: "Caesar Salad", image: "/image/examples/caesar.png" },
      { name: "Garden Salad", image: "/image/examples/garden.jpg" }
    ],
    keyPoints: ["Leafy greens", "Fresh ingredients", "Light dressing", "Crisp texture"]
  },
  {
    id: 8,
    type: "Vegetable, Grain, Legume & Pasta Salads",
    description: "Hearty salads made with vegetables, grains, legumes, or pasta, often served chilled or at room temperature.",
    image: "/image/pastasaladcover.png",
    lectureNote: "These salads are filling and versatile, often used for buffets or packed meals. Proper seasoning and cooling improve flavor.",
    flashcard: {
      front: "Why are pasta and grain salads considered hearty?",
      back: "Because they contain filling ingredients like pasta, beans, and grains."
    },
    examples: [
      { name: "Pasta Salad", image: "/image/examples/pasta.png" },
      { name: "Bean Salad", image: "/image/examples/beansalad.png" }
    ],
    keyPoints: ["Hearty ingredients", "Good for buffets", "Served cold", "Well-seasoned"]
  },
  {
    id: 9,
    type: "Bound Salads",
    description: "Salads held together with a thick dressing such as mayonnaise.",
    image: "/image/boundsaladcover.png",
    lectureNote: "Bound salads use creamy dressings that coat ingredients evenly. Proper chilling improves texture and flavor.",
    flashcard: {
      front: "What makes a salad a bound salad?",
      back: "A thick dressing like mayonnaise that binds the ingredients together."
    },
    examples: [
      { name: "Potato Salad", image: "/image/examples/potato.png" },
      { name: "Chicken Salad", image: "/image/examples/chicken.png" }
    ],
    keyPoints: ["Creamy dressing", "Thick consistency", "Served cold", "Well-mixed"]
  },
  {
    id: 10,
    type: "Fruit Salads",
    description: "Salads made primarily from fresh or preserved fruits, served sweet or lightly dressed.",
    image: "/image/fruitsaladcover.png",
    lectureNote: "Fruit salads emphasize freshness and natural sweetness. Prevent browning by using citrus juice.",
    flashcard: {
      front: "What is the main ingredient in fruit salads?",
      back: "Fresh or preserved fruits."
    },
    examples: [
      { name: "Fruit Cocktail", image: "/image/examples/fruitcocktail.png" },
      { name: "Tropical Fruit Salad", image: "/image/examples/tropical.png" }
    ],
    keyPoints: ["Fresh fruits", "Natural sweetness", "Colorful presentation", "Light dressing"]
  },
  {
    id: 11,
    type: "Composed Salads",
    description: "Salads where ingredients are arranged neatly rather than mixed.",
    image: "/image/composedsaladcover.png",
    lectureNote: "Composed salads focus on presentation. Ingredients are arranged artistically and dressed lightly or separately.",
    flashcard: {
      front: "How are composed salads prepared?",
      back: "By arranging ingredients neatly instead of tossing them together."
    },
    examples: [
      { name: "Cobb Salad", image: "/image/examples/cobb.png" },
      { name: "Niçoise Salad", image: "/image/examples/nicoise.png" }
    ],
    keyPoints: ["Arranged presentation", "Visual appeal", "Separate components", "Minimal mixing"]
  },
  {
    id: 12,
    type: "Gelatin Salads",
    description: "Salads made with gelatin combined with fruits, vegetables, or meats.",
    image: "/image/gelatin_cover.png",
    lectureNote: "Gelatin salads are popular for special occasions. Proper setting time and temperature are important.",
    flashcard: {
      front: "What ingredient gives gelatin salads their structure?",
      back: "Gelatin."
    },
    examples: [
      { name: "Fruit Gelatin Salad", image: "/image/examples/gelatinfruit.png" },
      { name: "Vegetable Aspic", image: "/image/examples/aspic.png" }
    ],
    keyPoints: ["Gelatin-based", "Chilled before serving", "Decorative", "Firm texture"]
  }
];

export default function Module1() {
  const { modules, updateModuleCompletion } = useModules();
  const [current, setCurrent] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechRate, setSpeechRate] = useState(0.9);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const isModuleCompleted = modules.find(m => m.id === 1)?.completed || false;

  const speak = (text: string) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleAutoSpeak = () => {
    setAutoSpeak(!autoSpeak);
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  useEffect(() => {
    if (autoSpeak) {
      speak(salads[current].lectureNote);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [current, autoSpeak, speechRate]);

  useEffect(() => {
    setIsFlipped(false);
  }, [current]);

  useEffect(() => {
    if (current === salads.length - 1) {
      setShowCompletion(true);

      if (!isModuleCompleted) {
        setTimeout(() => {
          updateModuleCompletion(1, true);
          alert('🎉 Congratulations! Module 1 marked as complete!');
        }, 1000);
      }
    }
  }, [current, isModuleCompleted]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % salads.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + salads.length) % salads.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 text-gray-800 p-6">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.location.href = "/navigation"}
            className="text-green-700 hover:text-green-900 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="text-sm">Home › Module 1</span>
            </div>
          </button>
          <div className="text-sm text-gray-600">
            {current + 1} / {salads.length}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Left Section - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Module Title */}
          <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg p-6 shadow-lg">
            <h1 className="text-3xl font-bold mb-2 text-white">Classification of Salad</h1>
            <div className="flex items-center gap-4 text-sm text-green-100">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                Module 1
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />• 4 Lessons
              </span>
            </div>
          </div>

          {/* Video/Content Player Area */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-green-200">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              {/* Background Image */}
              <Image
                key={salads[current].image}
                src={salads[current].image}
                alt={salads[current].type}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                className="object-cover scale-105"
              />

              {/* Gradient Overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="p-6 md:p-10 max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg mb-3">
                    {salads[current].type}
                  </h2>

                  <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow-md">
                    {salads[current].description}
                  </p>
                </div>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="bg-gradient-to-r from-green-100 to-lime-100 p-4 flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-green-50 text-green-700 rounded-lg transition-colors shadow-sm border border-green-300"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white rounded-lg transition-colors shadow-md"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="bg-gradient-to-r from-green-100 to-lime-100 px-4 pb-4">
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-lime-500 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((current + 1) / salads.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Completion Card */}
          {showCompletion && current === salads.length - 1 && (
            <div className={`rounded-lg p-6 shadow-lg border-2 ${isModuleCompleted
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'
              : 'bg-gradient-to-br from-lime-50 to-green-50 border-lime-400'
              }`}>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{isModuleCompleted ? '✅' : '🎉'}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {isModuleCompleted ? 'Module Completed!' : 'Congratulations!'}
                  </h3>
                  <p className={`mb-4 ${isModuleCompleted ? 'text-green-700' : 'text-lime-700'}`}>
                    {isModuleCompleted
                      ? "You've already completed Module 1: Classification of Salad. Great job!"
                      : "You've completed all lessons in Module 1: Classification of Salad. This module has been automatically marked as complete!"}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = "/navigation"}
                      className="px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-lg hover:from-lime-600 hover:to-green-700 transition-colors flex items-center gap-2 shadow-md"
                    >
                      <Home className="w-5 h-5" />
                      Back to Navigation
                    </button>
                    {isModuleCompleted && (
                      <button
                        onClick={() => setCurrent(0)}
                        className="px-6 py-3 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors border border-green-300"
                      >
                        Review Lessons
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Flashcard */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
                🎴 Knowledge Check
              </h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="text-sm text-gray-600 hover:text-green-700 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              <div
                className={`relative w-full transition-all duration-500 transform-gpu`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <div
                  className={`bg-gradient-to-br from-lime-400 to-green-500 rounded-xl p-8 min-h-[200px] flex items-center justify-center text-center ${isFlipped ? 'invisible' : 'visible'}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div>
                    <div className="text-6xl mb-4">❓</div>
                    <p className="text-xl font-semibold text-white">
                      {salads[current].flashcard.front}
                    </p>
                    <p className="text-sm text-green-100 mt-4">Click to reveal answer</p>
                  </div>
                </div>

                <div
                  className={`bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-8 min-h-[200px] flex items-center justify-center text-center absolute top-0 left-0 w-full ${!isFlipped ? 'invisible' : 'visible'}`}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div>
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-lg text-white leading-relaxed">
                      {salads[current].flashcard.back}
                    </p>
                    <p className="text-sm text-green-100 mt-4">Click to see question</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-700 mb-3">Key Points:</h4>
              <div className="grid grid-cols-2 gap-2">
                {salads[current].keyPoints.map((point, idx) => (
                  <div key={idx} className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sidebar */}
        <div className="space-y-6">
          {/* Lecture Notes */}
          <div className="bg-white rounded-lg p-6 border border-green-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-green-700">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-semibold">Lecture Notes</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAutoSpeak}
                  className={`p-2 rounded-lg transition-colors ${autoSpeak ? "bg-gradient-to-r from-lime-500 to-green-600 text-white" : "bg-green-100 text-green-700"
                    } hover:bg-green-500`}
                  title={autoSpeak ? "Auto-speak enabled" : "Auto-speak disabled"}
                >
                  {autoSpeak ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-600">Speech Speed</label>
                <span className="text-sm text-green-700">{speechRate.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x (Slow)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x (Fast)</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{salads[current].lectureNote}</p>
            <div className="mt-4 text-sm text-gray-500">
              Lesson {current + 1} of {salads.length}
            </div>
          </div>

          {/* Professor Card */}
          <div className="bg-white rounded-lg p-6 border border-green-200 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="text-5xl">👨‍🏫</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Professor Garcia</h3>
                <p className="text-sm text-gray-600">Culinary Instructor</p>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="bg-white rounded-lg p-6 border border-green-200 shadow-lg">
            <div className="flex gap-2 justify-center">
              {salads.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all ${idx === current ? "bg-gradient-to-r from-lime-500 to-green-600 w-8" : "bg-green-200 hover:bg-green-300 w-2"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Example Salads Cards */}
          <div className="bg-white rounded-lg p-6 border border-green-200 shadow-lg">
            <h4 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
              <span className="text-lg">🍽️</span>
              Examples
            </h4>
            <div className="space-y-3">
              {salads[current].examples.map((example, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-green-50 to-lime-50 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-200"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-green-100">
                    <img
                      src={example.image}
                      alt={example.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl">🥗</div>';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-3 border-t-2 border-green-400">
                    <p className="font-medium text-gray-800 text-sm text-center group-hover:text-green-700 transition-colors">
                      {example.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}