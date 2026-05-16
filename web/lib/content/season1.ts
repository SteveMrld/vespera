import type {
  Clue,
  DayNum,
  DayTheme,
  DayType,
  GuestId,
  RoomKey,
  RoomLabel,
} from "@/lib/types";

export const DAY_THEMES: Record<DayNum, DayTheme> = {
  1: "IMAGE",
  2: "DOUTE",
  3: "SILENCE",
  4: "MENSONGE",
  5: "TRAHISON",
  6: "PARDON",
  7: "RÉVÉLATION",
};

export const DAY_TYPES: Record<DayNum, DayType> = {
  1: "discovery",
  2: "short",
  3: "long",
  4: "short",
  5: "long",
  6: "short",
  7: "revelation",
};

export const SHORT_DAY_ROOM: Record<2 | 4 | 6, RoomKey> = {
  2: "library",
  4: "pool",
  6: "chambre",
};

export const ROOM_LABELS: Record<RoomKey, RoomLabel> = {
  library: "Bibliothèque",
  pool: "Piscine",
  couloir: "Couloir",
  chambre: "Chambre",
};

export const DAILY_ROOM_ORDER: RoomKey[] = [
  "library",
  "pool",
  "couloir",
  "chambre",
];

export const MURMURS: Record<DayNum, string | null> = {
  1: null,
  2: `Le doute est ce qui reste quand l'image se fissure.
Ce que vous avez vu hier, vous le regarderez deux fois aujourd'hui.`,
  3: `Tout le monde se tait parfois. Ce qui change, c'est ce que vous écoutez pendant ce temps-là.
Aujourd'hui, vous avez toutes les pièces ouvertes. Prenez le temps.`,
  4: `Le mensonge n'est pas le contraire de la vérité. C'est ce qu'on dit quand la vérité serait insupportable.
Quelqu'un mentira ce soir. Peut-être vous.`,
  5: `Trahir, c'est aussi se trahir soi-même.
Le cinquième soir, certains ont déjà commencé à le faire sans s'en apercevoir.`,
  6: `Le pardon n'est pas pour celui qui a fauté. C'est pour celui qui pardonne.
Demain est le dernier jour. Aujourd'hui, vous pouvez encore choisir ce que vous emportez.`,
  7: `Le septième soir est différent.
Vous savez ce que vous avez vu. Vous savez ce que vous avez ressenti.
Maintenant, il faut nommer.`,
};

export const WELCOME_J1_CHAMBER = `Bienvenue dans le Cycle.
Sept soirées. Cinq inconnus. Une vérité.
Vous repartirez avec quelque chose. Pas forcément ce que vous attendiez.
V.`;

function clue(
  day: DayNum,
  room: RoomKey,
  id: string,
  title: string,
  body: string,
  observation: string,
): Clue {
  return { id, day, room, title, body, observation };
}

