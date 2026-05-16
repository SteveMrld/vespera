# VESPERA — RÈGLES DE STYLE NON-NÉGOCIABLES

Ces règles sont issues de plusieurs dizaines d'itérations avec le porteur du projet. Elles ne se discutent pas. Toute version qui les enfreint sera refusée.

## TYPOGRAPHIE

### Polices

- **Fraunces** (serif moderne) pour : titres, dialogues littéraires (Murmures, voix des invités, observations de V.), nom des invités et des Sceaux, citations, contenu narratif
- **Inter** (sans-serif) pour : UI (boutons, labels, compteurs), métadonnées, libellés courts type "JOUR 3 · MENSONGE"

### Contraintes Fraunces

Fraunces a un axe optical-size variable. **Forcer `font-variation-settings: "opsz" 14` globalement** pour éviter que la variante Display (très contrastée, illisible en paragraphe) ne se déclenche sur les longs textes.

```css
*, *::before, *::after {
  font-variation-settings: "opsz" 14;
}
```

### Italiques

**Pas d'italiques. Nulle part.** Ni dans le code, ni dans les textes narratifs.
Si tu ressens le besoin d'emphaser un mot, utilise la respiration de la phrase ou un saut de ligne, pas l'italique.

Si une variante italique s'affiche par défaut (placeholder de textarea, etc.), la neutraliser explicitement avec `font-style: normal`.

### Em-dash et tirets longs

**Pas de tirets cadratin (—).** Jamais. Le porteur déteste.
À la place : utiliser des points, des virgules, des sauts de ligne.

Exemple :
- ❌ "Vespera vous reconnaît — la nuit est à vous."
- ✅ "Vespera vous reconnaît. La nuit est à vous."

## SIGNATURE DE V.

