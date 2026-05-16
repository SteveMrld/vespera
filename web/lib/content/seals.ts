import type { Seal, SealKey } from "@/lib/types";

export const SEALS: Record<SealKey, Seal> = {
  cerf: {
    key: "cerf",
    name: "Le Cerf",
    archetype: "Mémoire des lieux. Force calme.",
    vertue: "Posture droite, force calme. Vous portez sans vous plaindre.",
    img: "/seals/seal-cerf.png",
  },
  loup: {
    key: "loup",
    name: "Le Loup",
    archetype: "Instinct, méfiance, observation.",
    vertue: "Solitaire et fidèle. Vous tenez ce que vous avez choisi.",
    img: "/seals/seal-loup.png",
  },
  chouette: {
    key: "chouette",
    name: "La Chouette",
    archetype: "Sagesse, jugement, distance.",
    vertue: "Sagesse silencieuse. Vous écoutez plus que vous ne parlez.",
    img: "/seals/seal-chouette.png",
  },
  lynx: {
    key: "lynx",
    name: "Le Lynx",
    archetype: "Précision, beauté froide, esthétique.",
    vertue: "Précision féline. Vous voyez les détails qui trahissent.",
    img: "/seals/seal-lynx.png",
  },
  corbeau: {
    key: "corbeau",
    name: "Le Corbeau",
    archetype: "Intelligence, mystère, dualité.",
    vertue: "Mémoire longue, intelligence vive. Vous gardez ce qui se dit.",
    img: "/seals/seal-corbeau.png",
  },
  cheval: {
    key: "cheval",
    name: "Le Cheval",
    archetype: "Mouvement, fuite ou poursuite.",
    vertue: "Liberté ancienne. Vous traversez sans vous attacher.",
    img: "/seals/seal-cheval.png",
  },
};

export const SEAL_ORDER: SealKey[] = [
  "cerf",
  "loup",
  "chouette",
  "lynx",
  "corbeau",
  "cheval",
];

export const PLAYER_SEAL: SealKey = "cheval";

export function getSeal(key: SealKey): Seal {
  return SEALS[key];
}
