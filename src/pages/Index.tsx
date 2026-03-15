import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Sparkles, BarChart3, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Brain, title: "Cognitive Tracking", desc: "Analyzes how you think, not just what you answer" },
    { icon: Zap, title: "Gamified XP", desc: "Earn XP, level up, and track your progress" },
    { icon: BarChart3, title: "Smart Analytics", desc: "Detailed behavior insights for every session" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md w-full space-y-8"
      >
        {/* Logo / Brand */}
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-2xl gradient-hero mx-auto flex items-center justify-center mb-4 shadow-glow"
          >
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            CognifyLearn
          </h1>
          <p className="text-muted-foreground mt-2">
            Cognitive Behavior-Driven Gamified Learning
          </p>
        </div>

        {/* Feature cards */}
        <div className="space-y-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border shadow-card text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/quiz")}
            className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-display font-semibold text-lg shadow-glow transition-transform hover:scale-[1.02] animate-pulse-glow"
          >
            Start Quiz 🚀
          </button>
          <button
            onClick={() => navigate("/analytics")}
            className="w-full py-3 rounded-xl border-2 border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            View Analytics
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="w-full py-3 rounded-xl border-2 border-border text-foreground font-medium hover:bg-secondary transition-colors"
          >
            🏆 Leaderboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
