"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Award,
  Clock,
  ChevronRight,
  Home,
  RotateCcw
} from "lucide-react";
import { sendEmailWithFile } from "../utils/emailSender";


const quizQuestions = [
  {
    id: 1,
    question: "What is a salad?",
    options: [
      "A cooked dish served hot",
      "A combination of vegetables, fruits, and other ingredients served with dressing",
      "A dish made only of meat",
      "A baked dessert item"
    ],
    correctAnswer: 1,
    explanation: "A salad is a combination of vegetables, fruits, and other ingredients, usually served with a dressing."
  },
  {
    id: 2,
    question: "What does the French term 'mise en place' mean?",
    options: [
      "Mixing ingredients together",
      "Cooking food properly",
      "Setting everything in place before cooking",
      "Serving food attractively"
    ],
    correctAnswer: 2,
    explanation: "Mise en place means 'setting everything in place'—organizing and preparing ingredients before cooking."
  },
  {
    id: 3,
    question: "Which of the following is NOT a classification of salads according to ingredients used?",
    options: [
      "Green salad",
      "Bound salad",
      "Soup salad",
      "Gelatin salad"
    ],
    correctAnswer: 2,
    explanation: "Soup salad is not a classification of salad according to ingredients used."
  },
  {
    id: 4,
    question: "Which salad is made primarily of leafy vegetables such as lettuce or spinach?",
    options: [
      "Bound salad",
      "Green salad",
      "Fruit salad",
      "Gelatin salad"
    ],
    correctAnswer: 1,
    explanation: "Green salads are made mainly from fresh leafy vegetables like lettuce, spinach, or cabbage."
  },
  {
    id: 5,
    question: "What ingredient usually binds the ingredients of a bound salad together?",
    options: [
      "Oil and vinegar",
      "Gelatin",
      "Mayonnaise",
      "Fruit juice"
    ],
    correctAnswer: 2,
    explanation: "Bound salads use thick dressings like mayonnaise to hold the ingredients together."
  },
  {
    id: 6,
    question: "Why should vegetables be cut close to serving time?",
    options: [
      "To improve flavor",
      "To maintain freshness and quality",
      "To reduce preparation time",
      "To make them softer"
    ],
    correctAnswer: 1,
    explanation: "Cutting vegetables close to serving time helps maintain freshness, color, and texture."
  },
  {
    id: 7,
    question: "Why must cooked vegetables be drained and chilled before use in salads?",
    options: [
      "To make them sweeter",
      "To prevent sogginess and spoilage",
      "To improve color only",
      "To reduce cost"
    ],
    correctAnswer: 1,
    explanation: "Draining and chilling cooked vegetables prevents excess moisture and helps keep salads fresh."
  },
  {
    id: 8,
    question: "Why are some fruits dipped in acidic liquids when preparing fruit salads?",
    options: [
      "To make them sweeter",
      "To soften the fruit",
      "To prevent browning or discoloration",
      "To remove seeds"
    ],
    correctAnswer: 2,
    explanation: "Acidic liquids help prevent fruits from browning and keep them looking fresh."
  },
  {
    id: 9,
    question: "What is unique about a composed salad?",
    options: [
      "Ingredients are mixed together",
      "Ingredients are cooked in gelatin",
      "Ingredients are arranged separately on a plate",
      "It always contains fruit"
    ],
    correctAnswer: 2,
    explanation: "Composed salads feature ingredients arranged attractively rather than mixed together."
  },
  {
    id: 10,
    question: "Why are raw pineapple and papaya not used in gelatin salads?",
    options: [
      "They taste bitter",
      "They are too sweet",
      "They prevent gelatin from setting",
      "They lose color"
    ],
    correctAnswer: 2,
    explanation: "Raw pineapple and papaya contain enzymes that prevent gelatin from setting properly."
  },
  {
    id: 11,
    question: "What does balance mean in salad preparation?",
    options: [
      "Using only one color",
      "Mixing everything together",
      "Arranging ingredients by color, shape, texture, and flavor",
      "Adding more dressing"
    ],
    correctAnswer: 2,
    explanation: "Balance means combining colors, textures, shapes, and flavors to enhance appearance and taste."
  },
  {
    id: 12,
    question: "Why is harmony important in salad preparation?",
    options: [
      "To make the salad bigger",
      "To ensure ingredients complement each other",
      "To reduce preparation time",
      "To use more garnish"
    ],
    correctAnswer: 1,
    explanation: "Harmony ensures that ingredients and dressing complement each other for a unified flavor."
  },
  {
    id: 13,
    question: "When should dressing be added to green salads?",
    options: [
      "Several hours before serving",
      "The night before",
      "Immediately before serving",
      "After refrigeration overnight"
    ],
    correctAnswer: 2,
    explanation: "Adding dressing just before serving prevents wilting and keeps the salad crisp."
  },
  {
    id: 14,
    question: "Why should salads be plated on cold plates?",
    options: [
      "To make them heavier",
      "To improve color only",
      "To keep salads fresh and crisp",
      "To add flavor"
    ],
    correctAnswer: 2,
    explanation: "Cold plates help maintain the freshness and crispness of salads."
  },
  {
    id: 15,
    question: "Why is proper hygiene important when preparing salads?",
    options: [
      "To improve taste only",
      "To save time",
      "To prevent contamination and foodborne illness",
      "To make salads colorful"
    ],
    correctAnswer: 2,
    explanation: "Proper hygiene prevents contamination and ensures salads are safe and healthy to eat."
  }
];