export const CLUES: Clue[] = [
  clue(
    1,
    "library",
    "livre",
    "Le livre",
    `Posé en évidence sur le bureau, comme si quelqu'un voulait qu'on le voie. La couverture est neuve, mais quelques pages ont été cornées. Titre : "L'art de paraître intact".`,
    "Quelqu'un a souligné le mot paraître au crayon.",
  ),
  clue(
    1,
    "library",
    "marque-page",
    "Le marque-page",
    `Une photo d'identité fanée, glissée entre les pages du livre. Coupée aux ciseaux : on n'en voit qu'un sourcil, une mèche de cheveux. Le reste a été retiré au ciseau, en un seul trait.`,
    "Une photo qu'on garde mais qu'on ne veut pas voir en entier.",
  ),
  clue(
    1,
    "library",
    "crayon",
    "Le crayon",
    `Posé en travers du livre. Gras, court, taillé au couteau et non au taille-crayon. Pas un objet de la villa.`,
    "Quelqu'un qui taille ses crayons lui-même. Un geste qui se perd.",
  ),
  clue(
    1,
    "pool",
    "verre",
    "Le verre",
    `Un verre vide posé sur le rebord en pierre. Whisky, à l'odeur. Il reste un quart de glaçon qui n'a pas encore fini de fondre. L'empreinte d'une bouche sur le bord, mais pas de rouge à lèvres.`,
    "Quelqu'un est venu seul, tard, et n'a pas mis longtemps à finir son verre.",
  ),
  clue(
    1,
    "pool",
    "transat",
    "Le transat déplacé",
    `Le transat du fond a été tiré vers la piscine. Pas pour s'y allonger. Pour s'y asseoir, face à l'eau. Le coussin garde une marque. Quelqu'un est resté assis là un long moment.`,
    "Pas pour nager. Pour regarder.",
  ),
  clue(
    1,
    "pool",
    "cigarette",
    "La cigarette",
    `Posée sur le rebord, à demi consumée. Marque rouge légère sur le filtre. Pas une cigarette qu'on fume jusqu'au bout. Une cigarette qu'on allume et qu'on oublie.`,
    "Quelqu'un qui ne fume plus, mais qui en avait besoin ce soir.",
  ),
  clue(
    1,
    "couloir",
    "fenetre",
    "La fenêtre",
    `La fenêtre nord, au bout du couloir. Elle donne sur le jardin et la piscine éclairée. Quelqu'un est venu s'y tenir cette nuit, longuement. Sur le rebord intérieur, une marque tiède dans la condensation. La forme d'une main posée à plat. Doigts longs.`,
    "Quelqu'un qui regarde dehors comme on cherche quelque chose qu'on a perdu là-bas.",
  ),
  clue(
    1,
    "couloir",
    "tapis",
    "Le tapis",
    `Le runner du couloir garde la trace des pas de cette nuit. Lents, mesurés. Quelqu'un qui ne voulait pas réveiller. Les pas vont de la chambre du fond jusqu'à la fenêtre, puis font le chemin inverse. Pas de détour.`,
    "Pas pour aller quelque part. Pour venir ici, et puis repartir.",
  ),
  clue(
    1,
    "couloir",
    "porte-fond",
    "La porte du fond",
    `Au bout du couloir, à droite, une porte mal refermée. La pièce derrière est éclairée d'une lumière chaude. V l'a laissée allumée. Personne dedans à cette heure. Mais sur le fauteuil, un livre fermé, une couverture en désordre, comme si quelqu'un venait à peine de partir.`,
    "Quelqu'un dort mal cette nuit, et n'a pas voulu rester dans sa chambre.",
  ),
  clue(
    2,
    "library",
    "mouchoir",
    "Le mouchoir oublié",
    `Un mouchoir blanc, en lin. Soigneusement plié, posé sur l'accoudoir comme si on l'avait laissé là exprès. Une initiale brodée : "S".`,
    "Un mouchoir qu'on garde même quand on n'en a plus l'usage.",
  ),
  clue(
    3,
    "library",
    "lettres-a-celle",
    "Lettres à celle qui ne lira pas",
    `Un nouveau livre est apparu sur le bureau. Un recueil épistolaire intitulé "Lettres à celle qui ne lira pas". Une page est cornée à la lettre VII.`,
    "Quelqu'un lit ce que personne d'autre ne lit.",
  ),
  clue(
    3,
    "pool",
    "transats-alignes",
    "Les transats alignés",
    `Les transats sont tous alignés ce soir, sauf un, légèrement décalé. Comme si quelqu'un l'avait remis presque à sa place, mais pas tout à fait.`,
    "On regarde l'eau seul ici, mais on ne se cache pas.",
  ),
  clue(
    3,
    "couloir",
    "condensation-essuyee",
    "La condensation essuyée",
    `Sur la fenêtre nord, plus de marque de main. Mais la condensation a été essuyée d'un trait, large, comme passé du dos de la main.`,
    "On efface ce qu'on a laissé.",
  ),
  clue(
    3,
    "chambre",
    "enveloppe-j3",
    "L'enveloppe sur le bureau",
    `Sur le bureau de votre chambre, une enveloppe. À l'intérieur, un mot. Le troisième soir, certains se taisent parce qu'ils n'ont rien à dire. D'autres se taisent parce qu'ils ont trop à dire. Vous, lequel êtes-vous ? V.`,
    "V. écrit ce qu'elle ne dit pas à voix haute.",
  ),
  clue(
    4,
    "pool",
    "serviette",
    "La serviette enroulée",
    `Une serviette grise, enroulée autour de quelque chose. À l'intérieur : une photo encadrée, vitre cassée. La photo est trop mouillée pour qu'on voie clairement, mais on devine un visage de femme, des années 90. Sur le cadre, une initiale gravée : "S".`,
    "Quelqu'un est venu noyer ce qu'il ne voulait plus garder. Mais l'a remonté quand même.",
  ),
  clue(
    5,
    "library",
    "lettres-soulignee",
    "Une phrase soulignée",
    `Le livre "Lettres à celle qui ne lira pas" est ouvert sur le bureau. Une phrase est soulignée d'un trait fin : "Je suis parti parce que je n'ai pas su rester."`,
    "Quelqu'un revient à un livre pour y poser un mot précis.",
  ),
  clue(
    5,
    "pool",
    "photo-ramassee",
    "La trace effacée",
    `La photo trempée du J4 a été ramassée. La serviette a disparu. Sur la pierre, plus rien. Seul le souvenir d'avoir vu quelque chose qui n'est plus là.`,
    "Ce qu'on a essayé de noyer, on a fini par le reprendre.",
  ),
  clue(
    5,
    "couloir",
    "porte-ouverte",
    "La porte du fond",
    `La porte du fond est complètement ouverte cette nuit. La lumière à l'intérieur est éteinte. La pièce est nue, parfaitement rangée. Comme si personne n'y dormait plus.`,
    "Quelqu'un a quitté cette pièce sans la fermer derrière lui.",
  ),
  clue(
    5,
    "chambre",
    "enveloppe-j5",
    "Le mot du cinquième soir",
    `Sur votre bureau, un nouveau mot de V. Quelqu'un est revenu sur ses pas cette nuit. Pour reprendre. Ou pour tenter de cacher. V.`,
    "V. ne désigne personne. Mais elle ne parle pas pour rien.",
  ),
  clue(
    6,
    "chambre",
    "lettre-pardon",
    "La lettre ouverte",
    `Une lettre écrite à la main, posée sur le bureau de la chambre du fond. L'écriture est petite, serrée, ralentie par l'âge ou l'émotion. Elle est adressée à "S.". Elle n'est pas signée. Elle commence par : "Je n'ai pas su rester. Je n'avais pas le courage de te voir t'éteindre. Je voudrais que tu saches que c'est ça, et pas autre chose, qui m'a fait partir."`,
    "Quelqu'un écrit ce soir à quelqu'un qui ne pourra pas lire. C'est la forme la plus pure du pardon : se le donner à soi.",
  ),
];

