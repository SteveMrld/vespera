# VESPERA — DOSSIER DE PASSATION

## À qui ce dossier est destiné

À l'instance de Claude Code (ou tout autre agent de code autonome) qui va reprendre le projet Vespera, le refactoriser proprement, et l'amener à un niveau de qualité production.

## Ordre de lecture

1. **PITCH_PRODUIT.md** — comprendre ce qu'on construit et pourquoi
2. **REGLES_DE_STYLE.md** — les contraintes non-négociables (visuelles, textuelles, typographiques)
3. **PILOTE_NARRATIF_S1.md** — l'histoire complète du premier Cycle. C'est le contenu narratif validé, à ne pas réécrire
4. **MECANIQUES_DE_JEU.md** — les règles du jeu, le déroulé d'un Cycle, les épreuves, le journal, les profilages
5. **ARCHITECTURE_CIBLE.md** — la stack technique recommandée pour le refactor
6. **ETAT_ACTUEL_ET_BUGS.md** — bilan du code existant : ce qui marche, ce qui coince, ce qu'il faut jeter
7. **BRIEF_POUR_CLAUDE_CODE.md** — le prompt initial à utiliser pour démarrer la mission

## Code existant

Le repo GitHub actuel est : `github.com/SteveMrld/vespera`
Déployé sur : `vespera-peach.vercel.app`

Le code est un **mono-fichier HTML de 8000+ lignes** (HTML + CSS + JS inline). C'est un proof-of-concept fonctionnel mais impossible à maintenir sérieusement. Il sert de **référence narrative et fonctionnelle** mais pas de base de code.

**Recommandation forte** : faire un fork ou une branche `legacy-v51` de l'état actuel pour le geler, puis démarrer un projet propre à zéro à côté.

## Actif le plus précieux

Le **pilote narratif S1** (PILOTE_NARRATIF_S1.md) est le résultat de plusieurs jours d'itération avec le porteur du projet. C'est l'élément à préserver intégralement. Le code se réécrit ; ce contenu, non.

## Posture attendue de Claude Code

- **Auditer avant de refactorer.** Ne pas tout réécrire en aveugle. Lire d'abord, comprendre, puis proposer un plan.
- **Garder le contenu narratif intact.** Pas de réécriture des dialogues, des Murmures, des Questions, des présentations des invités. Ces textes ont été validés et sont la signature du jeu.
- **Pousser la qualité visuelle.** Le proof-of-concept actuel est moche. La cible est *Saltburn / White Lotus / Glass Onion* — premium, contemplatif, méditerranéen.
- **Préparer le multijoueur.** Phase 1 = solo (PNJ simulés). Phase 2 = vraies sessions partagées avec amis (asynchrone-journée + synchrone-soirée 20h-23h). L'architecture doit être prête pour la Phase 2 même si elle n'est pas implémentée tout de suite.
