# VESPERA — MÉCANIQUES DE JEU

## VUE D'ENSEMBLE D'UN CYCLE

Un Cycle = 7 jours. Chaque jour a un thème, un type de soirée, et un déroulé spécifique.

| Jour | Thème | Type | Murmure | Pièces | Épreuve | Question |
|------|-------|------|---------|--------|---------|----------|
| J1 | IMAGE | Découverte | Non | 4 (guidées) | La Boîte | Oui |
| J2 | DOUTE | Court | Oui | 1 (V choisit) | Le Mensonge | Non |
| J3 | SILENCE | Long | Oui | 4 (libres) | Non | Oui |
| J4 | MENSONGE | Court | Oui | 1 (V choisit) | Le Détail | Non |
| J5 | TRAHISON | Long | Oui | 4 (libres) | Non | Oui |
| J6 | PARDON | Court | Oui | 1 (V choisit) | Le Visage | Non |
| J7 | RÉVÉLATION | Final | Oui | 4 (libres) | Non | Non (Accusation) |

**Pourquoi l'alternance** : éviter la lassitude. Les jours courts donnent du rythme (action rapide), les jours longs laissent respirer (contemplation). Validé par le porteur du projet.

## ÉTAPES D'ONBOARDING (avant le J1)

1. **Vidéo d'arrivée** (3-5 secondes), texte en sur-impression : "Sept soirées. Cinq inconnus. Une vérité." Bouton ENTRER.

2. **Onboarding 8 questions tappables** (pas de saisie texte) : profile le joueur en termes d'attitude, valeurs, préférences. Sert à personnaliser quelques bribes du Cycle plus tard. Voir ONBOARDING_QUESTIONS dans le code legacy pour le contenu actuel.

3. **Le Seuil** : 3 messages successifs de V., qui installe le ton. "Vespera vous reconnaît." → "Avant d'entrer, vous allez recevoir un Sceau." → "Ce Sceau sera votre identité pour ce Cycle." Bouton CONTINUER.

4. **Rituel d'attribution du Sceau** :
   - Typographie animée : "VOTRE SCEAU POUR CE CYCLE"
   - Apparition centrée d'un médaillon (cercle d'or)
   - Roue qui tourne, défilant les 6 Sceaux (Cerf, Loup, Chouette, Lynx, Corbeau, Cheval)
   - Arrêt sur **Le Cheval** (Sceau du joueur, fixe en Phase 1)
   - Cascade de texte : nom du Sceau, règle d'or de Vespera, vertu du Sceau, signature V., bouton ACCEPTER CE SCEAU.

5. **Onboarding du jeu** : 5 cartes successives expliquant le déroulé d'un Cycle, le Hall, les pièces, la table, le journal. Bouton SUIVANT.

6. **Hall J1** : le joueur arrive dans la villa.

## DÉROULÉ D'UN JOUR

### Jour de découverte (J1)

