# VESPERA — Prochaine étape

État au 2026-05-16, fin de l'Étape 1 (Fondations).

## Où on en est

Étape 1 terminée et poussée sur la branche `step-1-foundations`. **Pas encore mergée sur `main`** : Steve veut valider visuellement avant.

L'infra Next.js 16 + React 19 + TypeScript strict + Tailwind v4 + Zustand + Framer Motion est en place dans `web/`. Les fonts, la palette et les règles de style globales sont câblées. Le contenu narratif S1 est entièrement extrait du pilote validé et typé dans `web/lib/content/`. Le store Zustand est prêt avec persistance localStorage abstraite (Phase 2 ready, on pourra brancher Supabase sans toucher au code de jeu).

Le legacy `index.html` (8252 lignes) reste à la racine, intact. La branche `legacy-v51` est figée sur GitHub.

## Ce que j'attends de toi avant de reprendre

### 1. Validation visuelle sur localhost

Relancer le dev server :

```
cd web
npm run dev
```

Puis ouvrir `http://localhost:3000`. La page d'accueil affiche :

- "VESPERA" en label sobre (Inter, tracking large, amber-grey)
- "Sept soirées. / Cinq inconnus. / Une vérité." en Fraunces sur fond obsidian
- Signature "V." en bas

À valider à l'œil :

- Le rendu Fraunces te paraît juste (pas de variante Display qui se déclenche, pas de contraste excessif sur le serif)
- La palette nuit te plaît : `#0A0E18` obsidian de fond, `#EDE8DD` cream pour le texte principal, `#A8A095` amber-grey pour le secondaire
- Aucun italique nulle part

Si quelque chose cloche, on l'ajuste maintenant avant que la signature se propage partout.

### 2. Action Vercel

Aller sur `vercel.com`, ouvrir le projet `vespera-peach`. Settings, General, Root Directory, saisir `web` sans slash, Save.

Au prochain push sur `main`, Vercel détectera Next.js et buildera depuis `web/`. L'URL `vespera-peach.vercel.app` servira alors la nouvelle arrivée Vespera. La branche `legacy-v51` reste consultable via GitHub.

### 3. Décider quand merger

Une fois la validation visuelle faite, deux options :

- "Merge `step-1-foundations` sur `main`" et on enchaîne l'Étape 2
- "Fais tel ajustement puis merge" si quelque chose ne va pas

## Ce qui suivra à l'Étape 2

L'Étape 2 vise la **ligne de vie J1 polie de bout en bout** : arrivée, onboarding, Seuil, Rituel du Sceau, tutoriel, Hall J1, 4 pièces avec journal automatique, présentations cinématiques, descente à table, épreuve La Boîte (fonctionnelle, visuels à raffiner à l'Étape 4), Question J1, Voix des invités.

Sous-tâches anticipées :

1. Page d'arrivée avec vidéo `vespera-arrival.mp4` et bouton ENTRER
2. Onboarding 8 questions tappables
3. Seuil : 3 messages de V. successifs
4. Rituel d'attribution du Sceau, animation V37 portée fidèlement en Framer Motion (à reprendre du legacy avec soin, c'est la séquence la plus aboutie du POC)
5. Tutoriel 5 cartes
6. Hall J1 avec image de la villa et hotspots dorés pulsants
7. 4 pièces : bibliothèque, piscine, couloir, chambre
8. Modal d'indice + enregistrement automatique dans le journal
9. Présentations cinématiques (5 cartes invités)
10. Salon avec table à six couverts
11. La Boîte (mécanique, scoring, simulation PNJ)
12. Question J1 + Voix

À cette étape, on devra prendre des décisions ensemble sur :

- L'identité visuelle des hotspots et des cartouches de V.
- La scène d'arrivée : reprendre `vespera-arrival.mp4` du legacy ou refonte
- Le timing exact de l'animation V37 (si on adoucit ou si on garde tel quel)

Estimation : environ une semaine de travail focused.

## Infos utiles pour reprendre sans perdre de temps

### Comment relancer l'environnement

```
cd C:\Users\steve\vespera\web
npm run dev      # dev server sur http://localhost:3000
npm run build    # build production de validation
```

### Structure actuelle de `web/`

```
web/
├── app/
│   ├── layout.tsx        Root layout, fonts Fraunces + Inter, lang="fr"
│   ├── page.tsx          Page d'accueil placeholder Étape 1
│   └── globals.css       Palette nuit, opsz 14, italiques OFF, reduced-motion
├── lib/
│   ├── types/index.ts          Seal, Guest, GameState, Clue, JournalEntry, StorageAdapter
│   ├── store/gameState.ts      Zustand store + persist localStorage abstraite
│   └── content/
│       ├── seals.ts            6 Sceaux canon (Cerf, Loup, Chouette, Lynx, Corbeau, Cheval)
│       ├── guests.ts           5 invités S1 + ensurePorterIsMarc()
│       └── season1.ts          Murmures, indices, Questions, Voix, verdicts J7
└── public/seals/         6 médaillons PNG renommés en français
```

### Décisions actées (à ne pas rediscuter)

- Sceaux canon en français : Cerf, Loup, Chouette, Lynx, Corbeau, Cheval
- Joueur = Le Cheval (fixe en Phase 1)
- Marc = Porteur de la Clé (fixe en Phase 1)
- Refactor dans `web/` à la racine, pas `app/` (conflit avec App Router de Next.js)
- Branche `legacy-v51` figée, `index.html` legacy intact à la racine, à déplacer vers `legacy/` plus tard
- Game design des 5 épreuves manquantes : on décide étape par étape, pas en bloc
- Illustrations La Boîte, Visage, Détail : décisions reportées à l'Étape 4

### Règles de style à ne jamais oublier

- Pas d'italiques, jamais, nulle part
- Pas d'em-dash. Points, virgules, sauts de ligne à la place
- Signature `V.` toujours avec un point
- Fraunces avec `opsz: 14` forcé sur les longs textes
- Marc systématiquement le Porteur en Saison 1
- Sara n'apparaît jamais comme personnage, seulement par traces (initiale "S", photos, lettres)

### Stack et versions

- Next.js 16.2.6 (App Router, Turbopack)
- React 19.2.4
- TypeScript 5 strict
- Tailwind v4 (config dans CSS via `@theme inline`, plus de `tailwind.config.js`)
- Zustand avec middleware `persist` + `createJSONStorage`
- Framer Motion installé, pas encore utilisé

### État Git au moment de la pause

- Branche `main` : pointe sur le legacy V51 (commit `2e595e4`), inchangé
- Branche `legacy-v51` sur GitHub : copie de sécurité, identique à `main` à ce stade
- Branche `step-1-foundations` sur GitHub : contient toutes les fondations de cette session, prête à être mergée après validation
