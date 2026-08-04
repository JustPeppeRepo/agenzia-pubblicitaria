/** Shared easeOut — smooth deceleration, no ease-in “kick”. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const ENTRANCE_TRANSITION = {
  type: "tween" as const,
  duration: 0.55,
  ease: EASE_OUT,
};
