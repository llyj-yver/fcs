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
      toEmail: "jyllyvers@email.com", // replace with dynamic email
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${passed ? 'bg-emerald-100' : 'bg-orange-100'
              }`}>
              {passed ? (
                <Award className="w-12 h-12 text-emerald-600" />
              ) : (
                <RotateCcw className="w-12 h-12 text-orange-600" />
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              You scored <span className="font-bold text-gray-900">{score}</span> out of <span className="font-bold text-gray-900">{quizQuestions.length}</span>
            </p>

            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Your Score</span>
                <span className="font-bold text-gray-900">{percentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 ${passed ? 'bg-gradient-to-r from-emerald-600 to-lime-600' : 'bg-gradient-to-r from-orange-500 to-amber-500'
                    }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            {passed ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-8">
                <p className="text-emerald-800 font-medium">
                  Great job! You've demonstrated a solid understanding of salad preparation concepts.
                </p>
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
                <p className="text-orange-800 font-medium">
                  You need at least 70% to pass. Review the course materials and try again!
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetakeQuiz}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Retake Quiz
              </button>
              <button
                onClick={() => window.location.href = '/navigation'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
              >
                <Home className="w-5 h-5" />
                Back to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between text-white mb-6">
          <button
            onClick={() => window.location.href = '/navigation'}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm">Exit Quiz</span>
          </button>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-lime-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Question Header */}
          <div className="bg-gray-50 border-b border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {question.question}
            </h2>
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
                  className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all ${showCorrect
                    ? 'border-emerald-500 bg-emerald-50'
                    : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio Button */}
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${showCorrect
                      ? 'border-emerald-500 bg-emerald-500'
                      : showIncorrect
                        ? 'border-red-500 bg-red-500'
                        : isSelected
                          ? 'border-gray-900 bg-gray-900'
                          : 'border-gray-300'
                      }`}>
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                      {isSelected && !showExplanation && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>

                    {/* Option Text */}
                    <span className={`text-base md:text-lg font-medium ${showCorrect
                      ? 'text-emerald-900'
                      : showIncorrect
                        ? 'text-red-900'
                        : 'text-gray-900'
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
            <div className={`mx-6 md:mx-8 mb-6 md:mb-8 p-5 rounded-xl border-2 ${isCorrect
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-red-50 border-red-200'
              }`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-emerald-900' : 'text-red-900'
                    }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className={`text-base leading-relaxed ${isCorrect ? 'text-emerald-800' : 'text-red-800'
                    }`}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-gray-50 border-t border-gray-200 p-6 md:p-8">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
                  }`}
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-lime-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
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
      </div>
    </div>
  );
}