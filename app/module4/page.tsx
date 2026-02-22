"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, SkipForward, SkipBack, CheckCircle2, XCircle, Award } from 'lucide-react';

interface QuizQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  aDescription: string;
  bDescription: string;
  cDescription: string;
  dDescription: string;
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  timePopUp: number;
}

const quizData: QuizQuestion[] = [
  {
    question: "Why is it important to wear proper PPE and wash all salad vegetables?",
    a: "To make the salad taste sweeter",
    b: "To reduce cooking time",
    c: "To maintain cleanliness and prevent food contamination",
    d: "To increase the size of the vegetables",
    aDescription: "Taste isn't affected by PPE.",
    bDescription: "Washing doesn't change cooking duration.",
    cDescription: "Correct! PPE and washing are essential for hygiene and food safety.",
    dDescription: "Washing does not grow the vegetables.",
    correctAnswer: "c",
    timePopUp: 11
  },
  {
    question: "In preparing the ingredients, why should we wash it thoroughly?",
    a: "To remove dirt and impurities",
    b: "To add extra bacteria for a better flavor profile",
    c: "To help the dressing slide off the leaves easily",
    d: "To increase the temperature of the vegetables before serving",
    aDescription: "Correct! Thorough washing removes physical and biological contaminants.",
    bDescription: "Bacteria should be removed, not added!",
    cDescription: "Dressing should adhere, not slide off.",
    dDescription: "Washing usually uses cool water, not hot.",
    correctAnswer: "a",
    timePopUp: 28
  },
  {
    question: "Why should potatoes be boiled whole before peeling and cutting?",
    a: "To reduce cooking time",
    b: "To make peeling easier",
    c: "To preserve nutrients",
    d: "To make the potatoes softer for frying",
    aDescription: "Boiling whole actually takes longer than small pieces.",
    bDescription: "While true, it's not the primary nutritional reason.",
    cDescription: "Correct! Cooking them whole keeps vitamins and minerals locked inside.",
    dDescription: "This is for salads, not frying.",
    correctAnswer: "c",
    timePopUp: 42
  },
  {
    question: "Why should vegetables be peeled only after cooling?",
    a: "To avoid burning your hands",
    b: "To prevent damage to the texture and avoid overcooking",
    c: "To make chopping faster",
    d: "To increase the size of the vegetables",
    aDescription: "Safety is a factor, but texture is the culinary priority.",
    bDescription: "Correct! Cooling stabilizes the vegetable so peeling doesn't turn it into mush.",
    cDescription: "Cooling actually adds a step to the process.",
    dDescription: "Vegetables don't grow after being cooked.",
    correctAnswer: "b",
    timePopUp: 51
  },
  {
    question: "Why should we chop all the ingredients into uniform pieces?",
    a: "To make sure some pieces stay raw while others are overcooked",
    b: "To prevent the salad dressing from touching the vegetables",
    c: "To make the salad much harder to chew and swallow",
    d: "To ensure visual appeal and easier mixing",
    aDescription: "Uniformity ensures even cooking/texture.",
    bDescription: "Uniformity helps dressing coat evenly.",
    cDescription: "Uniformity makes it easier to eat, not harder.",
    dDescription: "Correct! Evenly sized pieces look professional and mix better.",
    correctAnswer: "d",
    timePopUp: 63
  },
  {
    question: "Why should cooked ingredients be thoroughly cooled before mixing with mayonnaise?",
    a: "To improve the color of the salad",
    b: "To make chopping easier",
    c: "To prevent the mayonnaise from spoiling and ensure food safety",
    d: "To cook the mayonnaise faster",
    aDescription: "Cooling is about safety, not aesthetics.",
    bDescription: "Chopping should be done before mixing.",
    cDescription: "Correct! Heat can cause mayonnaise to break down and breed bacteria.",
    dDescription: "Mayonnaise should not be cooked in a salad.",
    correctAnswer: "c",
    timePopUp: 72
  },
  {
    question: "Why should the dressing be gently mixed into the salad?",
    a: "To cool the salad faster",
    b: "To add more salt",
    c: "To avoid crushing or damaging the main ingredients",
    d: "To make the salad thicker",
    aDescription: "Mixing doesn't significantly lower temperature.",
    bDescription: "Salt is in the dressing, not the mixing style.",
    cDescription: "Correct! Gentle mixing preserves the integrity and texture of the ingredients.",
    dDescription: "Gentle mixing maintains lightness.",
    correctAnswer: "c",
    timePopUp: 96
  },
  {
    question: "How should plating be done?",
    a: "Make it colorful and attractive",
    b: "Stack all ingredients randomly",
    c: "Serve in a separate bowl only",
    d: "Blend all ingredients together",
    aDescription: "Correct! Visual appeal is a key part of the dining experience.",
    bDescription: "Random stacking looks messy.",
    cDescription: "Plating can be done on plates or bowls.",
    dDescription: "Blending turns a salad into a smoothie!",
    correctAnswer: "a",
    timePopUp: 110
  },
  {
    question: "Why is it important to arrange salad ingredients properly according to color, shape, texture, and flavor?",
    a: "To make the salad heavier",
    b: "To maintain balance and enhance the appearance; the right combination makes it more visually appealing and tasty",
    c: "To make it cook faster",
    d: "To reduce the cost of ingredients",
    aDescription: "Arrangement doesn't change the weight.",
    bDescription: "Correct! We eat with our eyes first; balance is key.",
    cDescription: "Arrangement happens after cooking.",
    dDescription: "The cost remains the same regardless of placement.",
    correctAnswer: "b",
    timePopUp: 119
  },
  {
    question: "What is the main goal of following proper guidelines when making salad?",
    a: "To make the salad spicy",
    b: "To create a salad that is clean, safe to eat, tasty, and visually appealing",
    c: "To reduce the number of ingredients",
    d: "To make the salad heavier",
    aDescription: "Spiciness is a flavor choice, not a general goal.",
    bDescription: "Correct! The ultimate goal is a safe, high-quality, and delicious dish.",
    cDescription: "Guidelines don't dictate the count of ingredients.",
    dDescription: "Heaviness is not a quality standard.",
    correctAnswer: "b",
    timePopUp: 128
  }
];

