// XP and Level utility functions

export function getLevel(xp: number): { level: number; title: string } {
  if (xp >= 80) return { level: 3, title: "Expert" };
  if (xp >= 40) return { level: 2, title: "Intermediate" };
  return { level: 1, title: "Beginner" };
}

export function getXPForNextLevel(xp: number): { current: number; needed: number; progress: number } {
  if (xp >= 80) return { current: xp - 80, needed: 40, progress: Math.min(((xp - 80) / 40) * 100, 100) };
  if (xp >= 40) return { current: xp - 40, needed: 40, progress: ((xp - 40) / 40) * 100 };
  return { current: xp, needed: 40, progress: (xp / 40) * 100 };
}
