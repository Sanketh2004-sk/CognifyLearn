// Cognitive behavior analysis engine
export type ConfidenceLevel = "low" | "medium" | "high";

export interface SubmitPayload {
  questionId: number;
  selected: number;
  correct: number;
  confidence: ConfidenceLevel;
  timeTaken: number; // in seconds
  topic: string;
}

export interface BehaviorFeedback {
  type: "guessed" | "confusion" | "reinforcement" | "correct" | "wrong";
  message: string;
  emoji: string;
}

export interface AnalyticsEntry extends SubmitPayload {
  isCorrect: boolean;
  feedback: BehaviorFeedback;
  timestamp: number;
}

// In-memory analytics store
let analyticsStore: AnalyticsEntry[] = [];

// Analyze cognitive behavior and return feedback
export function analyzeBehavior(payload: SubmitPayload): BehaviorFeedback {
  const isCorrect = payload.selected === payload.correct;

  // IF answer wrong AND timeTaken < 3s → user guessed
  if (!isCorrect && payload.timeTaken < 3) {
    return {
      type: "guessed",
      message: "Looks like you guessed! Take more time to read the question carefully.",
      emoji: "🎲",
    };
  }

  // IF answer wrong AND timeTaken > 8s → concept confusion
  if (!isCorrect && payload.timeTaken > 8) {
    return {
      type: "confusion",
      message: `You seem confused about ${payload.topic}. Consider revisiting the fundamentals.`,
      emoji: "🤔",
    };
  }

  // IF answer correct BUT confidence = low → needs reinforcement
  if (isCorrect && payload.confidence === "low") {
    return {
      type: "reinforcement",
      message: "You got it right but weren't confident. Practice more to build certainty!",
      emoji: "💪",
    };
  }

  // Correct answer with good confidence
  if (isCorrect) {
    return {
      type: "correct",
      message: "Excellent! You nailed it with confidence!",
      emoji: "🎯",
    };
  }

  // Default wrong answer
  return {
    type: "wrong",
    message: "Not quite right. Review this topic and try again!",
    emoji: "📚",
  };
}

// Submit an answer and store analytics
export function submitAnswer(payload: SubmitPayload): { feedback: BehaviorFeedback; xpGained: number } {
  const feedback = analyzeBehavior(payload);
  const isCorrect = payload.selected === payload.correct;

  const entry: AnalyticsEntry = {
    ...payload,
    isCorrect,
    feedback,
    timestamp: Date.now(),
  };

  analyticsStore.push(entry);

  // XP calculation: correct = 20, wrong = 5 (participation)
  const xpGained = isCorrect ? 20 : 5;

  return { feedback, xpGained };
}

// Get all analytics data
export function getAnalytics(): AnalyticsEntry[] {
  return [...analyticsStore];
}

// Get summary stats
export function getAnalyticsSummary() {
  const total = analyticsStore.length;
  const correct = analyticsStore.filter((e) => e.isCorrect).length;
  const avgTime = total > 0 ? analyticsStore.reduce((sum, e) => sum + e.timeTaken, 0) / total : 0;
  const guesses = analyticsStore.filter((e) => e.feedback.type === "guessed").length;
  const confusions = analyticsStore.filter((e) => e.feedback.type === "confusion").length;

  // Topic breakdown
  const topicStats: Record<string, { correct: number; total: number }> = {};
  analyticsStore.forEach((e) => {
    if (!topicStats[e.topic]) topicStats[e.topic] = { correct: 0, total: 0 };
    topicStats[e.topic].total++;
    if (e.isCorrect) topicStats[e.topic].correct++;
  });

  return { total, correct, avgTime, guesses, confusions, topicStats };
}

// Reset analytics (for new session)
export function resetAnalytics() {
  analyticsStore = [];
}
