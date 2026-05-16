# VESPERA — ARCHITECTURE CIBLE

## Pourquoi un refactor

Le code actuel est un mono-fichier HTML de plus de 8000 lignes (HTML + CSS + JS inline). Pour un POC c'est acceptable. Pour un produit qu'on veut amener au niveau "Saltburn / White Lotus", c'est intenable :

- Pas de séparation de responsabilités
- Aucune typescript / aucun typage
- Aucun test
- Aucune réutilisation de composants
- Difficile d'ajouter le multijoueur sans tout casser
- Pas de hot reload propre
- Pas de gestion d'assets pro (images, audio)

## Stack recommandée

### Front

**Next.js 14+ avec App Router + TypeScript**.

Pourquoi :
- React rend les composants narratifs (cartes d'invités, modals, transitions) faciles à composer
- App Router pour le routing déclaratif (chaque scène = une route)
- TypeScript pour fiabiliser les types des `gameState`, des `Guest`, des `Clue`, etc.
- Server Components pour servir le contenu narratif (les textes, les images optimisées) depuis le serveur
- Image optimization via `next/image` (critique : la villa = des photos)
- Déploiement Vercel direct depuis Git
- Support natif des fonts via `next/font` (Fraunces + Inter)

Alternative valable : **Astro + React Islands**. Avantage : encore plus léger, encore plus rapide sur mobile. Inconvénient : moins de retours d'expérience pour une app interactive complexe.

### Styling

**Tailwind CSS + CSS variables**.

- Tailwind pour la vitesse de développement
- CSS variables pour la palette (`--gold`, `--cream`, `--obsidian`, etc.) pour pouvoir basculer jour/nuit via une simple classe sur `<body>`
- Pas de CSS-in-JS lourd (styled-components, emotion). Reste léger.

### Animations

**Framer Motion**. Standard de fait pour les animations React, parfait pour les transitions de scène, les fades, les entrées séquentielles.

Pour les effets typo (cascade de texte, machine à écrire) : composant custom utilisant Framer Motion.

### State management

**Zustand** pour le state global du jeu (le `gameState` actuel).

Pourquoi Zustand :
- Léger (3KB)
- Pas de provider à wrapper
- Type-safe en TypeScript
- Persistance built-in (`zustand/middleware/persist`) avec stockage configurable (localStorage en Phase 1, distant en Phase 2)

### Sauvegarde

**Phase 1** : Zustand persist + localStorage.

**Phase 2** : Supabase (PostgreSQL + Auth + Realtime).

Supabase > Firebase parce que :
- SQL est plus fiable pour le modèle de données Vespera (relations entre Cycle, Joueur, Soirée, Réponse, Score)
- Auth simple (email magic link, Google)
- Realtime pour la fenêtre 20h-23h (les réponses des amis apparaissent en live)
- Tarification gratuite généreuse au démarrage
- Open source, possibilité de self-host si besoin

### Backend pour Phase 2

Si Supabase suffit (CRUD + auth + realtime), pas besoin de backend custom.
Si logique complexe (fenêtre temporelle stricte 20h-23h, anti-triche), ajouter **API Routes Next.js** ou **Supabase Edge Functions**.

### Médias

- **Images** : stockées en local dans `/public/villa/` pour Phase 1, ou bucket Supabase Storage pour Phase 2. Optimisées via `next/image` avec lazy loading.
- **Audio** (si ajouté plus tard) : `<audio>` HTML5 avec controls programmatiques. Une nappe d'ambiance discrète au Hall, un son de transition entre les jours. Voir [Howler.js](https://howlerjs.com/) si besoin de précision.

### Tests

- **Vitest** pour les unit tests (logique de scoring, simulations PNJ, transitions de jour)
- **Playwright** pour les end-to-end (parcourir un Cycle complet du J1 au J7)

Tests prioritaires :
1. `ensurePorterIsMarc()` doit toujours retourner Marc en Phase 1
2. Le scoring de La Boîte doit suivre la formule +1/-1 plafonnée
3. Les transitions de jour respectent l'alternance court/long
4. Le journal enregistre sans doublon

## Structure de fichiers proposée

```
vespera/
├─ app/
│  ├─ layout.tsx                    # Root layout, fonts, providers
│  ├─ page.tsx                      # Arrival video + ENTRER
│  ├─ onboarding/
│  │  ├─ page.tsx                   # 8 questions tappables
│  │  └─ seuil/page.tsx             # 3 messages de V.
│  ├─ rituel/page.tsx               # Attribution du Sceau (typo + roue + médaillon)
│  ├─ tutorial/page.tsx             # 5 cartes d'explication du jeu
│  ├─ hall/page.tsx                 # Hub principal de la journée
│  ├─ room/
│  │  ├─ library/page.tsx
│  │  ├─ pool/page.tsx
│  │  ├─ couloir/page.tsx
│  │  └─ chambre/page.tsx
│  ├─ salon/page.tsx                # Salle à manger (la table)
│  ├─ epreuve/
│  │  ├─ boite/page.tsx             # J1 - La Boîte
│  │  ├─ mensonge/page.tsx          # J2 - Le Mensonge
│  │  ├─ detail/page.tsx            # J4 - Le Détail
│  │  └─ visage/page.tsx            # J6 - Le Visage
│  └─ verdict/page.tsx              # J7 - Verdict final
│
├─ components/
│  ├─ ui/                           # Boutons, cartes, modals, cartouches
│  ├─ scene/                        # Composants de scène (Hall, Salon, Room)
│  ├─ ritual/                       # Composants du rituel (WheelOfSeals, Medallion)
│  ├─ narrative/                    # Composants narratifs (V Cartouche, Voice Card, Murmur)
│  └─ epreuve/                      # Composants spécifiques aux épreuves
│
├─ lib/
│  ├─ store/
│  │  └─ gameState.ts               # Zustand store
│  ├─ content/
│  │  ├─ season1.ts                 # Pilote narratif S1 (textes, présentations, voix)
│  │  ├─ seals.ts                   # Les 6 Sceaux + leurs vertus
│  │  └─ guests.ts                  # Les 5 invités + leurs Clés
│  ├─ mechanics/
│  │  ├─ daySchedule.ts             # Alternance court/long
│  │  ├─ journalAuto.ts             # Enregistrement auto des indices
│  │  ├─ scoringBoite.ts            # Scoring La Boîte
│  │  ├─ scoringMensonge.ts         # Scoring Le Mensonge
│  │  └─ npcSimulation.ts           # Scores simulés des PNJ
│  └─ utils/
│     ├─ formatting.ts              # Helpers texte
│     └─ persistence.ts             # Save/load
│
├─ public/
│  ├─ villa/                        # Photos de la villa (8 actuelles)
│  ├─ seals/                        # Médaillons des 6 Sceaux
│  ├─ objects/                      # 30 illustrations de La Boîte
│  ├─ faces/                        # 5 portraits du Visage J6
│  ├─ details/                      # Paires d'images du Détail J4
│  └─ arrival.mp4                   # Vidéo d'arrivée
│
├─ styles/
│  └─ globals.css                   # Variables CSS, palette, font-variation-settings
│
├─ tests/
│  ├─ unit/
│  └─ e2e/
│
└─ docs/                            # Le présent dossier de passation
   ├─ README.md
   ├─ PITCH_PRODUIT.md
   ├─ PILOTE_NARRATIF_S1.md
   ├─ REGLES_DE_STYLE.md
   ├─ MECANIQUES_DE_JEU.md
   ├─ ARCHITECTURE_CIBLE.md
   ├─ ETAT_ACTUEL_ET_BUGS.md
   └─ BRIEF_POUR_CLAUDE_CODE.md
```

## Types TypeScript essentiels

```typescript
type SealKey = 'cerf' | 'loup' | 'chouette' | 'lynx' | 'corbeau' | 'cheval';

type Seal = {
  key: SealKey;
  name: string;        // "Le Cerf", "La Chouette"...
  archetype: string;   // "Mémoire des lieux"
  vertue: string;      // "Tenir sans céder"
  img: string;         // chemin vers le médaillon
};

type GuestId = 'marc' | 'theo' | 'camille' | 'ines' | 'karim';

type Guest = {
  id: GuestId;
  name: string;
  seal: SealKey;
  age: number;
  job: string;
  origin: string;
  intro: string;       // texte de présentation J1
  isPorter: boolean;
};

type DayNum = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type DayTheme = 'IMAGE' | 'DOUTE' | 'SILENCE' | 'MENSONGE' | 'TRAHISON' | 'PARDON' | 'RÉVÉLATION';

type DayType = 'discovery' | 'short' | 'long' | 'revelation';

type RoomKey = 'library' | 'pool' | 'couloir' | 'chambre';

type Clue = {
  id: string;
  day: DayNum;
  room: RoomKey;
  title: string;
  body: string;
  observation: string;
};

type JournalEntry = {
  key: string;          // `${day}-${room}-${id}`
  day: DayNum;
  room: RoomKey;
  roomLabel: string;
  title: string;
  body: string;
  observation: string;
  ts: number;
  userNote?: string;
};

type DayData = {
  hallEntered: boolean;
  dinnerReady: boolean;
  userResponse: string | null;
  responsesRead: boolean;
  completed: boolean;
  introductionsDone?: boolean;        // J1 only
  laboiteCompleted?: boolean;         // J1 only
  laboiteUserScore?: number;
  laboiteNpcScores?: Record<GuestId, number>;
  accusationDone?: boolean;           // J7 only
  accusedGuestId?: GuestId;
};

type GameState = {
  currentDay: DayNum;
  porterId: GuestId;                  // 'marc' en Phase 1
  userSeal: SealKey;                  // 'cheval' en Phase 1
  daysData: Record<DayNum, DayData>;
  visitedRoomsByDay: Record<DayNum, RoomKey[]>;
  journalEntries: JournalEntry[];
  journalUserNotes: Record<string, string>;
  cycleEnded: boolean;
  tutoStep: number;
};
```

## Considérations Phase 2 (multijoueur)

### Schéma DB Supabase (esquisse)

```sql
users (id, email, name, created_at)

cycles (
  id, created_by_user_id, started_at, season_number,
  status: 'active' | 'completed' | 'abandoned'
)

cycle_players (
  cycle_id, user_id, seal_key, is_porter
)

day_responses (
  cycle_id, day_num, user_id, response_text,
  submitted_at
)

epreuve_scores (
  cycle_id, day_num, epreuve_type, user_id, score
)

journal_entries (
  cycle_id, user_id, day_num, room, clue_id,
  user_note, recorded_at
)

day_windows (
  cycle_id, day_num,
  opens_at, closes_at, advances_at
)
```

### Fenêtre temporelle 20h-23h

Côté serveur, table `day_windows` qui définit pour chaque cycle/jour les timestamps `opens_at` (20h locale du créateur) et `closes_at` (23h locale). Les réponses ne sont visibles qu'à partir de `opens_at`. Le jour avance automatiquement à `advances_at` via un cron job ou Supabase scheduled function.

### Notifications

Push notifications via Web Push API ou via un service comme OneSignal. Trois notifs par jour minimum :
- 19h45 : "La soirée commence dans 15 minutes."
- 22h45 : "Plus que 15 minutes."
- Lendemain matin : "Nouveau jour. Le thème : DOUTE."

## Performance et accessibilité

- Mobile-first absolu. Les tests primaires se font sur iPhone et Android moyen de gamme.
- Lighthouse score visé : 90+ sur Performance, 95+ sur Accessibility, 100 sur SEO.
- Toutes les interactions doivent passer le test du tap (zones cliquables ≥ 44×44px).
- Contraste textes vs fond doit respecter WCAG AA minimum (4.5:1).
- Pour les utilisateurs avec `prefers-reduced-motion`, désactiver les animations de fond et de transition.
