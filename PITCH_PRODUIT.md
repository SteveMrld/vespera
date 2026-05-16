# VESPERA — PITCH PRODUIT

## En une phrase

Un jeu mobile contemplatif où six invités se réunissent dans une villa pendant sept soirs, et où l'un d'eux porte un secret que les autres doivent débusquer.

## Les références qui définissent le jeu

### Les deux fondations conceptuelles

**Million Dollar Secret (Netflix, 2024)** est la source mécanique directe. Dans cette émission, un joueur cache un million de dollars dans son sac et les autres concurrents doivent l'identifier avant la fin du programme. Vespera reprend ce noyau : **un Porteur secret au milieu de joueurs apparemment égaux**, des épreuves qui exposent progressivement, une accusation finale qui clôt le mystère.

La différence : Vespera est contemplatif, pas compétitif. Personne ne gagne d'argent. La récompense est émotionnelle — comprendre qui est Marc, pourquoi il porte ce secret, et ressentir quelque chose pour lui (ou pas).

**Le chat de Schrödinger** est la métaphore conceptuelle. Tant que personne n'a accusé, le Porteur est **simultanément chacun des cinq invités**, en superposition quantique. L'acte d'accuser fait s'effondrer la fonction d'onde. Cette idée infuse le langage du jeu : "Cycle", "Clé", "Sceau", "Collapse" (le moment de l'accusation), "Observateur". V. parle d'ailleurs ainsi, par sous-entendus quantiques discrets.

L'enjeu de design : tirer parti de cette dimension sans la rendre prétentieuse. Le joueur ne doit pas lire un cours de physique — il doit sentir que le secret est "instable" tant qu'il n'a pas regardé, et qu'en regardant il transforme la situation.

### Les références esthétiques

- **Saltburn** (Emerald Fennell) — l'atmosphère, le voyeurisme bourgeois, la villa-personnage
- **The White Lotus** (HBO) — l'observation lente des dynamiques humaines en huis clos
- **Glass Onion** (Knives Out 2) — la mécanique du mystère social, la révélation finale en cascade

Vespera n'est ni un quiz, ni un escape game, ni un thriller. C'est un **jeu d'enquête sociale contemplative** où l'on apprend à lire les autres — avec une fondation Million Dollar Secret + Schrödinger qui en fait quelque chose qui n'existe pas ailleurs.

## La promesse

Sept soirs. Cinq inconnus. Une vérité.

Le joueur est invité dans la villa de V. — une intelligence narrative qui orchestre les soirées. Chaque soir, V. dévoile un thème (Image, Doute, Silence, Mensonge, Trahison, Pardon, Révélation). Les invités parlent. Le joueur observe.

L'un des cinq autres porte une "Clé" — un secret intime qui pèse depuis des années. Le joueur ignore qui c'est. Au septième soir, il doit nommer le Porteur.

## L'expérience attendue

- **Mobile-first.** Joué par sessions courtes, idéalement le soir.
- **Premium.** Pas de pub, pas d'in-app purchase, pas de gamification cheap. Tout doit donner le sentiment d'un objet rare.
- **Lent et dense.** Pas d'urgence. Le rythme est celui d'un dîner long.
- **Texte ciselé.** Chaque mot pèse. Les Murmures de V., les voix des invités, les indices laissés dans les pièces — tout est écrit comme une nouvelle littéraire.
- **Visuel photoréaliste.** La villa est faite de vraies photographies (8 images de référence existent déjà). Pas d'illustrations cartoon. Tout est photo, sépia/amber/oxblood la nuit, lumière dorée le jour.
- **Typographie de signature.** Fraunces pour les titres (jamais en italique, jamais en variante Display). Inter pour le corps.

## Les deux phases du produit

### Phase 1 — Solo narratif

Un seul Cycle de sept jours. Les cinq autres invités sont des PNJ simulés. Le joueur joue à son rythme. Il y a une seule "Saison 1" écrite, avec Marc/Le Cerf comme Porteur (validé narrativement).

C'est la phase actuelle, à finir et polir.

### Phase 2 — Multijoueur asynchrone-synchrone

Le joueur invite quatre ou cinq amis. Chacun reçoit un Sceau (Le Cerf, Le Loup, La Chouette, Le Lynx, Le Corbeau, Le Cheval). L'un d'eux reçoit secrètement la Clé.

**Mécanique temporelle** :
- En journée (jusqu'à 20h) : chacun joue les épreuves quand il veut, individuellement
- 20h-23h : fenêtre de soirée commune. Les réponses à la Question s'affichent. On lit ce que les autres ont dit. On observe les scores.
- 23h : la fenêtre se ferme. Le jour avance pour tout le monde.

Backend nécessaire : Firebase ou Supabase, comptes utilisateurs, invitations par lien ou code, fenêtres temporelles côté serveur (pas de triche via changement d'heure), notifications push.

**L'architecture Phase 1 doit être préparée pour la Phase 2.** Tous les états du joueur doivent être abstraits pour pouvoir être remplacés par un état distant.

## Ce que Vespera n'est pas

- Pas un Among Us. Pas de votes. Pas de meurtres. Pas de tension agressive.
- Pas un party game. Le rythme est lent et personnel, même en multi.
- Pas un visual novel. Le joueur a de vraies décisions, de vraies épreuves à résoudre.
- Pas un escape room. Il n'y a pas de puzzles logiques à résoudre. Il y a des gens à lire.

## Le ressenti final visé

À la fin d'un Cycle, le joueur doit avoir l'impression d'avoir **vraiment vécu sept soirs dans une villa avec cinq personnes**. Pas d'avoir joué à un jeu vidéo, mais d'avoir traversé une histoire qui lui appartient un peu.
