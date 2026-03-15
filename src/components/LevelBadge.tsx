import { motion } from "framer-motion";
import { getLevel } from "@/lib/xp-utils";
import { Trophy, Star, Zap } from "lucide-react";

interface LevelBadgeProps {
  xp: number;
}

const levelIcons = [Zap, Star, Trophy];
const levelColors = [
  "from-primary/80 to-primary",
  "from-primary to-accent",
  "from-accent to-primary",
];

// Animated level badge showing current rank
const LevelBadge = ({ xp }: LevelBadgeProps) => {
  const { level, title } = getLevel(xp);
  const Icon = levelIcons[level - 1];

  return (
    <motion.div
      key={level}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${levelColors[level - 1]} text-primary-foreground font-display font-semibold text-sm shadow-glow`}
    >
      <Icon className="w-4 h-4" />
      <span>Level {level}</span>
      <span className="opacity-80">·</span>
      <span className="opacity-90">{title}</span>
    </motion.div>
  );
};

export default LevelBadge;
