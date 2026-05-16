import type { SealKey } from "@/lib/types";
import { SEAL_ORDER, SEALS } from "@/lib/content/seals";

/**
 * Précharge les 6 sceaux pour que la roue défile sans flicker.
 * Sécurité : si une image met plus de 1.5s, on continue quand même.
 */
export function preloadAllSeals(callback: () => void): void {
  const keys = SEAL_ORDER;
  let loaded = 0;
  let done = false;
  const safety = window.setTimeout(() => {
    if (!done) {
      done = true;
      callback();
    }
  }, 1500);
  keys.forEach((key) => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === keys.length && !done) {
        done = true;
        window.clearTimeout(safety);
        callback();
      }
    };
    img.src = SEALS[key].img;
  });
}

/**
 * Construit la séquence d'images de la roue.
 * Le legacy avait 12 sceaux × 2 cycles + queue de 6 + cible.
 * On a 6 sceaux : 3 cycles + queue de 5 + cible, pour préserver
 * la durée totale de spin (~3.7s) du V37 original.
 */
export function buildWheelSequence(targetKey: SealKey): SealKey[] {
  const all = SEAL_ORDER;
  const shuffled = [...all].sort(() => Math.random() - 0.5);

  const sequence: SealKey[] = [];
  for (let i = 0; i < 3; i++) {
    sequence.push(...shuffled);
  }
  const tail = shuffled.filter((k) => k !== targetKey);
  sequence.push(...tail.slice(-5), targetKey);
  return sequence;
}

/**
 * Calcule le délai à appliquer après l'affichage du sceau à `step`,
 * sachant qu'il reste `remaining` éléments dans la séquence après celui-ci.
 *
 * Cycle rapide à 50ms tant qu'on est loin de la fin, puis ralentissement
 * progressif sur les 7 derniers pas selon la formule du legacy :
 * 90, 130, 190, 280, 410, 600, 880 ms (raison ≈ 1.46).
 */
export function delayForStep(remaining: number): number {
  if (remaining > 7) return 50;
  return Math.round(90 * Math.pow(1.46, 7 - remaining));
}

export type SpinCallback = () => void;

/**
 * Fait défiler la roue dans `setSealKey` en cascade setTimeout.
 * Appelle `onComplete` une fois arrêtée sur la cible.
 * Retourne une fonction de cleanup qui annule les timeouts en cours.
 */
export function spinSealWheel(
  targetKey: SealKey,
  setSealKey: (key: SealKey) => void,
  onComplete: SpinCallback,
): () => void {
  const sequence = buildWheelSequence(targetKey);
  let step = 0;
  let timeoutId: number | null = null;
  let cancelled = false;

  function tick() {
    if (cancelled) return;
    if (step >= sequence.length) {
      onComplete();
      return;
    }
    setSealKey(sequence[step]);
    const remaining = sequence.length - step - 1;
    const delay = delayForStep(remaining);
    step++;
    timeoutId = window.setTimeout(tick, delay);
  }
  tick();

  return () => {
    cancelled = true;
    if (timeoutId !== null) window.clearTimeout(timeoutId);
  };
}
