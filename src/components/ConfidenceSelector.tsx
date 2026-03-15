import { ConfidenceLevel } from "@/lib/behavior-engine";
import { cn } from "@/lib/utils";

interface ConfidenceSelectorProps {
  selected: ConfidenceLevel | null;
  onSelect: (level: ConfidenceLevel) => void;
}

const levels: { value: ConfidenceLevel; label: string; emoji: string }[] = [
  { value: "low", label: "Not Sure", emoji: "😬" },
  { value: "medium", label: "Maybe", emoji: "🤞" },
  { value: "high", label: "Confident", emoji: "😎" },
];

// Confidence selector buttons for cognitive tracking
const ConfidenceSelector = ({ selected, onSelect }: ConfidenceSelectorProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">How confident are you?</p>
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => onSelect(level.value)}
            className={cn(
              "flex-1 py-2.5 px-3 rounded-lg border-2 text-sm font-medium transition-all duration-200",
              selected === level.value
                ? "border-primary bg-primary text-primary-foreground shadow-glow"
                : "border-border bg-card text-card-foreground hover:border-primary/50 hover:bg-secondary"
            )}
          >
            <span className="mr-1">{level.emoji}</span>
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfidenceSelector;
