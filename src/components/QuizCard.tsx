import { motion } from "framer-motion";
import { Question } from "@/data/questions";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  question: Question;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  isSubmitted: boolean;
  questionNumber: number;
  totalQuestions: number;
}

// Quiz question card with animated option selection
const QuizCard = ({
  question,
  selectedOption,
  onSelectOption,
  isSubmitted,
  questionNumber,
  totalQuestions,
}: QuizCardProps) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border"
    >
      {/* Question header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
          {question.topic}
        </span>
        <span className="text-sm text-muted-foreground font-medium">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-lg font-display font-semibold text-card-foreground mb-5">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-2.5">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = isSubmitted && index === question.correct;
          const isWrong = isSubmitted && isSelected && index !== question.correct;

          return (
            <button
              key={index}
              onClick={() => !isSubmitted && onSelectOption(index)}
              disabled={isSubmitted}
              className={cn(
                "w-full text-left p-3.5 rounded-xl border-2 transition-all duration-200 text-sm font-medium",
                !isSubmitted && !isSelected && "border-border bg-card text-card-foreground hover:border-primary/40 hover:bg-secondary/50",
                !isSubmitted && isSelected && "border-primary bg-primary/10 text-primary shadow-glow",
                isCorrect && "border-success bg-success/10 text-success",
                isWrong && "border-destructive bg-destructive/10 text-destructive"
              )}
            >
              <span className="mr-2 opacity-60">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuizCard;