1. Le joueur arrive dans le Hall (image de la villa, hotspots ponctuels lumineux).
2. V. apparaît en cartouche : "Commencez par la bibliothèque. Quelqu'un y est passé cette nuit."
3. Le joueur tape la bibliothèque. Il découvre les 3 objets (chaque tap ouvre un modal plein écran avec le titre, le body, l'observation de V., bouton FERMER).
4. Au retour au Hall, V. : "La piscine maintenant. L'eau garde mieux les traces que les murs."
5. Piscine, 3 objets.
6. Couloir, 3 objets, V. : "Le couloir nord. C'est là que la villa devient personnelle."
7. Chambre du joueur. V. : "Votre chambre, enfin. J'y ai laissé quelque chose pour vous."
8. Une fois tout visité, V. : "Vous avez fait le tour. Ils vous attendent à table." → bouton DESCENDRE À TABLE.
9. **Présentations cinématiques** : les 5 invités se présentent un par un (carte plein écran avec médaillon de leur Sceau).
10. **Épreuve J1 : La Boîte** (voir ci-dessous).
11. **Question J1 du soir** affichée au centre de la table. Le joueur répond (saisie texte).
12. **Lecture des Voix** : les 6 réponses sont révélées une par une.
13. V. cartouche de fin de soirée : "La soirée est passée. Demain, le thème sera DOUTE."
14. Bouton **PASSER AU JOUR 2** (gros, doré, central, en bas du Hall).

### Jour court (J2, J4, J6)

1. Hall, Murmure du matin de V. en cartouche. Bouton COMMENCER LA JOURNÉE.
2. **Une seule pièce s'ouvre** (V. décide laquelle).
3. Le joueur visite la pièce, lit l'indice unique.
4. Au retour au Hall, V. : "Ils vous attendent à table." → bouton DESCENDRE À TABLE.
5. **Épreuve du jour** (Le Mensonge / Le Détail / Le Visage).
6. Scores annoncés.
7. V. cartouche de fin de soirée.
8. Bouton **PASSER AU JOUR N+1**.

### Jour long (J3, J5)

1. Hall, Murmure du matin. Bouton COMMENCER LA JOURNÉE.
2. **Toutes les pièces sont ouvertes simultanément** (parcours libre).
3. Le joueur visite les pièces qu'il veut, dans l'ordre qu'il veut.
4. Bouton **DESCENDRE À TABLE** disponible dès le départ (mais V. encourage à visiter).
5. **Question du soir** affichée au centre de la table.
6. Saisie de la réponse.
7. Lecture des Voix.
8. V. cartouche de fin de soirée.
9. Bouton **PASSER AU JOUR N+1**.

### Jour de Révélation (J7)

1. Hall, Murmure du matin (le plus solennel des sept).
2. Toutes les pièces sont ouvertes, parcours libre.
3. À table, au centre : "L'ACCUSATION" / "NOMMER LE PORTEUR →"
4. Le joueur choisit parmi les 5 invités, confirme.
5. **Verdict** : écran plein écran, fond noir, texte centré (voir PILOTE_NARRATIF_S1.md pour les versions juste/faux).
6. Bouton **FERMER LE CYCLE**.

## LE HALL

Le Hall est le hub central de chaque journée. Image de référence : une entrée de villa moderne, nuit, lumière intérieure dorée.

**Éléments visuels** :
- Image de fond pleine largeur
- Petits hotspots ponctuels lumineux (cercles dorés pulsants) sur les zones cliquables
- Au-dessus de chaque hotspot, un label en petites majuscules : BIBLIOTHÈQUE, PISCINE, COULOIR, CHAMBRE, SALLE À MANGER
- Indicateur de jour discret en haut (`J 3 · SILENCE`)
- Cartouche flottant de V. (s'affiche selon le moment du jour)
- Footer : gros bouton conditionnel **PASSER AU JOUR N+1** (gris si dîner pas fait, doré pulsant si dîner fait), bouton discret **Recommencer le Cycle**

**Bouton PASSER AU JOUR suivant** :
- Caché au J7
- Inactif (gris semi-transparent) tant que le dîner du jour n'est pas terminé. Si tappé, V. dit : "Pas encore. V. vous attend à table."
- Actif (or pulsant) une fois le dîner fait.

## LE JOURNAL AUTOMATIQUE D'INDICES

Quand le joueur ouvre un objet dans une pièce (bibliothèque, piscine, couloir), l'entrée est automatiquement enregistrée dans son **carnet** dans la Chambre.

**Format de chaque entrée** :
- Date (jour)
- Pièce
- Titre de l'indice
- Observation de V.
- Champ libre optionnel : "Une note pour vous-même…"

**Organisation** : groupé par jour avec un titre `JOUR N · THÈME` en or sourd.

**Pas de notes par invité.** L'ancienne version avait 5 textareas (un par invité) qui ne servaient à rien. Supprimé.

## LES SIX ÉPREUVES

### J1 — LA BOÎTE (mémoire visuelle)

**Annonce** : V. dit "Avant que la nuit ne s'avance, un premier exercice. Ce que vous oublierez parlera autant que ce que vous direz. Une boîte. Quinze objets. Vingt secondes pour les retenir."

**Phase 1 — Mémorisation** : Grille 5×3 de 15 objets affichés pendant 20 secondes. Compteur sobre en haut.

**Phase 2 — Réponse** : Grille 5×6 de 30 objets (les 15 originaux + 15 leurres mélangés). Le joueur tape ceux qu'il a vus. Compteur de sélection "X / 15".

**Phase 3 — Résultats** : Les scores des 6 invités s'affichent un par un avec délai (Camille, Théo, Inès, Karim, Marc, puis Vous). Phrase de clôture : "Les nombres parlent. À vous d'écouter ce qu'ils disent."

**Score utilisateur** : +1 par bonne coche, -1 par mauvaise coche, plancher 0, plafond 15.

**Score des invités (simulé)** :
- Marc / Le Cerf : base 11 + bonus Porteur 2-3 → 13-14
- Inès / Le Lynx (curatrice musée) : base 11 → 10-12
- Karim / Le Corbeau (neurochirurgien) : base 10 → 9-11
- Théo / Le Loup : base 9 → 8-10
- Camille / La Chouette : base 9 → 8-10

Variance ±1 sur chaque.

**Pourquoi ces profils** : Marc et Inès sont bons en mémoire visuelle par métier. Marc en plus a son bonus caché de Porteur. L'écart Marc / les autres doit être plausible.

**Visuels** : 30 objets. **À ne PAS faire en SVG bricolé** (testé, c'est moche). Soit utiliser des illustrations vintage (gravures du XIXe libres de droits), soit générer 30 images cohérentes via Midjourney/DALL-E avec un prompt unique.

### J2 — LE MENSONGE (détection)

**Concept** : Quatre témoignages écrits sont affichés. Trois sont vrais, un ment. Le joueur doit identifier le menteur.

**Mécanique** : 4 cartes plein écran, chacune avec un court paragraphe attribué à un invité (avec son médaillon de Sceau). Le joueur tape la carte qu'il croit fausse. Validation.

**Scoring** : binaire (juste / faux) pour le joueur. Les invités ont des scores simulés selon leur profil "détection mensonge".

**Profils détection** :
- Camille / La Chouette (thérapeute) : forte
- Théo / Le Loup (journaliste) : forte
- Karim / Le Corbeau : moyenne
- Inès / Le Lynx : moyenne
- Marc / Le Cerf : faible (mais bonus Porteur 0.5)

**Contenu** : 4 témoignages courts à écrire, dans le ton du J2 (Doute). Le faux témoignage peut être celui d'un invité OU de V. elle-même.

### J3 — pas d'épreuve. Question longue.

### J4 — LE DÉTAIL (observation)

**Concept** : Une photo de la villa est affichée pendant 10 secondes. Le joueur la voit. Ensuite, une seconde photo apparaît, presque identique, mais avec **un élément changé**. Le joueur doit dire ce qui a changé.

**Mécanique** : 3 propositions parmi lesquelles choisir (forme QCM, mais habillée comme un dialogue avec V.).

**Visuels** : il faut **deux versions photographiques** d'une même scène avec une variation subtile (un objet déplacé, une lumière éteinte, un détail ajouté).

**Profils observation** :
- Inès / Le Lynx (curatrice) : très forte
- Théo / Le Loup (journaliste) : forte
- Camille / La Chouette : forte
- Karim / Le Corbeau : moyenne
- Marc / Le Cerf : moyenne (mais bonus Porteur)

### J5 — pas d'épreuve. Question longue.

### J6 — LE VISAGE (empathie)

**Concept** : Cinq visages sont affichés, en gros plan, noir et blanc. Quatre sont neutres, un porte une émotion subtile (perte, deuil, douleur contenue). Le joueur doit identifier lequel.

**Mécanique** : 5 cartes avec photos, le joueur tape celui qui "a perdu quelqu'un récemment".

**Visuels** : 5 portraits photographiques noir et blanc, gros plan, expression contrôlée. Difficile à générer fidèlement — peut-être utiliser une bibliothèque de portraits libres de droits (Unsplash) avec sélection manuelle.

**Profils empathie** :
- Camille / La Chouette (thérapeute) : très forte
- Marc / Le Cerf : forte (lié à sa propre Clé, secret bonus de cohérence narrative)
- Théo / Le Loup : moyenne
- Karim / Le Corbeau : moyenne
- Inès / Le Lynx : faible

**Note** : c'est l'épreuve où Marc, parce qu'il a porté son propre deuil pendant 14 ans, peut être étonnamment bon. C'est un indice **fort** mais pas explicite — le joueur doit faire le lien.

## LE PROFILAGE GLOBAL DES INVITÉS

Récap sur les 4 dimensions :

| Invité | Mémoire | Mensonge | Observation | Empathie |
|--------|---------|----------|-------------|----------|
| Marc / Cerf | **Forte** | Faible | Moyenne | **Forte** (cohérence Clé) |
| Théo / Loup | Moyenne | **Forte** | **Forte** | Moyenne |
| Camille / Chouette | Moyenne | **Forte** | Forte | **Très forte** |
| Inès / Lynx | **Forte** | Moyenne | **Très forte** | Faible |
| Karim / Corbeau | Forte | Faible | Moyenne | Moyenne |

**Le bonus caché du Porteur** : Marc reçoit +2 à +3 sur **toutes** les épreuves. C'est ce qui le rend statistiquement le meilleur en moyenne, donc suspect. Mais pas évident parce que sur chaque épreuve individuelle, le bonus se confond avec ses forces naturelles ou ses faiblesses naturelles.

## LE SYSTÈME JOUR / NUIT

La villa change de palette selon l'heure. Mais c'est essentiellement décoratif : la mécanique de jeu reste la même.

- **Nuit** : palette principale du jeu (bleu nuit, or sourd)
- **Jour** : palette alternative (crème, brun chaud)

Un bouton "JOUR / NUIT" en haut à droite permet de basculer manuellement. Sinon, basculé automatiquement après le dîner.

## SAUVEGARDE

En Phase 1 : `localStorage` du navigateur. Tout l'état du Cycle (jour courant, pièces visitées, réponses, scores, journal) y est sérialisé.

Bouton **RECOMMENCER LE CYCLE** dans le Hall (en bas, discret) qui efface le storage et relance à zéro.

En Phase 2 (multijoueur) : backend distant (Supabase, Firebase). Sauvegarde par compte utilisateur, sessions partagées.

## DÉTAILS D'IMPLÉMENTATION CRITIQUES

### Le passage de jour

`gameState.currentDay` (1 à 7) est l'index du jour.
Chaque jour a `gameState.daysData[day] = { ... }` qui contient :
- `hallEntered: true/false` (Murmure lu)
- `dinnerReady: true/false` (toutes les pièces visitées, prêt pour le dîner)
- `userResponse: string | null` (réponse du joueur à la Question)
- `responsesRead: true/false` (Voix consultées)
- `completed: true/false` (jour terminé, bouton JOUR SUIVANT activable)
- Pour le J1 : `introductionsDone`, `laboiteCompleted`
- Pour le J7 : `accusationDone`

### Le visitedRoomsByDay

`gameState.visitedRoomsByDay[day]` = liste des pièces visitées ce jour. Permet d'animer les hotspots un par un en mode guidé.

### L'ordre des pièces guidé

`DAILY_ROOM_ORDER = ['library', 'pool', 'couloir', 'chambre']` (au J1 et aux jours courts si pas free-roam).

### Le journal

`gameState.journalEntries` = liste de `{ key, day, room, roomLabel, title, body, observation, ts }`.
Clé unique `${day}-${room}-${id}` pour éviter doublons.

Notes libres : `gameState.journalUserNotes[entryKey] = "texte libre"`.
