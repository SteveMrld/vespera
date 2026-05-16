# VESPERA — ÉTAT ACTUEL ET BUGS CONNUS

État du repo `github.com/SteveMrld/vespera` à la fin de la session de prototypage (mai 2026).

## DERNIER COMMIT

`c8d95b9` — V51 : tentative de raffiner 3 SVG de La Boîte. Branche `main`.

URL de déploiement : `vespera-peach.vercel.app`

## CE QUI MARCHE BOUT EN BOUT

Le cycle complet du J1 au J7 est jouable. Un joueur peut :

1. Voir la vidéo d'arrivée, taper ENTRER
2. Répondre aux 8 questions de l'onboarding (tappables, sans saisie texte)
3. Lire les 3 messages du Seuil
4. Recevoir son Sceau via le rituel (typo + roue + médaillon, animation validée et **à ne pas toucher**)
5. Lire les 5 cartes du tutoriel
6. Arriver au Hall J1
7. Visiter en mode guidé : Bibliothèque → Piscine → Couloir → Chambre
8. Descendre à table, voir les présentations cinématiques des 5 invités
9. Faire La Boîte (épreuve J1, fonctionnelle mais visuellement à refaire)
10. Répondre à la Question du soir J1
11. Lire les Voix des autres invités
12. Voir le bouton **PASSER AU JOUR 2** s'activer (or pulsant)
13. Répéter pour J2, J3, J4, J5, J6 (avec actuellement le **même format** : 4 pièces + Question, l'alternance court/long n'est pas implémentée)
14. Arriver au J7, taper **NOMMER LE PORTEUR**, choisir un invité, voir le verdict

## CE QUI EST AGRÉABLE ET À PRÉSERVER

### Le rituel d'attribution du Sceau (V37)

Décrit en détail dans le code legacy. Séquence :
- 0.6s : "Vespera vous reconnaît."
- 2.6s : "VOTRE SCEAU POUR CE CYCLE"
- 3.6s : médaillon émerge au centre
- 4.6s : roue qui tourne, défile les 6 Sceaux
- À l'arrêt : médaillon-verrouillé + petite vibration tactile
- Cascade de texte : nom du Sceau, règle d'or, vertu, "V.", bouton ACCEPTER

C'est la séquence la plus aboutie esthétiquement du proof-of-concept. **À reprendre fidèlement.**

### Le journal automatique d'indices (V49)

Quand le joueur ouvre un objet dans une pièce, l'entrée est enregistrée dans son carnet (Chambre, onglet MES NOTES). Groupé par jour avec titre `JOUR 1 · IMAGE`. Petit champ "votre note" optionnel sous chaque entrée. Fonctionnel et apprécié par le porteur.

### Le bouton conditionnel PASSER AU JOUR SUIVANT (V43)

Gros bouton central en bas du Hall. Gris/inactif tant que le dîner du jour n'est pas terminé, doré/pulsant une fois prêt. Caché au J7.

### Les cartouches de V.

Petite carte flottante au centre du Hall qui affiche les phrases de V. avec un bouton "JE COMPRENDS" pour la fermer. Bien fait, à reprendre.

### La table à six couverts (image salle à manger)

L'image de référence montre une table circulaire vue du dessus, six assiettes avec médaillons des Sceaux. Au centre, un cartouche qui change de contenu selon le moment (Question, Voix, Soirée terminée, Accusation). Visuellement réussi.

## CE QUI EST CASSÉ OU MOCHE

### Les SVG de La Boîte (V50/V51)

**30 objets en SVG faits à la main.** Tentative ratée. Trop simplistes, abstraits, on dirait des icônes Material Design. Le porteur a explicitement rejeté.

**À refaire** soit avec de vraies illustrations générées (Midjourney/DALL-E), soit avec des gravures du XIXe libres de droits.

### L'alternance jours courts/longs n'est PAS implémentée

Tous les jours fonctionnent actuellement comme le J1 : 4 pièces guidées + dîner + Question. La spécification valide (voir MECANIQUES_DE_JEU.md) prévoit :
- J2, J4, J6 = **courts**, une seule pièce + épreuve
- J3, J5 = **longs**, toutes les pièces libres + Question
- J1 = découverte (présentations + épreuve + Question)
- J7 = révélation (accusation)

**À implémenter dans le refactor.**

### Les épreuves J2, J3, J4, J5, J6 n'existent pas

Seule La Boîte (J1) est codée. Les 5 autres sont à concevoir et implémenter (voir MECANIQUES_DE_JEU.md pour les briefs).

### Mode multijoueur : aucune fondation

Tout est en `localStorage` du navigateur. Pas de backend, pas de comptes, pas de synchronisation. **À construire de zéro** pour la Phase 2.