const VideoQuizSystem: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | 'd' | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [askedQuestions, setAskedQuestions] = useState<Set<number>>(new Set());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoDuration, setVideoDuration] = useState<number>(0);
  const progress = (askedQuestions.size / quizData.length) * 100;

  // Check if module is already completed on mount
  useEffect(() => {
    const completedModules = localStorage.getItem('completedModules');
    if (completedModules) {
      const modules = JSON.parse(completedModules);
      if (modules.module4) {
        setIsCompleted(true);
      }
    }
  }, []);

  // Mark module as complete when all quizzes are done
  useEffect(() => {
    if (askedQuestions.size === quizData.length && !isCompleted) {
      // Mark module 4 as complete
      const completedModules = localStorage.getItem('completedModules');
      let modules = completedModules ? JSON.parse(completedModules) : {};

      modules.module4 = true;
      localStorage.setItem('completedModules', JSON.stringify(modules));
      setIsCompleted(true);

      // Dispatch event to notify navigation page
      window.dispatchEvent(new Event('moduleCompleted'));

      console.log('Module 4 automatically marked as complete!');
    }
  }, [askedQuestions.size, isCompleted]);

  // Simulate video playback
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    for (let i = 0; i < quizData.length; i++) {
      if (
        !askedQuestions.has(i) &&
        Math.abs(time - quizData[i].timePopUp) < 0.3
      ) {
        videoRef.current.pause();
        setIsPlaying(false);
        setShowQuiz(true);
        setCurrentQuizIndex(i);
        setAskedQuestions(prev => new Set([...prev, i]));
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };


  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };


  const resetVideo = (): void => {
    setCurrentTime(0);
    setIsPlaying(false);
    setShowQuiz(false);
    setAskedQuestions(new Set());
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const skipTime = (seconds: number): void => {
    setCurrentTime(prev => Math.max(0, Math.min(videoDuration, prev + seconds)));
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    setCurrentTime(percentage * videoDuration);
  };

  const handleAnswerSelect = (answer: 'a' | 'b' | 'c' | 'd'): void => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer) {
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = (): void => {
    const currentQuiz = quizData[currentQuizIndex];

    if (selectedAnswer === currentQuiz.correctAnswer) {
      setShowQuiz(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuiz = quizData[currentQuizIndex];
  const isCorrect = selectedAnswer === currentQuiz?.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/navigation'}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors mb-4 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Course</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Interactive Video Quiz - Module 4
              </h1>
              <p className="text-gray-600 text-base">
                Watch the video and answer questions when they appear
              </p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-md">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Completed</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Video Section */}
          <div className="space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-green-200">
              <div className="relative aspect-video bg-gray-100">
                <video
                  ref={videoRef}
                  src="/image/video/MODULE 4_ VIDEO .mp4"
                  className="w-full h-full object-contain"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  playsInline
                />
              </div>
              {/* Video Controls */}
              {!showQuiz && (
                <div className="bg-gradient-to-r from-green-100 to-lime-100 p-5">
                  {/* Timeline with Quiz Markers */}
                  <div className="mb-4 relative">
                    <div
                      onClick={handleTimelineClick}
                      className="w-full bg-green-200 rounded-full h-2 cursor-pointer relative group"
                    >
                      {/* Quiz Markers */}
                      {quizData.map((quiz, idx) => (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all z-10"
                          style={{ left: `${(quiz.timePopUp / videoDuration) * 100}%` }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 border-white transition-all ${askedQuestions.has(idx)
                              ? 'bg-green-500'
                              : 'bg-yellow-400 animate-pulse'
                            }`}>
                          </div>
                        </div>
                      ))}

                      {/* Progress Bar */}
                      <div
                        className="bg-gradient-to-r from-lime-500 to-green-600 h-full rounded-full transition-all relative"
                        style={{ width: `${(currentTime / videoDuration) * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(videoDuration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white p-3 rounded-full transition-all hover:scale-105 shadow-md"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>

                    <button
                      onClick={() => skipTime(-10)}
                      className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border border-green-300"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => skipTime(10)}
                      className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border border-green-300"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    <button
                      onClick={resetVideo}
                      className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border border-green-300"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border border-green-300"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(Number(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-24 h-1 accent-green-600 cursor-pointer"
                      />
                      <button
                        className="bg-white hover:bg-green-50 text-green-700 p-2.5 rounded-full transition-all shadow-sm border border-green-300"
                      >
                        <Maximize className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quiz Modal */}
            {showQuiz && currentQuiz && (
              <div className="bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in border border-green-200">
                <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white px-8 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-green-600 text-xl">?</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Knowledge Check</h3>
                      <p className="text-sm text-green-100">Question {currentQuizIndex + 1} of {quizData.length}</p>
                    </div>
                  </div>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
                    {formatTime(currentQuiz.timePopUp)}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-8">
                    {currentQuiz.question}
                  </h3>

                  {/* Answer Options */}
                  <div className="space-y-4 mb-8">
                    {(['a', 'b', 'c', 'd'] as const).map((option) => {
                      const isSelected = selectedAnswer === option;
                      const isCorrectOption = option === currentQuiz.correctAnswer;
                      const showCorrect = showExplanation && isCorrectOption;
                      const showIncorrect = showExplanation && isSelected && !isCorrect;

                      return (
                        <button
                          key={option}
                          onClick={() => !showExplanation && handleAnswerSelect(option)}
                          disabled={showExplanation}
                          className={`w-full text-left p-5 border-2 rounded-xl transition-all ${showCorrect
                              ? 'border-green-500 bg-green-50'
                              : showIncorrect
                                ? 'border-red-400 bg-red-50'
                                : isSelected
                                  ? 'border-lime-500 bg-lime-50'
                                  : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'
                            } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${showCorrect
                                ? 'border-green-500 bg-green-500'
                                : showIncorrect
                                  ? 'border-red-400 bg-red-400'
                                  : isSelected
                                    ? 'border-lime-600'
                                    : 'border-gray-300'
                              }`}>
                              {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                              {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                              {isSelected && !showExplanation && (
                                <div className="w-3 h-3 bg-lime-600 rounded-full" />
                              )}
                            </div>
                            <span className={`text-lg font-medium ${showCorrect
                                ? 'text-green-800'
                                : showIncorrect
                                  ? 'text-red-800'
                                  : 'text-gray-800'
                              }`}>
                              {currentQuiz[option]}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showExplanation && selectedAnswer && (
                    <div
                      className={`p-5 rounded-xl mb-6 border-2 animate-fade-in ${isCorrect
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'
                            }`}>
                            {isCorrect ? 'Correct!' : 'Not quite right'}
                          </h4>
                          <p className={`text-base leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'
                            }`}>
                            {currentQuiz[`${selectedAnswer}Description` as keyof QuizQuestion]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {!showExplanation ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedAnswer}
                      className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all text-lg shadow-md"
                    >
                      Check Answer
                    </button>
                  ) : isCorrect ? (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-lg shadow-md"
                    >
                      Continue Video
                      <Play className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedAnswer(null);
                        setShowExplanation(false);
                      }}
                      className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all text-lg shadow-md"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8 border border-green-200">
              <h3 className="font-bold text-xl text-gray-800 mb-6">Course Progress</h3>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-medium text-gray-700">Quiz Completion</span>
                  <span className="font-bold text-green-700">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  {askedQuestions.size} of {quizData.length} quizzes completed
                </p>
              </div>

              {/* Quiz List */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-base text-gray-700 mb-4">Quiz Timeline</h4>
                {quizData.map((quiz, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${askedQuestions.has(idx)
                        ? 'bg-green-50 border-green-300'
                        : 'bg-lime-50/50 border-lime-200'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${askedQuestions.has(idx)
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                        : 'bg-gradient-to-br from-lime-400 to-green-500'
                      }`}>
                      {askedQuestions.has(idx) ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        Quiz {idx + 1}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatTime(quiz.timePopUp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Badge */}
              {progress === 100 && (
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-xl p-5 text-center animate-fade-in">
                  <Award className="w-14 h-14 text-yellow-600 mx-auto mb-3" />
                  <h4 className="font-bold text-base text-gray-800 mb-2">Module Complete! 🎉</h4>
                  <p className="text-sm text-gray-600 mb-4">Great job on finishing all knowledge checks</p>
                  <button
                    onClick={() => window.location.href = '/navigation'}
                    className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md"
                  >
                    Back to Course
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoQuizSystem;