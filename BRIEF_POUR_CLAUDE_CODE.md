# BRIEF POUR CLAUDE CODE — DÉMARRAGE DE MISSION

Voici le prompt à utiliser au tout début de la session avec Claude Code. À copier-coller intégralement.

---

## PROMPT INITIAL

Bonjour Claude,

Tu reprends un projet qui s'appelle **Vespera**. C'est un jeu mobile contemplatif d'enquête sociale. Sept soirs, cinq inconnus, une vérité à découvrir.

Le projet existe déjà sous forme de proof-of-concept fonctionnel (un mono-fichier HTML de 8000+ lignes), accessible sur `vespera-peach.vercel.app` et dans le repo `github.com/SteveMrld/vespera`. Tu vas devoir le **refactoriser et le hausser significativement en qualité**, sans perdre ce qui marche.

**Avant de coder quoi que ce soit, je veux que tu :**

1. **Lises l'intégralité du dossier de passation** qui t'est fourni. Il contient :
   - `README.md` : point d'entrée
   - `PITCH_PRODUIT.md` : vision et ambition
   - `REGLES_DE_STYLE.md` : les contraintes non-négociables (typographie, couleurs, ton)
   - `PILOTE_NARRATIF_S1.md` : l'histoire complète de la Saison 1, à intégrer telle quelle
   - `MECANIQUES_DE_JEU.md` : règles, déroulé, épreuves
   - `ARCHITECTURE_CIBLE.md` : la stack technique recommandée
   - `ETAT_ACTUEL_ET_BUGS.md` : ce qui marche, ce qui coince
   - Ce présent fichier `BRIEF_POUR_CLAUDE_CODE.md`

2. **Cloner le repo legacy** `github.com/SteveMrld/vespera` pour avoir accès au code de référence. Tu ne dois PAS modifier ce repo. Tu vas créer un nouveau projet propre à côté.

3. **Faire un audit** : lis le code legacy, identifie ce qui mérite d'être préservé (animations, séquences, contenu) et ce qui doit être réécrit (architecture, state management, CSS).

4. **Me présenter un plan de refactor** en quatre ou cinq étapes claires, avec une estimation de chaque étape, **avant de commencer à coder**.

## CE QUI NE SE DISCUTE PAS

- **Le pilote narratif S1** (textes des Murmures, voix des invités, présentations, indices, Question, observation de V., verdict final). Ces textes ont été itérés des dizaines de fois avec le porteur du projet. **Tu les reprends à la lettre.** Si tu trouves que tel texte serait "mieux" autrement, c'est probablement vrai, mais on ne le change pas dans cette mission.

- **Les règles de style** (pas d'italiques, pas d'em-dash, Fraunces avec `opsz` 14 forcé, signature `V.`, palette nuit comme défaut). Voir `REGLES_DE_STYLE.md`.

- **Marc est le Porteur** dans la Saison 1. Fixe. Pas de randomisation.

- **Le rituel d'attribution du Sceau (V37 dans le code legacy)** : la séquence d'animation est validée. Tu la reprends fidèlement.

## CE QUI EST AU CONTRAIRE OUVERT À TA CRITIQUE

Tu n'es pas un exécutant. Tu es l'architecte d'un produit dont le porteur a la vision mais pas le temps de tout penser. **Challenge le game design quand tu vois mieux.**

Voici les axes sur lesquels j'attends que tu **proposes activement des améliorations** :

### Les références fondatrices

Le jeu s'inspire ouvertement de :

1. **Million Dollar Secret (Netflix, 2024)** — émission télé où un joueur cache un million de dollars et où les autres doivent le démasquer. C'est la **source mécanique principale** de Vespera : un Porteur caché parmi des joueurs apparemment égaux, des épreuves quotidiennes qui révèlent progressivement, une élimination/accusation finale. Va regarder l'émission si tu peux. Vespera doit retenir l'intensité psychologique sans copier le format télé.