### Quelques bugs visuels mineurs

- Capture mobile prise par le porteur : sur l'image de la piscine, le label "LA CIGARETTE" se chevauche avec le titre "La Piscine" (hotspot mal positionné)
- Le compteur de notes (X) sur l'onglet MES NOTES peut afficher des valeurs étranges si les entrées sont nombreuses

## HISTORIQUE DES BUGS RÉSOLUS (V42 à V51)

| Version | Bug |
|---------|-----|
| V42 | Hotspot "Salle à manger" qui ne réagissait pas (contournement : bypass automatique dans `goToHall` quand toutes les pièces sont visitées) |
| V44 | Bouton CONTINUER L'EXPLORATION au J2 qui ne ramenait pas au Hall (mauvaise condition sur `dayData.completed`) |
| V45 | Bouton ← HALL au salon qui semblait ne pas marcher (défensif : `showScene('hall')` appelé en premier puis tentative de bypass) |
| V46 | Médaillons des Sceaux qui débordaient partout (les `<img>` n'avaient pas de styles inline pour contraindre à 100% du parent) |
| V47 | Bouton RÉPONDRE au centre de la table qui ramenait à l'écran d'avant (le `onclick` sticky du jour précédent n'était pas reset) |
| V48 | "LE LE CORBEAU" et "Marc (le le cerf)" dans le verdict (`ALL_SEALS[seal].name` contient déjà "Le", ne pas préfixer) |
| V49 | Remplacement des 5 textareas inutiles par le journal automatique |
| V50 | Implémentation de La Boîte (épreuve J1) — fonctionnel mais SVG moches |
| V51 | Tentative de raffinement de 3 SVG (clé, livre, verre), pas convaincant |

## DETTE TECHNIQUE MAJEURE

Le code est **un seul fichier de 8000+ lignes**. Tout est dedans : HTML, CSS, JavaScript, contenu narratif, configuration, état, animations. C'est impossible à maintenir au-delà.

### À extraire prioritairement

1. **Le contenu narratif** (tous les textes : Murmures, présentations, voix, indices, observations) → fichiers TypeScript/JSON dédiés
2. **Les structures de données** (`ALL_SEALS`, `SEASON_1_GUESTS`, `GUEST_KEYS`, `ONBOARDING_QUESTIONS`, `QUESTIONS`, etc.) → modules `lib/content/`
3. **Les fonctions de scoring et simulation PNJ** → modules `lib/mechanics/`
4. **Les composants visuels** (cartouche V., bouton next-day, modal d'indice, carte d'invité) → composants React réutilisables
5. **Le state management** (le gros `gameState` actuel) → store Zustand typé
6. **Le CSS** → Tailwind + variables CSS

### À NE PAS extraire / À reprendre tel quel

1. **Le contenu narratif** (textes des Murmures, voix, observations, présentations). Ces textes ont été itérés et validés.
2. **L'animation du rituel d'attribution du Sceau** (V37). À reprendre fidèlement en JS/Framer Motion.
3. **L'enchaînement des scènes** (arrival → onboarding → seuil → rituel → tutorial → hall → ...). La séquence est validée.

## PRIORITÉS DE REFACTOR

Dans l'ordre de criticité :

1. **Mettre en place la stack** (Next.js + TS + Tailwind + Zustand) et **rétablir le flow J1 complet** (jusqu'à la Question)
2. **Implémenter le rituel d'attribution du Sceau** avec Framer Motion (préserver l'animation V37)
3. **Mettre en place le journal automatique** d'indices
4. **Coder l'alternance jours courts/longs** (J2/J4/J6 = court, J3/J5 = long)
5. **Implémenter La Boîte** proprement avec de vraies images générées (Midjourney)
6. **Implémenter les 5 autres épreuves** (Le Mensonge, Le Détail, Le Visage)
7. **Polish visuel** sur toutes les scènes (Hall, pièces, salon, verdict)
8. **Tests end-to-end** d'un Cycle complet
9. (Phase 2) **Backend Supabase** + comptes + multijoueur asynchrone
10. (Phase 2) **Notifications push** + fenêtres temporelles

## ESTIMATIONS

- Refactor Phase 1 (mono-joueur, narratif complet, 6 épreuves, alternance, visuel propre) : **3-6 semaines** de travail focused
- Mise en place backend Phase 2 (Supabase + comptes + sessions partagées) : **2-3 semaines** supplémentaires
- Polish final pour lancement public (notifications, anti-triche, monitoring) : **1-2 semaines**

**Total raisonnable pour une v1 publique** : 8-12 semaines.

## ACCÈS

Le repo GitHub est dans le compte personnel de Steve. Token d'accès à révoquer à la fin du projet (donné dans le proof-of-concept pour faciliter les commits).
