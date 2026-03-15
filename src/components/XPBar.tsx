import { motion } from "framer-motion";
import { getLevel, getXPForNextLevel } from "@/lib/xp-utils";

interface XPBarProps {
  xp: number;
}

// XP progress bar with animated fill
const XPBar = ({ xp }: XPBarProps) => {
  const { progress } = getXPForNextLevel(xp);
  const { level, title } = getLevel(xp);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-muted-foreground">
          Level {level} · {title}
        </span>
        <span className="text-sm font-bold text-primary">{xp} XP</span>
      </div>
      <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default XPBar;
