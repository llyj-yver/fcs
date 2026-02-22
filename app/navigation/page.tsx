"use client";

import { useState } from "react";
import {
    PlayCircle,
    CheckCircle2,
    Lock,
    Clock,
    BookOpen,
    Award,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useModules } from "../components/ModuleContext";
import ChatWidget from "../components/ChatWidget";

export default function NavigationPage() {
    const { modules } = useModules();
    const [expandedModule, setExpandedModule] = useState<number | null>(null);
    
    const completedCount = modules.filter(m => m.completed).length;
    const progressPercent = (completedCount / modules.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-lime-100 text-gray-900 py-10 px-6 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-3 text-sm mb-4">
                        <span className="text-green-600 font-medium hover:underline cursor-pointer">Home</span>
                        <span className="text-gray-300">›</span>
                        <span className="text-green-700">FCS Food Preparation</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight bg-gradient-to-r from-green-800 via-emerald-700 to-lime-700 bg-clip-text text-transparent">
                        FCS Food Preparation: Master Salad Techniques
                    </h1>

                    {/* Subtitle */}
                    <p className="text-green-700 text-lg mb-6 max-w-3xl leading-relaxed">
                        Learn professional salad preparation from classification to presentation. Perfect for culinary students and food enthusiasts.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-green-600" />
                            <span className="text-green-700">{modules.length} modules</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-green-600" />
                            <span className="text-green-700">2 hours total</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-600" />
                            <span className="text-green-700">Certificate included</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Course Content - Main Area */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-green-200 p-6 mb-6">
                            <h2 className="text-2xl font-bold text-green-900 mb-2">Course Content</h2>
                            <p className="text-gray-600 mb-4">
                                {modules.length} modules • {completedCount} completed
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-green-700">{progressPercent.toFixed(0)}% Complete</span>
                                    <span className="text-gray-400">{completedCount}/{modules.length}</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Module List */}
                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {/* Module Header */}
                                    <button
                                        onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                        className="w-full p-6 flex items-start gap-4 text-left hover:bg-green-50 transition-colors"
                                    >
                                        {/* Icon */}
                                        <div className="flex-shrink-0">
                                            {module.completed ? (
                                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                                            ) : module.locked ? (
                                                <Lock className="w-8 h-8 text-gray-400" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-lg font-bold text-green-900">
                                                    Module {module.id}: {module.title}
                                                </h3>
                                                {expandedModule === module.id ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                                )}
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-4 h-4" />
                                                    {module.lessons} lessons
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {module.duration}
                                                </span>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expanded Content */}
                                    {expandedModule === module.id && (
                                        <div className="px-6 pb-6 pt-0 border-t border-green-100">
                                            <p className="text-gray-700 mb-4 mt-4">
                                                {module.description}
                                            </p>

                                            <button
                                                onClick={() => window.location.href = module.href}
                                                disabled={module.locked}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${module.locked
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : module.completed
                                                        ? "bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300"
                                                        : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:scale-105"
                                                    }`}
                                            >
                                                {module.locked ? (
                                                    <>
                                                        <Lock className="w-5 h-5" />
                                                        Locked
                                                    </>
                                                ) : module.completed ? (
                                                    <>
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Review Module
                                                    </>
                                                ) : (
                                                    <>
                                                        <PlayCircle className="w-5 h-5" />
                                                        Start Module
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Quiz Section */}
                            <div className="bg-gradient-to-br from-lime-50 to-green-50 rounded-xl shadow-sm border-2 border-lime-300 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-green-500 flex items-center justify-center flex-shrink-0">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-green-900 mb-2">
                                                Final Quiz
                                            </h3>
                                            <p className="text-gray-700 mb-4">
                                                Test your understanding of salad preparation concepts from all modules. Make sure you've reviewed all modules before attempting the quiz.
                                            </p>

                                            <button
                                                onClick={() => window.location.href = "../quiz"}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-500 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                                            >
                                                <Award className="w-5 h-5" />
                                                Take Final Quiz
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-4">
                            {/* Course Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
                                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.2),transparent_70%)]"></div>
                                    <span className="text-6xl relative z-10">🥗</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg text-green-900 mb-4">
                                        Your Progress
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Completed</span>
                                            <span className="font-semibold text-green-700">{completedCount}/{modules.length}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Time Invested</span>
                                            <span className="font-semibold text-green-700">0h 0m</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:from-green-700 hover:to-emerald-700">
                                        Continue Learning
                                    </button>
                                </div>
                            </div>

                            {/* Tips Card */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                                <h3 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                    Study Tips
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• Take notes as you learn</li>
                                    <li>• Practice techniques hands-on</li>
                                    <li>• Complete modules in order</li>
                                    <li>• Review before the quiz</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat Widget */}
            <ChatWidget />
        </div>
    );
}