2. **Le chat de Schrödinger / la superposition quantique** — c'est la **métaphore conceptuelle** du jeu. Tant que personne n'a accusé, le Porteur est et n'est pas chacun des cinq invités, simultanément. Le secret existe en superposition. L'observation (l'accusation) fait s'effondrer la fonction d'onde. Cette dimension peut/doit traverser le design : nom des Sceaux, langage de V., mécanique de "Collapse" au J7, vocabulaire ("Cycle", "Cle", "Observateur"). Le code legacy utilise déjà "Collapse" et "Cycle" — c'est volontaire.

3. **Saltburn, White Lotus, Glass Onion** — l'esthétique et le ton.

Si tu vois comment ces trois références peuvent informer le game design au-delà de ce que le porteur a déjà pensé, **propose**. Notamment :

- **Une mécanique d'incertitude quantique** : et si certaines réponses des invités changeaient subtilement entre deux consultations, comme si elles n'étaient "déterminées" qu'au moment où on les lit ? (À débattre — peut être trop conceptuel, ou au contraire signature forte du jeu.)
- **Une variation Million Dollar Secret** : le Porteur pourrait avoir des "interactions privées" avec V. que les autres ne voient pas (un onglet de chambre supplémentaire ?). Aujourd'hui le Porteur est juste un PNJ avec un secret. C'est sous-exploité.
- **Une mécanique de "doute" public** : à mi-cycle, le joueur pourrait poser une "Question dirigée" à un invité spécifique, qui répondrait différemment selon qu'il est Porteur ou pas. Risque de tuer le mystère trop tôt. Mais à creuser.

### Les épreuves

Six épreuves sont brieffées (`MECANIQUES_DE_JEU.md`). Mais elles sont au niveau du concept, pas du design fini. **Challenge-les.** En particulier :

- **L'Écho (J3)** : actuellement décrite comme "mémoire auditive, retrouver l'ordre des mots". Faible. Trouve mieux qui colle au thème SILENCE.
- **Le Choix (J5)** : "dilemme moral chronométré". Vague. Affine.
- **L'Empathie / Le Visage (J6)** : repose sur 5 photos de visages avec subtilité d'émotion. Très difficile à exécuter avec des assets génériques. Propose une alternative mécanique si tu vois mieux.

Pour **chaque épreuve**, tu dois pouvoir expliquer :
- Comment elle teste une dimension précise des invités
- Pourquoi cette dimension donne un indice subtil sur qui est le Porteur
- Comment elle se joue en moins de 90 secondes (mobile, attention courte)
- Pourquoi elle est différente des cinq autres

### Le profilage des invités

Aujourd'hui sur 4 dimensions (Mémoire, Mensonge, Observation, Empathie). C'est peut-être trop peu, ou mal choisi. **Tu peux proposer une autre grille** si tu vois mieux. Par exemple : Mémoire, Décodage, Audace, Cohérence, Compassion (5 dimensions, plus de nuances).

Le critère : la grille doit permettre que **chaque invité soit "le meilleur" sur une épreuve au moins**, pour que le Porteur (qui a un bonus global caché) ne saute pas aux yeux.

### Le rythme global du Cycle

L'alternance jours courts/longs est validée. Mais d'autres rythmiques sont possibles :

- Une "nuit de tempête" au J4 où la villa coupe l'électricité et où l'épreuve se joue à la bougie (mobile sombre, sons, autre type d'attention)
- Un "soir d'invité" où l'un des PNJ envoie un message direct au joueur, créant une intimité piégée
- Un "moment de silence" optionnel au J3, où le joueur peut choisir de ne pas répondre à la Question, et où ce silence est noté par les autres

Ces idées sont des **invitations à creuser**. Pas des commandes.

### Le sentiment final

À la fin d'un Cycle, le joueur doit ressentir une vraie **émotion** : compassion pour Marc, mélancolie, le sentiment d'avoir vu quelque chose qu'on ne voit pas dans la vraie vie. Aujourd'hui le verdict est texte plein écran. C'est correct mais pas bouleversant.

**Propose une mise en scène** plus forte pour le verdict. Une séquence sonore ? Un mouvement de caméra (zoom out de la villa) ? Le médaillon de Marc qui s'éteint un par un ? Le joueur qui doit "fermer" la villa lui-même ?

## COMMENT NOUS TRAVAILLERONS

Quand tu identifies une opportunité de game design (au-delà du refactor pur), **tu me proposes 2 ou 3 alternatives bien différenciées**, avec pour chacune :

- Le ressenti visé pour le joueur
- Le risque (peut tuer le mystère, peut être trop conceptuel, peut être techniquement coûteux)
- Une estimation de coût (heures/jours de dev)

Je tranche, tu codes. Si je dis non à une proposition, ne reviens pas la pousser trois tours plus tard. Si je dis oui mais avec un ajustement, applique l'ajustement sans rediscuter.

**Le porteur n'est pas développeur.** Les choix techniques restent ton territoire. Les choix de design narratif et de mécanique se font à deux.

## CE QUE TU PEUX (ET DOIS) AMÉLIORER

- **L'architecture** : passer d'un mono-fichier HTML à un vrai projet Next.js + TypeScript + Tailwind + Zustand (voir `ARCHITECTURE_CIBLE.md`)
- **La qualité visuelle** : c'est moche actuellement. Photos optimisées, animations soignées, transitions Framer Motion
- **Les épreuves** : seule La Boîte (J1) existe. Implémente les 5 autres (Le Mensonge, Le Détail, Le Visage)
- **L'alternance jours courts/longs** : pas implémentée. J2/J4/J6 doivent devenir courts (1 pièce + épreuve), J3/J5 longs (toutes pièces + Question)
- **La préparation du multijoueur** : architecturer pour pouvoir brancher Supabase plus tard sans tout casser

## ASSETS À PRODUIRE

Pour les 30 illustrations de La Boîte, les 5 portraits du Visage J6, et les paires d'images du Détail J4 : tu **ne dois pas** essayer de les dessiner en SVG bricolé (c'est ce qui a échoué la dernière fois). Trois options :

1. Recommander au porteur de générer ces images sur Midjourney/DALL-E avec un prompt unique cohérent que tu lui fournis
2. Utiliser des gravures du XIXe libres de droits (Wikimedia Commons, Internet Archive)
3. Photographies stock (Unsplash, Pexels) sélectionnées avec exigence

Quel que soit le choix, **demande son arbitrage au porteur** plutôt que d'imposer une solution.

## SUR LE TON ET LA POSTURE

Le porteur du projet est exigeant sur l'esthétique et le ton. Il itère beaucoup, n'aime pas les compromis tièdes, et préfère qu'on lui dise franchement ce qui n'est pas faisable plutôt qu'on lui livre du médiocre. Il n'a pas le temps de coder lui-même mais il a une vision très claire.

Quand tu lui présentes une option, présente **2-3 alternatives bien différenciées** plutôt que de demander "tu veux quoi ?". Quand tu identifies un risque, dis-le. Quand un de ses retours est ambigu, demande confirmation avant de coder une grosse fonctionnalité.

Bonne mission.

---

## CHECKLIST DE LIVRAISON PHASE 1

Avant de considérer la Phase 1 terminée et de passer au multijoueur, vérifier que :

- [ ] Le code est intégralement en TypeScript, sans `any` ni `unknown` non justifié
- [ ] Toutes les fonctions critiques (scoring, simulation PNJ, transitions de jour) ont des tests unitaires
- [ ] Un test end-to-end (Playwright) parcourt un Cycle complet J1→J7 et arrive au verdict
- [ ] Le score Lighthouse est ≥ 90 sur Performance et ≥ 95 sur Accessibility
- [ ] Toutes les épreuves (Boîte, Mensonge, Détail, Visage) sont implémentées et testables
- [ ] L'alternance court/long fonctionne (J2/J4/J6 courts, J3/J5 longs)
- [ ] Le journal automatique enregistre sans doublon et sans fuite d'état entre les sessions
- [ ] La signature visuelle est cohérente : palette nuit par défaut, Fraunces sans italique, pas d'em-dash, pas d'effets kitsch
- [ ] Le bouton `RECOMMENCER LE CYCLE` efface bien le storage et relance proprement
- [ ] L'état du jeu se sauvegarde et se recharge correctement entre les sessions
- [ ] L'architecture est prête pour brancher un backend distant (les fonctions de save/load sont abstraites et remplaçables)

## CHECKLIST DE LIVRAISON PHASE 2 (multijoueur)

- [ ] Backend Supabase configuré (DB, Auth, Realtime)
- [ ] Système d'invitation par lien ou code à 6 chiffres
- [ ] Sélection du Porteur côté serveur, totalement opaque pour les clients
- [ ] Fenêtre temporelle 20h-23h serveur-side (anti-triche)
- [ ] Synchronisation en temps réel des réponses pendant la fenêtre de soirée
- [ ] Notifications push (Web Push API ou OneSignal)
- [ ] Gestion des "absents" : que faire si un joueur ne joue pas pendant 24h ? (score par défaut ? cycle suspendu ? options à discuter avec le porteur)
- [ ] Page d'administration légère pour voir l'état d'un Cycle en cours
