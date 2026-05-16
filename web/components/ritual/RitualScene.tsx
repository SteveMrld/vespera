"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PLAYER_SEAL, SEALS } from "@/lib/content/seals";
import type { SealKey } from "@/lib/types";
import { preloadAllSeals, spinSealWheel } from "./SealWheel";
import styles from "@/app/ritual/ritual.module.css";

type Phase = {
  intro: boolean;
  label: boolean;
  medallion: boolean;
  locked: boolean;
  name: boolean;
  rule: boolean;
  vertu: boolean;
  vsig: boolean;
  btn: boolean;
};

const HIDDEN: Phase = {
  intro: false,
  label: false,
  medallion: false,
  locked: false,
  name: false,
  rule: false,
  vertu: false,
  vsig: false,
  btn: false,
};

function vibrate(pattern: number | number[]): void {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(pattern);
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function RitualScene() {
  const userSealKey: SealKey = PLAYER_SEAL;
  const seal = SEALS[userSealKey];

  const [phase, setPhase] = useState<Phase>(HIDDEN);
  const [wheelSeal, setWheelSeal] = useState<SealKey | null>(null);
  const [exiting, setExiting] = useState(false);
  const [runId, setRunId] = useState(0);

  // refs pour cleanup et éviter les race conditions entre runs
  const timeoutsRef = useRef<number[]>([]);
  const cancelSpinRef = useRef<(() => void) | null>(null);

  const scheduleAll = useCallback((tasks: { at: number; run: () => void }[]) => {
    tasks.forEach(({ at, run }) => {
      const id = window.setTimeout(run, at);
      timeoutsRef.current.push(id);
    });
  }, []);

  const clearAllScheduled = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
    if (cancelSpinRef.current) {
      cancelSpinRef.current();
      cancelSpinRef.current = null;
    }
  }, []);

  useEffect(() => {
    setPhase(HIDDEN);
    setWheelSeal(null);
    setExiting(false);
    clearAllScheduled();

    const reduced = prefersReducedMotion();

    if (reduced) {
      // Variante simplifiée : médaillon directement sur le bon Sceau,
      // tout apparaît en cascade rapide ~2.5s au lieu de ~13s.
      setWheelSeal(userSealKey);
      scheduleAll([
        { at: 100, run: () => setPhase((p) => ({ ...p, intro: true })) },
        { at: 400, run: () => setPhase((p) => ({ ...p, label: true })) },
        { at: 700, run: () => setPhase((p) => ({ ...p, medallion: true, locked: true })) },
        { at: 1000, run: () => setPhase((p) => ({ ...p, name: true })) },
        { at: 1300, run: () => setPhase((p) => ({ ...p, rule: true })) },
        { at: 1600, run: () => setPhase((p) => ({ ...p, vertu: true })) },
        { at: 1900, run: () => setPhase((p) => ({ ...p, vsig: true })) },
        { at: 2200, run: () => setPhase((p) => ({ ...p, btn: true })) },
      ]);
      return clearAllScheduled;
    }

    // === SÉQUENCE V37 FIDÈLE ===
    scheduleAll([
      { at: 600, run: () => setPhase((p) => ({ ...p, intro: true })) },
      { at: 2600, run: () => setPhase((p) => ({ ...p, label: true })) },
      { at: 3600, run: () => setPhase((p) => ({ ...p, medallion: true })) },
      {
        at: 4600,
        run: () => {
          preloadAllSeals(() => {
            cancelSpinRef.current = spinSealWheel(
              userSealKey,
              (key) => setWheelSeal(key),
              () => {
                // La roue s'est arrêtée. Lock-in + vibration.
                vibrate([20, 30, 50]);
                setPhase((p) => ({ ...p, locked: true }));

                scheduleAll([
                  { at: 500, run: () => setPhase((p) => ({ ...p, name: true })) },
                  { at: 1200, run: () => setPhase((p) => ({ ...p, rule: true })) },
                  { at: 2400, run: () => setPhase((p) => ({ ...p, vertu: true })) },
                  { at: 3600, run: () => setPhase((p) => ({ ...p, vsig: true })) },
                  {
                    at: 4500,
                    run: () => {
                      setPhase((p) => ({ ...p, btn: true }));
                      vibrate([20, 30, 30]);
                    },
                  },
                ]);
              },
            );
          });
        },
      },
    ]);

    return clearAllScheduled;
  }, [runId, userSealKey, scheduleAll, clearAllScheduled]);

  const handleAccept = useCallback(() => {
    vibrate([30, 50, 30, 50, 100]);
    setExiting(true);
    // Pour cette session : on relance le rituel après le fade-out
    // pour pouvoir l'observer en boucle et ajuster.
    window.setTimeout(() => {
      setRunId((n) => n + 1);
    }, 700);
    // eslint-disable-next-line no-console
    console.log("[ritual] sceau accepté :", seal.name);
  }, [seal.name]);

  return (
    <div className={styles.scene}>
      <div className={`${styles.stage} ${exiting ? styles.stageExiting : ""}`}>
        <div className={styles.typo}>
          <p className={`${styles.line} ${styles.intro} ${phase.intro ? styles.lineVisible : ""}`.trim()}>
            Vespera vous reconnaît.
          </p>

          <p className={`${styles.line} ${styles.label} ${phase.label ? styles.lineVisible : ""}`.trim()}>
            Votre Sceau pour ce Cycle
          </p>

          <div
            className={`${styles.medallionContainer} ${phase.medallion ? styles.medallionContainerVisible : ""}`.trim()}
          >
            <div className={styles.halo} aria-hidden="true" />
            <div
              className={`${styles.medallion} ${phase.locked ? styles.medallionLocked : ""}`.trim()}
            >
              <div className={styles.medallionInner}>
                {wheelSeal && (
                  <img
                    src={SEALS[wheelSeal].img}
                    alt=""
                    draggable={false}
                  />
                )}
              </div>
            </div>
          </div>

          <p className={`${styles.line} ${styles.name} ${phase.name ? styles.lineVisible : ""}`.trim()}>
            {seal.name}
          </p>

          <div
            className={`${styles.rule} ${phase.rule ? styles.ruleVisible : ""}`.trim()}
            aria-hidden="true"
          />

          <p className={`${styles.line} ${styles.vertu} ${phase.vertu ? styles.lineVisible : ""}`.trim()}>
            {seal.vertue}
          </p>

          <p className={`${styles.line} ${styles.vsig} ${phase.vsig ? styles.lineVisible : ""}`.trim()}>
            V.
          </p>

          <button
            type="button"
            className={`${styles.btn} ${phase.btn ? styles.btnVisible : ""}`.trim()}
            onClick={handleAccept}
          >
            ACCEPTER CE SCEAU →
          </button>
        </div>
      </div>
    </div>
  );
}
