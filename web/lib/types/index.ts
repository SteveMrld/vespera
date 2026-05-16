export type SealKey =
  | "cerf"
  | "loup"
  | "chouette"
  | "lynx"
  | "corbeau"
  | "cheval";

export type Seal = {
  key: SealKey;
  name: string;
  archetype: string;
  vertue: string;
  img: string;
};

export type GuestId = "marc" | "theo" | "camille" | "ines" | "karim";

export type Guest = {
  id: GuestId;
  name: string;
  seal: SealKey;
  age: number;
  job: string;
  origin: string;
  posture: string;
  appearance: string;
  intro: string;
  isPorter: boolean;
  keyDescription?: string;
};

export type DayNum = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type DayTheme =
  | "IMAGE"
  | "DOUTE"
  | "SILENCE"
  | "MENSONGE"
  | "TRAHISON"
  | "PARDON"
  | "RÉVÉLATION";

export type DayType = "discovery" | "short" | "long" | "revelation";

export type RoomKey = "library" | "pool" | "couloir" | "chambre";

export type RoomLabel = "Bibliothèque" | "Piscine" | "Couloir" | "Chambre";

export type Clue = {
  id: string;
  day: DayNum;
  room: RoomKey;
  title: string;
  body: string;
  observation: string;
};

export type JournalEntry = {
  key: string;
  day: DayNum;
  room: RoomKey;
  roomLabel: RoomLabel;
  title: string;
  body: string;
  observation: string;
  ts: number;
  userNote?: string;
};

export type DayData = {
  hallEntered: boolean;
  dinnerReady: boolean;
  userResponse: string | null;
  responsesRead: boolean;
  completed: boolean;
  introductionsDone?: boolean;
  laboiteCompleted?: boolean;
  laboiteUserScore?: number;
  laboiteNpcScores?: Partial<Record<GuestId, number>>;
  mensongeCompleted?: boolean;
  detailCompleted?: boolean;
  visageCompleted?: boolean;
  accusationDone?: boolean;
  accusedGuestId?: GuestId;
};

export type Palette = "night" | "day";

export type GameState = {
  currentDay: DayNum;
  porterId: GuestId;
  userSeal: SealKey;
  palette: Palette;
  daysData: Record<DayNum, DayData>;
  visitedRoomsByDay: Record<DayNum, RoomKey[]>;
  journalEntries: JournalEntry[];
  journalUserNotes: Record<string, string>;
  cycleEnded: boolean;
  tutoStep: number;
  hasSeenArrival: boolean;
  onboardingAnswers: Record<string, string>;
};

export type StorageAdapter = {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
  removeItem: (key: string) => void | Promise<void>;
};
