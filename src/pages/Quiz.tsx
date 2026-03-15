import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { questions } from "@/data/questions";
import { ConfidenceLevel, submitAnswer, BehaviorFeedback as FeedbackType } from "@/lib/behavior-engine";
import QuizCard from "@/components/QuizCard";
import ConfidenceSelector from "@/components/ConfidenceSelector";
import BehaviorFeedback from "@/components/BehaviorFeedback";
import XPBar from "@/components/XPBar";
import LevelBadge from "@/components/LevelBadge";
import { ArrowRight, BarChart3 } from "lucide-react";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [xp, setXp] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Timer for tracking response time
  const startTimeRef = useRef<number>(Date.now());

  // Reset timer on new question
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];

  // Handle answer submission
  const handleSubmit = () => {
    if (selectedOption === null || confidence === null) return;

    const timeTaken = (Date.now() - startTimeRef.current) / 1000;

    const result = submitAnswer({
      questionId: currentQuestion.id,
      selected: selectedOption,
      correct: currentQuestion.correct,
      confidence,
      timeTaken,
      topic: currentQuestion.topic,
    });

    setFeedback(result.feedback);
    setXp((prev) => prev + result.xpGained);
    setIsSubmitted(true);
  };

  // Move to next question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setConfidence(null);
      setIsSubmitted(false);
      setFeedback(null);
    } else {
      setQuizComplete(true);
    }
  };

  // Quiz complete screen
  if (quizComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl p-8 shadow-card border border-border text-center max-w-md w-full"
        >
          <span className="text-5xl block mb-4">🎉</span>
          <h1 className="text-2xl font-display font-bold text-card-foreground mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-6">You earned {xp} XP total</p>
          <LevelBadge xp={xp} />
          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate("/analytics")}
              className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-glow transition-transform hover:scale-[1.02]"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setConfidence(null);
                setIsSubmitted(false);
                setFeedback(null);
                setQuizComplete(false);
              }}
              className="w-full py-3 rounded-xl border-2 border-border text-card-foreground font-semibold hover:bg-secondary transition-colors"
            >
              Retry Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="w-full max-w-lg mx-auto px-4 pt-6 pb-2 space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-display font-bold text-foreground">CognifyLearn</h1>
          <LevelBadge xp={xp} />
        </div>
        <XPBar xp={xp} />
      </div>

      {/* Quiz content */}
      <div className="flex-1 flex items-start justify-center px-4 pt-4 pb-8">
        <div className="w-full max-w-lg space-y-4">
          <AnimatePresence mode="wait">
            <QuizCard
              key={currentQuestion.id}
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
              isSubmitted={isSubmitted}
              questionNumber={currentIndex + 1}
              totalQuestions={questions.length}
            />
          </AnimatePresence>

          {/* Confidence selector - show before submission */}
          {!isSubmitted && (
            <ConfidenceSelector selected={confidence} onSelect={setConfidence} />
          )}

          {/* Behavior feedback - show after submission */}
          <BehaviorFeedback feedback={feedback} />

          {/* Action button */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || confidence === null}
              className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.01] shadow-glow"
            >
              Submit Answer
            </button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-glow"
            >
              {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
