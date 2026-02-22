"use client";

import { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle, 
  CheckCircle2, 
  Clock,
  BookOpen,
  Award
} from "lucide-react";
import Image from "next/image";

const images = [
  "/image/landingpage/classification_cover.png",
  "/image/landingpage/components_salad.png",
  "/image/landingpage/types_dressing.png",
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-lime-600 via-green-600 to-emerald-700 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-yellow-200 via-lime-200 to-green-200 bg-clip-text text-transparent">
                  Salad & Dressing
                </span>
                <br />
                <span className="text-white">Mastery</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-green-50 leading-relaxed">
                Transform fresh ingredients into culinary art with professional techniques and creative presentations
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">Beginner Friendly</span>
                </div>
                <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                  <CheckCircle2 className="w-5 h-5 text-lime-300" />
                  <span className="font-semibold">2025 Edition</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold text-white">2 hours</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl">
                  <BookOpen className="w-5 h-5 text-lime-300" />
                  <span className="font-semibold text-white">4 modules</span>
                </div>
              </div>

              <button
                onClick={() => setShowPopup(true)}
                className="group flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-yellow-300 via-lime-400 to-green-400 text-green-900 text-lg font-bold rounded-2xl hover:shadow-2xl hover:shadow-lime-500/30 transition-all hover:scale-105 hover:-translate-y-1"
              >
                <PlayCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                Start Learning Now
              </button>
            </div>

            {/* Right - Image Carousel */}
            <div className="relative group">
              <div className="overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20 backdrop-blur-sm bg-white/5">
                <div className="relative h-[400px] md:h-[500px]">
                  <Image
                    src={images[current]}
                    alt={`Salad example ${current + 1}`}
                    fill
                    className="object-cover"
                    priority={current === 0}
                  />
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-2.5 rounded-full transition-all ${
                          idx === current 
                            ? "bg-gradient-to-r from-lime-500 to-green-600 w-10" 
                            : "bg-green-200 hover:bg-green-300 w-2.5"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 border border-green-100"
              >
                <ChevronLeft className="w-6 h-6 text-green-700" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl hover:bg-white transition-all hover:scale-110 border border-green-100"
              >
                <ChevronRight className="w-6 h-6 text-green-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            What You'll Master
          </h2>
          <p className="text-xl text-green-700">Comprehensive skills for professional salad preparation</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            "Understand different types of salads and their origins",
            "Learn proper food preparation and cutting techniques",
            "Practice safe food handling and hygiene standards",
            "Create visually appealing salad presentations"
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-green-900 font-medium text-lg">{item}</span>
            </div>
          ))}
        </div>

        {/* Course Highlights */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-white to-green-50 p-8 rounded-3xl border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-3">Structured Learning</h3>
            <p className="text-green-700 leading-relaxed">Follow a step-by-step curriculum from basics to advanced techniques</p>
          </div>

          <div className="group bg-gradient-to-br from-white to-yellow-50 p-8 rounded-3xl border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-900 mb-3">Certificate</h3>
            <p className="text-yellow-800 leading-relaxed">Earn a certificate upon completion to showcase your skills</p>
          </div>

          <div className="group bg-gradient-to-br from-white to-lime-50 p-8 rounded-3xl border-2 border-lime-200 hover:border-lime-400 hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-lime-900 mb-3">Self-Paced</h3>
            <p className="text-lime-800 leading-relaxed">Learn at your own pace with lifetime access to materials</p>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-green-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPopup(false);
          }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-10 max-w-2xl w-full shadow-2xl border-2 border-green-200 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="mb-6">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-lime-100 to-green-100 text-green-700 rounded-full text-sm font-bold border-2 border-green-200">
                  🎓 Course Enrollment
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                Ready to Start Learning?
              </h2>
              <p className="text-green-700 text-lg">
                Everything you need to become a salad preparation expert
              </p>
            </div>

            {/* Description */}
            <p className="text-green-800 mb-6 leading-relaxed text-lg">
              This comprehensive course will guide you through the fundamentals of salad
              preparation, ingredients, hygiene, and presentation techniques used by professionals.
            </p>

            {/* Feature List */}
            <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
              <h3 className="font-bold text-green-900 mb-4 text-xl">Course includes:</h3>
              <div className="space-y-3">
                {[
                  "4 comprehensive modules",
                  "2 hours of content",
                  "Practical demonstrations",
                  "Final assessment quiz",
                  "Certificate of completion"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-lime-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-green-800 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-green-200 font-bold text-green-700 hover:bg-green-50 transition-all hover:border-green-300"
              >
                Maybe Later
              </button>

              <button
                onClick={() => window.location.href = "/navigation"}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-lime-400 via-green-400 to-emerald-400 text-green-900 font-bold hover:shadow-xl hover:shadow-green-500/30 transition-all hover:scale-105"
              >
                Continue to Course →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}