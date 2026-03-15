import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Crown, User } from "lucide-react";
import { getLevel } from "@/lib/xp-utils";

// Mock leaderboard data for hackathon demo
const mockLeaderboard = [
  { name: "Arjun S.", xp: 180, accuracy: 92, avatar: "🧑‍💻" },
  { name: "Priya M.", xp: 155, accuracy: 88, avatar: "👩‍🎓" },
  { name: "Rahul K.", xp: 130, accuracy: 85, avatar: "🧑‍🔬" },
  { name: "Sneha R.", xp: 110, accuracy: 80, avatar: "👩‍💻" },
  { name: "Vikram D.", xp: 95, accuracy: 78, avatar: "🧑‍🎓" },
  { name: "Ananya P.", xp: 85, accuracy: 75, avatar: "👩‍🔬" },
  { name: "Karthik N.", xp: 60, accuracy: 70, avatar: "🧑‍💻" },
  { name: "You", xp: 0, accuracy: 0, avatar: "🌟" },
];

const rankIcons = [Crown, Medal, Trophy];
const rankColors = ["text-warning", "text-muted-foreground", "text-accent"];

const Leaderboard = () => {
  const navigate = useNavigate();
  const [sorted] = useState(() =>
    [...mockLeaderboard].sort((a, b) => b.xp - a.xp)
  );

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
          <h1 className="text-xl font-display font-bold text-foreground">Leaderboard</h1>
        </div>

        {/* Top 3 podium */}
        <div className="flex items-end justify-center gap-3 pt-4">
          {[1, 0, 2].map((idx) => {
            const player = sorted[idx];
            if (!player) return null;
            const rank = idx + 1;
            const isFirst = rank === 1;
            const Icon = rankIcons[idx] || Trophy;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`flex flex-col items-center ${isFirst ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}
              >
                <Icon className={`w-5 h-5 mb-1 ${rankColors[idx]}`} />
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    isFirst
                      ? "gradient-hero shadow-glow"
                      : "bg-secondary border-2 border-border"
                  }`}
                >
                  {player.avatar}
                </div>
                <p className="text-xs font-semibold text-card-foreground mt-1.5 truncate max-w-[80px] text-center">
                  {player.name}
                </p>
                <p className="text-xs text-primary font-bold">{player.xp} XP</p>
                <div
                  className={`mt-1 rounded-t-lg w-20 flex items-center justify-center font-display font-bold text-primary-foreground ${
                    isFirst ? "h-20 gradient-primary" : idx === 1 ? "h-14 bg-muted-foreground/20 text-muted-foreground" : "h-10 bg-muted-foreground/10 text-muted-foreground"
                  }`}
                >
                  #{rank}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full list */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {sorted.map((player, i) => {
            const { level, title } = getLevel(player.xp);
            const rank = i + 1;
            return (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 ${
                  player.name === "You" ? "bg-primary/5" : ""
                }`}
              >
                <span className="w-6 text-center text-sm font-bold text-muted-foreground">
                  {rank <= 3 ? (
                    <span className={rankColors[rank - 1]}>{rank}</span>
                  ) : (
                    rank
                  )}
                </span>
                <span className="text-xl">{player.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-card-foreground truncate">
                    {player.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Lv.{level} {title} · {player.accuracy}% accuracy
                  </p>
                </div>
                <span className="text-sm font-bold text-primary">{player.xp} XP</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
