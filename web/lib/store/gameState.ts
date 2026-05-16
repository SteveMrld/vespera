import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  DayData,
  DayNum,
  GameState,
  JournalEntry,
  Palette,
  RoomKey,
} from "@/lib/types";

const DAY_NUMS: DayNum[] = [1, 2, 3, 4, 5, 6, 7];

function emptyDayData(): DayData {
  return {
    hallEntered: false,
    dinnerReady: false,
    userResponse: null,
    responsesRead: false,
    completed: false,
  };
}

function defaultDaysData(): Record<DayNum, DayData> {
  return DAY_NUMS.reduce(
    (acc, d) => {
      acc[d] = emptyDayData();
      return acc;
    },
    {} as Record<DayNum, DayData>,
  );
}

function defaultVisitedRoomsByDay(): Record<DayNum, RoomKey[]> {
  return DAY_NUMS.reduce(
    (acc, d) => {
      acc[d] = [];
      return acc;
    },
    {} as Record<DayNum, RoomKey[]>,
  );
}

export const INITIAL_GAME_STATE: GameState = {
  currentDay: 1,
  porterId: "marc",
  userSeal: "cheval",
  palette: "night",
  daysData: defaultDaysData(),
  visitedRoomsByDay: defaultVisitedRoomsByDay(),
  journalEntries: [],
  journalUserNotes: {},
  cycleEnded: false,
  tutoStep: 0,
  hasSeenArrival: false,
  onboardingAnswers: {},
};

type GameActions = {
  setCurrentDay: (day: DayNum) => void;
  updateDayData: (day: DayNum, patch: Partial<DayData>) => void;
  markRoomVisited: (day: DayNum, room: RoomKey) => void;
  setPalette: (palette: Palette) => void;
  togglePalette: () => void;
  recordJournalEntry: (entry: Omit<JournalEntry, "ts">) => void;
  saveJournalUserNote: (key: string, value: string) => void;
  markArrivalSeen: () => void;
  setOnboardingAnswer: (field: string, value: string) => void;
  setTutoStep: (step: number) => void;
  endCycle: () => void;
  resetCycle: () => void;
};

export type GameStore = GameState & GameActions;

export const STORAGE_KEY = "vespera.gameState.v1";

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_GAME_STATE,

      setCurrentDay: (day) => set({ currentDay: day }),

      updateDayData: (day, patch) =>
        set((state) => ({
          daysData: {
            ...state.daysData,
            [day]: { ...state.daysData[day], ...patch },
          },
        })),

      markRoomVisited: (day, room) =>
        set((state) => {
          const visited = state.visitedRoomsByDay[day] ?? [];
          if (visited.includes(room)) return {};
          return {
            visitedRoomsByDay: {
              ...state.visitedRoomsByDay,
              [day]: [...visited, room],
            },
          };
        }),

      setPalette: (palette) => set({ palette }),

      togglePalette: () =>
        set((state) => ({
          palette: state.palette === "night" ? "day" : "night",
        })),

      recordJournalEntry: (entry) =>
        set((state) => {
          if (state.journalEntries.some((e) => e.key === entry.key)) {
            return {};
          }
          return {
            journalEntries: [
              ...state.journalEntries,
              { ...entry, ts: Date.now() },
            ],
          };
        }),

      saveJournalUserNote: (key, value) =>
        set((state) => ({
          journalUserNotes: { ...state.journalUserNotes, [key]: value },
        })),

      markArrivalSeen: () => set({ hasSeenArrival: true }),

      setOnboardingAnswer: (field, value) =>
        set((state) => ({
          onboardingAnswers: { ...state.onboardingAnswers, [field]: value },
        })),

      setTutoStep: (step) => set({ tutoStep: step }),

      endCycle: () => set({ cycleEnded: true }),

      resetCycle: () => {
        const { porterId, userSeal } = get();
        set({
          ...INITIAL_GAME_STATE,
          porterId,
          userSeal,
        });
      },
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const {
          setCurrentDay: _a,
          updateDayData: _b,
          markRoomVisited: _c,
          setPalette: _d,
          togglePalette: _e,
          recordJournalEntry: _f,
          saveJournalUserNote: _g,
          markArrivalSeen: _h,
          setOnboardingAnswer: _i,
          setTutoStep: _j,
          endCycle: _k,
          resetCycle: _l,
          ...persisted
        } = state;
        void _a;
        void _b;
        void _c;
        void _d;
        void _e;
        void _f;
        void _g;
        void _h;
        void _i;
        void _j;
        void _k;
        void _l;
        return persisted;
      },
    },
  ),
);
