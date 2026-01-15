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
    question: "Why should vegetables be cut close to serving time when preparing salads?",
    a: "To make them softer",
    b: "To reduce preparation time",
    c: "To maintain freshness and appearance",
    d: "To absorb more dressing",
    aDescription: "Cutting vegetables early does not make them softer in a desirable way.",
    bDescription: "Cutting close to serving time is not mainly about saving time.",
    cDescription: "Correct! Cutting vegetables close to serving time helps maintain freshness and an attractive appearance.",
    dDescription: "Vegetables do not need to absorb dressing early.",
    correctAnswer: "c",
    timePopUp: 90
  },
  {
    question: "What is the correct practice when cooking vegetables, pasta, and grains for salads?",
    a: "Overcook them for better flavor",
    b: "Cook properly, drain well, and chill",
    c: "Cook and serve immediately while hot",
    d: "Cook with dressing already added",
    aDescription: "Overcooking affects texture and quality.",
    bDescription: "Correct! Proper cooking, thorough draining, and chilling ensure good quality salads.",
    cDescription: "Serving hot affects salad quality and safety.",
    dDescription: "Dressings should be added later, not during cooking.",
    correctAnswer: "b",
    timePopUp: 90
  },
  {
    question: "Why must ingredients be cooled before adding mayonnaise in bound salads?",
    a: "To improve color",
    b: "To make mixing easier",
    c: "To prevent separation and spoilage",
    d: "To increase flavor absorption",
    aDescription: "Cooling does not mainly affect color.",
    bDescription: "Ease of mixing is not the main reason.",
    cDescription: "Correct! Cooling ingredients prevents mayonnaise from separating and reduces the risk of spoilage.",
    dDescription: "Flavor absorption is not the primary concern.",
    correctAnswer: "c",
    timePopUp: 90
  },
  {
    question: "Why are potatoes cooked whole before peeling for bound salads?",
    a: "To make peeling easier",
    b: "To retain flavor and nutrients",
    c: "To reduce cooking time",
    d: "To improve color",
    aDescription: "Ease of peeling is not the main reason.",
    bDescription: "Correct! Cooking potatoes whole helps retain their flavor and nutrients.",
    cDescription: "Cooking whole does not reduce cooking time.",
    dDescription: "Color improvement is not the main purpose.",
    correctAnswer: "b",
    timePopUp: 90
  },
  {
    question: "What is done to some fruits to prevent browning in fruit salads?",
    a: "Freezing them",
    b: "Cooking them lightly",
    c: "Dipping them in acidic liquids",
    d: "Adding sugar immediately",
    aDescription: "Freezing is not used to prevent browning during preparation.",
    bDescription: "Cooking fruits is not appropriate for fresh fruit salads.",
    cDescription: "Correct! Acidic liquids help prevent fruits from browning.",
    dDescription: "Sugar does not prevent enzymatic browning.",
    correctAnswer: "c",
    timePopUp: 90
  },
  {
    question: "Why should vegetables be prepared before fruits in salad preparation?",
    a: "Vegetables spoil faster",
    b: "Fruits are harder to cut",
    c: "To avoid flavor transfer",
    d: "To improve presentation",
    aDescription: "Vegetables do not spoil faster than fruits in this context.",
    bDescription: "Difficulty of cutting is not the reason.",
    cDescription: "Correct! Preparing vegetables first prevents flavor transfer to fruits.",
    dDescription: "Presentation is improved, but flavor transfer is the main reason.",
    correctAnswer: "c",
    timePopUp: 90
  },
  {
    question: "Which fruit should NOT be used raw in gelatin salads?",
    a: "Apples",
    b: "Grapes",
    c: "Raw pineapple and papaya",
    d: "Oranges",
    aDescription: "Apples can be used safely in gelatin salads.",
    bDescription: "Grapes do not affect gelatin setting.",
    cDescription: "Correct! Raw pineapple and papaya prevent gelatin from setting.",
    dDescription: "Oranges are safe for gelatin salads.",
    correctAnswer: "c",
    timePopUp: 90
  },
  {
    question: "Which factor is MOST important in making a salad visually appealing?",
    a: "Large portion size",
    b: "Balance of color, texture, and shape",
    c: "Heavy dressing",
    d: "Serving at room temperature",
    aDescription: "Portion size does not determine visual appeal.",
    bDescription: "Correct! Balance in color, texture, and shape enhances salad appearance.",
    cDescription: "Too much dressing can ruin appearance.",
    dDescription: "Salads are best served cold, not for appearance reasons.",
    correctAnswer: "b",
    timePopUp: 90
  },
  {
    question: "When should salad dressings be added to prevent wilting?",
    a: "During preparation",
    b: "Several hours before serving",
    c: "Just before serving",
    d: "After refrigeration",
    aDescription: "Adding dressing too early causes wilting.",
    bDescription: "Several hours is too long before serving.",
    cDescription: "Correct! Dressings should be added just before serving.",
    dDescription: "Refrigeration alone does not prevent wilting.",
    correctAnswer: "c",
    timePopUp: 90
  },
  {
    question: "Which practice ensures proper hygiene in salad preparation?",
    a: "Using the same utensils repeatedly",
    b: "Washing fruits and vegetables with running water",
    c: "Preparing food without washing hands",
    d: "Ignoring damaged parts of produce",
    aDescription: "Using the same utensils can cause contamination.",
    bDescription: "Correct! Washing produce thoroughly with clean running water ensures safety.",
    cDescription: "Handwashing is essential in food preparation.",
    dDescription: "Damaged parts should always be removed.",
    correctAnswer: "b",
    timePopUp: 90
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
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.location.href = '/navigation'}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Course</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Interactive Video Quiz - Module 4
              </h1>
              <p className="text-gray-400 text-base">
                Watch the video and answer questions when they appear
              </p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-lg">
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
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src="image/video/mods4_video.mp4"   // 👈 PUT YOUR VIDEO HERE
                  className="w-full h-full object-contain"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  playsInline
                />
              </div>
              {/* Video Controls */}
              {!showQuiz && (
                <div className="bg-gray-950 p-5">
                  {/* Timeline with Quiz Markers */}
                  <div className="mb-4 relative">
                    <div
                      onClick={handleTimelineClick}
                      className="w-full bg-gray-700 rounded-full h-2 cursor-pointer relative group"
                    >
                      {/* Quiz Markers */}
                      {quizData.map((quiz, idx) => (
                        <div
                          key={idx}
                          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all z-10"
                          style={{ left: `${(quiz.timePopUp / videoDuration) * 100}%` }}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 border-gray-950 transition-all ${askedQuestions.has(idx)
                              ? 'bg-emerald-500'
                              : 'bg-yellow-500 animate-pulse'
                            }`}>
                          </div>
                        </div>
                      ))}

                      {/* Progress Bar */}
                      <div
                        className="bg-red-600 h-full rounded-full transition-all relative"
                        style={{ width: `${(currentTime / videoDuration) * 100}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(videoDuration)}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="bg-white hover:bg-gray-100 text-gray-900 p-3 rounded-full transition-all hover:scale-105"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </button>

                    <button
                      onClick={() => skipTime(-10)}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-full transition-all"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => skipTime(10)}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-full transition-all"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>

                    <button
                      onClick={resetVideo}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-full transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-3 ml-auto">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-full transition-all"
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
                        className="w-24 h-1 accent-white cursor-pointer"
                      />
                      <button
                        className="bg-gray-800 hover:bg-gray-700 text-white p-2.5 rounded-full transition-all"
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
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                <div className="bg-gray-900 text-white px-8 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-gray-900 text-xl">?</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Knowledge Check</h3>
                      <p className="text-sm text-gray-400">Question {currentQuizIndex + 1} of {quizData.length}</p>
                    </div>
                  </div>
                  <span className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium">
                    {formatTime(currentQuiz.timePopUp)}
                  </span>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">
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
                              ? 'border-emerald-500 bg-emerald-50'
                              : showIncorrect
                                ? 'border-red-500 bg-red-50'
                                : isSelected
                                  ? 'border-gray-900 bg-gray-50'
                                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                            } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${showCorrect
                                ? 'border-emerald-500 bg-emerald-500'
                                : showIncorrect
                                  ? 'border-red-500 bg-red-500'
                                  : isSelected
                                    ? 'border-gray-900'
                                    : 'border-gray-300'
                              }`}>
                              {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                              {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                              {isSelected && !showExplanation && (
                                <div className="w-3 h-3 bg-gray-900 rounded-full" />
                              )}
                            </div>
                            <span className={`text-lg font-medium ${showCorrect
                                ? 'text-emerald-900'
                                : showIncorrect
                                  ? 'text-red-900'
                                  : 'text-gray-900'
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
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-red-50 border-red-200'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCorrect ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-emerald-900' : 'text-red-900'
                            }`}>
                            {isCorrect ? 'Correct!' : 'Not quite right'}
                          </h4>
                          <p className={`text-base leading-relaxed ${isCorrect ? 'text-emerald-800' : 'text-red-800'
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
                      className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all text-lg"
                    >
                      Check Answer
                    </button>
                  ) : isCorrect ? (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 text-lg"
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
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all text-lg"
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
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Course Progress</h3>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-medium text-gray-700">Quiz Completion</span>
                  <span className="font-bold text-gray-900">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all duration-500"
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
                        ? 'bg-emerald-50 border-emerald-200'
                        : 'bg-gray-50 border-gray-200'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${askedQuestions.has(idx)
                        ? 'bg-emerald-500'
                        : 'bg-gray-300'
                      }`}>
                      {askedQuestions.has(idx) ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Quiz {idx + 1}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatTime(quiz.timePopUp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Badge */}
              {progress === 100 && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-5 text-center animate-fade-in">
                  <Award className="w-14 h-14 text-yellow-600 mx-auto mb-3" />
                  <h4 className="font-bold text-base text-gray-900 mb-2">Module Complete! 🎉</h4>
                  <p className="text-sm text-gray-600 mb-4">Great job on finishing all knowledge checks</p>
                  <button
                    onClick={() => window.location.href = '/navigation'}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all"
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