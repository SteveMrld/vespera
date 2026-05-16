import type { Guest, GuestId } from "@/lib/types";

export const GUESTS: Record<GuestId, Guest> = {
  marc: {
    id: "marc",
    name: "Marc",
    seal: "cerf",
    age: 47,
    job: "Architecte",
    origin: "Genève",
    posture: "Calme, structuré, voix grave et lente, regards longs.",
    appearance:
      "Grand, mince, cheveux gris-cendre courts, costume sombre sans cravate.",
    intro:
      "Marc. Le Cerf. Architecte. Je construis pour les autres depuis vingt-cinq ans. Je suis venu voir si quelqu'un pouvait construire pour moi pour une fois.",
    isPorter: true,
    keyDescription:
      "Il y a quatorze ans, Marc a quitté sa fiancée Sara six mois avant qu'elle ne meure d'une longue maladie. Il porte ce silence depuis. Personne ne le sait.",
  },
  theo: {
    id: "theo",
    name: "Théo",
    seal: "loup",
    age: 38,
    job: "Journaliste politique",
    origin: "Paris",
    posture:
      "Attentif, regarde les autres, parle quand il a quelque chose à dire, sarcastique.",
    appearance: "Barbe courte, chemise blanche ouverte, jeans noir.",
    intro:
      "Théo. Le Loup. Je suis journaliste. Je pose des questions pour gagner ma vie. Ce soir, je vais essayer de me taire.",
    isPorter: false,
  },
  camille: {
    id: "camille",
    name: "Camille",
    seal: "chouette",
    age: 44,
    job: "Thérapeute",
    origin: "Lyon",
    posture: "Silencieuse, regarde les détails, voix posée, formule peu mais précis.",
    appearance:
      "Cheveux mi-longs châtains, blouse en lin couleur sable, lunettes fines.",
    intro:
      "Camille. La Chouette. Je viens de Lyon. Je vois des gens toute la journée. Ce soir, j'ai envie d'être vue, pas de regarder.",
    isPorter: false,
  },
  ines: {
    id: "ines",
    name: "Inès",
    seal: "lynx",
    age: 41,
    job: "Curatrice de musée",
    origin: "Bruxelles",
    posture: "Élégance, ironie, distance, peut être cassante.",
    appearance:
      "Robe sombre, bijoux fins, maquillage soigné, cheveux courts noirs.",
    intro:
      "Inès. Le Lynx. Je travaille avec ce que les autres trouvent beau. Ça finit par déformer la vue.",
    isPorter: false,
  },
  karim: {
    id: "karim",
    name: "Karim",
    seal: "corbeau",
    age: 49,
    job: "Neurochirurgien",
    origin: "Marseille",
    posture:
      "Observateur scientifique, plus chaleureux qu'il en a l'air, peut être brusque.",
    appearance: "Barbe naissante, chemise grise, manches roulées.",
    intro:
      "Karim. Le Corbeau. Je suis chirurgien. Quand vous m'aurez vu opérer, vous saurez que je ne crois pas à grand-chose. Mais je suis venu quand même.",
    isPorter: false,
  },
};

export const GUEST_ORDER: GuestId[] = [
  "marc",
  "theo",
  "camille",
  "ines",
  "karim",
];

export const INTRODUCTION_ORDER: GuestId[] = [
  "camille",
  "theo",
  "ines",
  "karim",
  "marc",
];

export function getGuest(id: GuestId): Guest {
  return GUESTS[id];
}

export function getPorter(): Guest {
  const porter = Object.values(GUESTS).find((g) => g.isPorter);
  if (!porter) {
    throw new Error("No Porter defined in Season 1 guests");
  }
  return porter;
}

export function ensurePorterIsMarc(): void {
  const porter = getPorter();
  if (porter.id !== "marc") {
    throw new Error(
      `Season 1 Porter must be Marc (Le Cerf). Got: ${porter.id}`,
    );
  }
}
