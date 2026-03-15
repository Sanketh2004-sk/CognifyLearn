import { getAnalyticsSummary, getAnalytics } from "@/lib/behavior-engine";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Clock, Target, AlertTriangle } from "lucide-react";

const Analytics = () => {
  const navigate = useNavigate();
  const summary = getAnalyticsSummary();
  const entries = getAnalytics();

  const accuracy = summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0;

  const statCards = [
    { icon: Target, label: "Accuracy", value: `${accuracy}%`, color: "text-success" },
    { icon: Clock, label: "Avg Time", value: `${summary.avgTime.toFixed(1)}s`, color: "text-primary" },
    { icon: AlertTriangle, label: "Guesses", value: String(summary.guesses), color: "text-warning" },
    { icon: Brain, label: "Confusions", value: String(summary.confusions), color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-lg mx-auto space-y-6 pt-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground">Behavior Analytics</h1>
        </div>

        {/* No data state */}
        {summary.total === 0 ? (
          <div className="bg-card rounded-2xl p-8 shadow-card border border-border text-center">
            <Brain className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No quiz data yet. Take a quiz first!</p>
            <button
              onClick={() => navigate("/quiz")}
              className="mt-4 px-6 py-2.5 rounded-xl gradient-primary text-primary-foreground font-semibold"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {statCards.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-xl p-4 shadow-card border border-border"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-display font-bold text-card-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Topic breakdown */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-sm font-display font-semibold text-card-foreground mb-3">Topic Performance</h2>
              <div className="space-y-3">
                {Object.entries(summary.topicStats).map(([topic, stats]) => {
                  const pct = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={topic}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-card-foreground font-medium">{topic}</span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-primary transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Response log */}
            <div className="bg-card rounded-xl p-5 shadow-card border border-border">
              <h2 className="text-sm font-display font-semibold text-card-foreground mb-3">Response Log</h2>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {entries.map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm py-2 border-b border-border last:border-0"
                  >
                    <span className="text-lg">{entry.feedback.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-card-foreground font-medium truncate">Q{entry.questionId}</p>
                      <p className="text-xs text-muted-foreground">{entry.timeTaken.toFixed(1)}s · {entry.confidence}</p>
                    </div>
                    <span className={entry.isCorrect ? "text-success text-xs font-medium" : "text-destructive text-xs font-medium"}>
                      {entry.isCorrect ? "Correct" : "Wrong"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
