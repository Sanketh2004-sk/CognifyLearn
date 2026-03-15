import { motion, AnimatePresence } from "framer-motion";
import { BehaviorFeedback as FeedbackType } from "@/lib/behavior-engine";
import { cn } from "@/lib/utils";

interface BehaviorFeedbackProps {
  feedback: FeedbackType | null;
}

const typeStyles: Record<string, string> = {
  correct: "bg-success/10 border-success/30 text-success",
  wrong: "bg-destructive/10 border-destructive/30 text-destructive",
  guessed: "bg-warning/10 border-warning/30 text-warning",
  confusion: "bg-accent/10 border-accent/30 text-accent",
  reinforcement: "bg-primary/10 border-primary/30 text-primary",
};

// Animated feedback card after answer submission
const BehaviorFeedback = ({ feedback }: BehaviorFeedbackProps) => {
  return (
    <AnimatePresence mode="wait">
      {feedback && (
        <motion.div
          key={feedback.type}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "p-4 rounded-xl border-2 text-center",
            typeStyles[feedback.type]
          )}
        >
          <span className="text-2xl block mb-1">{feedback.emoji}</span>
          <p className="text-sm font-medium">{feedback.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BehaviorFeedback;