export function getCluesForDay(day: DayNum): Clue[] {
  return CLUES.filter((c) => c.day === day);
}

export function getCluesForDayAndRoom(day: DayNum, room: RoomKey): Clue[] {
  return CLUES.filter((c) => c.day === day && c.room === room);
}

export function clueKey(c: Clue): string {
  return `${c.day}-${c.room}-${c.id}`;
}

export type DayQuestion = {
  prompt: string;
  responses: Record<GuestId, string>;
};

export const QUESTIONS: Record<DayNum, DayQuestion | null> = {
  1: {
    prompt: "Qu'est-ce que vous êtes venu chercher ici ?",
    responses: {
      marc: "À me déposer. Je porte des choses depuis trop longtemps. Je voulais voir si la villa pouvait en tenir une partie pour moi.",
      theo: "Du silence. Mon travail est plein de bruit. Je voulais essayer le vide pendant une semaine.",
      camille:
        "Une faille en moi. J'écoute celles des autres depuis trop longtemps. Je commence à perdre la mienne.",
      ines: "Un test. Sur moi-même. Voir si je peux rester avec des inconnus sans construire une scène autour.",
      karim:
        "Une distance d'avec l'hôpital. Quand on opère le cerveau, on finit par croire qu'on l'a compris. Je voulais me retrouver bête une semaine.",
    },
  },
  2: null,
  3: {
    prompt: "À quoi vous taisez-vous le plus souvent ?",
    responses: {
      marc: "À une chose que j'ai faite il y a longtemps. Je n'en parle pas parce que je n'ai pas trouvé comment.",
      theo: "À ce que je pense vraiment des gens que j'aime. Mon travail m'a appris à formuler. À la maison, je n'y arrive plus.",
      camille:
        "À ma propre fatigue. Quand on écoute des fatigues toute la journée, dire la sienne paraît indécent.",
      ines: "À l'ennui. Je devrais me passionner pour ce que je montre. La plupart du temps, je trouve ça vide. Je ne le dis pas.",
      karim:
        "À la peur. Quand on ouvre un crâne, on n'a pas le droit d'avoir peur. À la longue on oublie de dire qu'on a peur ailleurs aussi.",
    },
  },
  4: null,
  5: {
    prompt: "Qui avez-vous trahi, et qui vous a trahi ?",
    responses: {
      marc: "J'ai trahi quelqu'un qui m'aimait, il y a longtemps. Je suis parti au moment où il fallait que je reste. Personne ne m'a trahi en retour. Je ne l'aurais pas mérité.",
      theo: "J'ai trahi une source qui me faisait confiance. Une seule fois. Elle s'en est sortie, je m'en suis sorti. Mais je ne me regarde pas pareil depuis.",
      camille:
        "Je n'ai pas trahi de personne en particulier. J'ai trahi des principes. C'est plus solitaire comme trahison, parce que personne ne vient vous demander des comptes.",
      ines: "Plein de gens, plein de fois, sans vraiment m'en apercevoir. La trahison fait partie de mon métier, j'ai fini par croire que ça en faisait partie de moi.",
      karim:
        "J'ai trahi un patient. Pas par négligence. Par lassitude. Je l'ai opéré comme un autre alors que c'était quelqu'un que je connaissais. Il est mort. Je n'ai pas dit que je le connaissais à la famille.",
    },
  },
  6: null,
  7: null,
};

export type Verdict = {
  correct: string;
  wrong: (accusedName: string, accusedSealName: string) => string;
};

export const VERDICT: Verdict = {
  correct: `VOUS L'AVEZ NOMMÉ.

Vous avez vu juste. C'était Marc. Le Cerf.

Sa Clé : il y a quatorze ans, il a quitté Sara, sa fiancée, six mois avant qu'elle ne meure d'une longue maladie. Il porte ce silence depuis. Personne ne le savait.

Ce qu'il a porté seul pendant quatorze ans cesse de peser seul, ce soir.

V.`,
  wrong: (accusedName, accusedSealName) =>
    `L'ACCUSATION.

Vous avez nommé ${accusedName}. ${accusedSealName}.

Ce n'était pas lui.

Le Porteur, c'était Marc. Le Cerf.

Il y a quatorze ans, il a quitté Sara, sa fiancée, six mois avant qu'elle ne meure d'une longue maladie. Il porte ce silence depuis.

Il repartira avec ce qu'il a apporté. Vous, vous repartirez avec une vérité qui n'était pas la sienne. Un autre Cycle, peut-être, vous redonnera l'occasion de voir.

V.`,
};