L'intelligence narrative qui orchestre les soirées s'appelle **V.** (lettre V suivie d'un point).

Jamais "Vespera" comme nom de personnage (Vespera = le jeu). Jamais "V" sans point en signature. Jamais en cursive ni en italique. Toujours dans la même police que le contexte.

## VISUEL

### Esthétique générale

Villa méditerranéenne moderne, nuit. Pierre claire, bois sombre, eau, végétation luxuriante. La lumière est intérieure (lampes), pas extérieure.

Références photographiques : **Saltburn**, **The White Lotus**, intérieurs du Wallpaper magazine, photographie d'Helmut Newton mais sans le côté glamour explicite.

### Palette nuit (par défaut)

- Fond principal : `#0A0E18` à `#080604` (bleu nuit très profond, presque noir)
- Or sourd (or et accents) : `#D4B870`, `#FFE9B0` pour les highlights
- Crème (textes principaux) : `#EDE8DD`
- Gris ambré (textes secondaires) : `#A8A095`
- Oxblood (rare, pour moments forts) : `#5C1A1A`

### Palette jour (mode alternatif)

- Fond crème : `#F5F0E6`
- Textes : `#3C2E1F` à `#1A1208`
- Accents or plus chauds

### Ce qui est PROSCRIT visuellement

- ❌ **Effets faux-matière en CSS** : faux papier vélin, fausse encre qui coule, fausse cire de cachet rouge, fausse fumée, fausse texture froissée. Tout ça finit immanquablement **kitsch**. À la place : typographie soignée, fades, lignes simples, espaces.
- ❌ **Icônes Material Design** ou Font Awesome ou tout pictogramme cheap. Tout doit être personnalisé.
- ❌ **Couleurs vives** (rouge clignotant, jaune fluo, vert "OK"). Si un timer doit alerter, il passe au cuivre/orange chaud (`#E5A268`), pas au rouge.
- ❌ **Polices script** ou "élégantes" (Great Vibes, Tangerine, etc.).
- ❌ **Animations cheap** (slide-in latéral brusque, bounce, rotation comique). Toutes les transitions sont des fades de 400-800ms.

### Ce qui est ENCOURAGÉ visuellement

- ✅ **Photographies** comme arrière-plan des pièces (la villa est faite d'images réelles)
- ✅ **Hotspots ponctuels** lumineux (petits ronds dorés pulsants) sur les images, indiquant les zones cliquables
- ✅ **Fades longs** entre les états (400ms minimum)
- ✅ **Typographie comme élément graphique** : un mot bien placé en Fraunces sur fond noir vaut mieux qu'une illustration moche
- ✅ **Vraies illustrations** (gravures du XIXe, encres, peintures) pour les objets et les médaillons des Sceaux — pas des SVG faits main

## TEXTE NARRATIF

### Le ton de V.

V. est une intelligence qui observe. Elle ne juge pas, elle ne console pas, elle ne s'enthousiasme jamais. Elle constate, suggère, oriente.

Bonnes phrases de V. :
- "Quelqu'un dort mal cette nuit, et n'a pas voulu rester dans sa chambre."
- "L'eau garde mieux les traces que les murs."
- "Vous avez fait le tour. Ils vous attendent à table."

Mauvaises phrases de V. :
- ❌ "Bravo, vous avez trouvé un indice !" (V. ne félicite jamais)
- ❌ "Êtes-vous prêt à découvrir la vérité ?" (V. ne pose pas de questions rhétoriques)
- ❌ "Ne vous inquiétez pas, je suis là." (V. ne console jamais)

### Le ton des invités

Chaque invité a une voix distincte. Voir PILOTE_NARRATIF_S1.md pour les voix exactes de Marc, Théo, Camille, Inès, Karim. **Ces voix sont validées et ne se réécrivent pas.**

### Longueur des textes

- Murmures du matin : 2 à 4 phrases
- Voix des invités (réponses aux Questions) : 2 à 4 phrases
- Indices dans les pièces : 2 paragraphes maximum
- Observation de V. sur un indice : 1 phrase

### Conventions de nommage

Voir CONVENTION_NOMS.md (intégré ci-dessous).

**Grammaire des noms** :
- Avant les présentations J1 : Sceau seul ("le Cerf", "la Chouette")
- Pendant les présentations J1 : introduction du prénom ("Marc. Le Cerf.")
- Après : alternance "Marc" et "(Le Cerf)" selon le contexte

**Bug à éviter** : `ALL_SEALS[seal].name` retourne déjà `"Le Cerf"` avec "Le" majuscule intégré. Ne jamais préfixer par "Le " ou "le " (sinon "LE LE CERF" / "(le le cerf)").

## CONVENTION_NOMS.md (intégré)

### Les six Sceaux

1. **Le Cerf** — masculin, force calme, mémoire des lieux
2. **Le Loup** — masculin, instinct, méfiance, observation
3. **La Chouette** — féminin, sagesse, jugement, distance
4. **Le Lynx** — féminin, précision, beauté froide, esthétique
5. **Le Corbeau** — masculin, intelligence, mystère, dualité
6. **Le Cheval** — masculin, mouvement, fuite ou poursuite

Le joueur reçoit **Le Cheval** par défaut (Sceau du Visiteur). Les cinq autres sont distribués aux PNJ.

### Les cinq invités de la Saison 1

| Prénom | Sceau | Métier | Origine |
|--------|---------|---------|---------|
| Marc | Le Cerf | Architecte | Genève |
| Théo | Le Loup | Journaliste | Paris |
| Camille | La Chouette | Thérapeute | Lyon |
| Inès | Le Lynx | Curatrice de musée | Bruxelles |
| Karim | Le Corbeau | Neurochirurgien | Marseille |

**Marc est le Porteur de la Clé.** Sa Clé : il y a 14 ans, il a quitté sa fiancée Sara six mois avant qu'elle ne meure d'une longue maladie. Il porte ce secret depuis et n'en a jamais parlé à personne.

Cette information est **stable** et ne doit pas être randomisée tant qu'il n'y a qu'une seule Saison 1 écrite.