export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  useEffect(() => {
    if (!quizCompleted) return;

    const percentage = (score / quizQuestions.length) * 100;
    if (percentage < 70) return;

    const emailSent = sessionStorage.getItem("quizEmailSent");
    if (emailSent) return;

    sessionStorage.setItem("quizEmailSent", "true");

    sendEmailWithFile({
      toEmail: "jyllyvers@email.com",
      toName: "Student",
      subject: "Quiz Passed – Module 2",
      message: `
Congratulations!

You passed Module 2 – Components of a Salad.

Score: ${score}/${quizQuestions.length}
Percentage: ${percentage.toFixed(0)}%

Keep up the great work!
      `,
    });
  }, [quizCompleted, score]);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowExplanation(true);
    if (isCorrect && !answeredQuestions.includes(currentQuestion)) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    sessionStorage.removeItem("quizEmailSent");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setAnsweredQuestions([]);
  };

  if (quizCompleted) {
    const percentage = (score / quizQuestions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-2 border-green-200 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-lime-200 to-green-300 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-emerald-200 to-lime-300 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10">
              <div className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg ${
                passed 
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                  : 'bg-gradient-to-br from-orange-400 to-amber-500'
              }`}>
                {passed ? (
                  <Award className="w-14 h-14 text-white" />
                ) : (
                  <RotateCcw className="w-14 h-14 text-white" />
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-4">
                {passed ? 'Congratulations!' : 'Keep Practicing!'}
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                You scored <span className="font-bold text-green-700 text-2xl">{score}</span> out of <span className="font-bold text-gray-800 text-2xl">{quizQuestions.length}</span>
              </p>

              <div className="mb-8 bg-gradient-to-r from-green-50 to-lime-50 rounded-2xl p-6 border border-green-200">
                <div className="flex justify-between text-sm mb-3">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-4 h-4 text-green-600">🎯</span>
                    Your Score
                  </span>
                  <span className="font-bold text-green-700 text-lg">{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-5 shadow-inner">
                  <div
                    className={`h-5 rounded-full transition-all duration-1000 shadow-md ${
                      passed 
                        ? 'bg-gradient-to-r from-green-500 via-lime-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-orange-400 to-amber-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {passed ? (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-8 shadow-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">✨</span>
                    <h3 className="font-bold text-green-800 text-lg">Excellent Work!</h3>
                  </div>
                  <p className="text-green-700 font-medium">
                    You've demonstrated a solid understanding of salad preparation concepts.
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-6 mb-8 shadow-lg">
                  <h3 className="font-bold text-orange-800 text-lg mb-2">Almost There!</h3>
                  <p className="text-orange-700 font-medium">
                    You need at least 70% to pass. Review the course materials and try again!
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRetakeQuiz}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all shadow-md border-2 border-green-300 hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retake Quiz
                </button>
                <button
                  onClick={() => window.location.href = '/navigation'}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
                >
                  <Home className="w-5 h-5" />
                  Back to Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.location.href = '/navigation'}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200 hover:shadow-md"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Exit Quiz</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-full p-1 shadow-md border border-green-200">
          <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500 shadow-md"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-lime-50 to-green-50 border-b-2 border-green-200 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                {question.question}
              </h2>
            </div>
          </div>

          {/* Options */}
          <div className="p-6 md:p-8 space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === question.correctAnswer;
              const showCorrect = showExplanation && isCorrectOption;
              const showIncorrect = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg scale-105'
                      : showIncorrect
                        ? 'border-red-400 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg'
                        : isSelected
                          ? 'border-lime-500 bg-gradient-to-r from-lime-50 to-green-50 shadow-md scale-105'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50 hover:shadow-md'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-102'}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio Button */}
                    <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      showCorrect
                        ? 'border-green-500 bg-green-500 shadow-md'
                        : showIncorrect
                          ? 'border-red-400 bg-red-400 shadow-md'
                          : isSelected
                            ? 'border-lime-600 bg-lime-600 shadow-md'
                            : 'border-gray-300 bg-white'
                    }`}>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                      {showIncorrect && <XCircle className="w-5 h-5 text-white" />}
                      {isSelected && !showExplanation && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>

                    {/* Option Text */}
                    <span className={`text-base md:text-lg font-medium ${
                      showCorrect
                        ? 'text-green-900'
                        : showIncorrect
                          ? 'text-red-900'
                          : 'text-gray-800'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mx-6 md:mx-8 mb-6 md:mb-8 p-6 rounded-2xl border-2 shadow-lg ${
              isCorrect
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-300'
            }`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {isCorrect ? (
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-400 flex items-center justify-center shadow-md">
                      <XCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-xl mb-2 ${
                    isCorrect ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {isCorrect ? '✨ Correct!' : '❌ Incorrect'}
                  </h3>
                  <p className={`text-base leading-relaxed ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-gradient-to-r from-green-50 to-lime-50 border-t-2 border-green-200 p-6 md:p-8">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-md ${
                  selectedAnswer === null
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-lime-500 to-green-600 text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 bg-gradient-to-r from-lime-500 to-green-600 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                {currentQuestion < quizQuestions.length - 1 ? (
                  <>
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    View Results
                    <Award className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Score Indicator */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-md border border-green-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Current Score</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-700">{score}</span>
              <span className="text-gray-400">/</span>
              <span className="text-lg text-gray-600">{quizQuestions.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}