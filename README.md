# Vespera - Prototype HTML

Vous êtes attendu.

## Contenu

- `index.html` — le prototype complet (3 scènes)
- `vespera-arrival.mp4` — la vidéo de la villa au crépuscule
- `vercel.json` — config de cache pour la vidéo

## Déploiement Vercel

```bash
# 1. Init git
git init
git add .
git commit -m "Vespera prototype"

# 2. Pousser sur GitHub
git remote add origin https://github.com/[ton-user]/vespera.git
git push -u origin main

# 3. Sur vercel.com → New Project → Import → Deploy
```

Vercel détecte automatiquement que c'est un site statique. Pas de framework à configurer.

## Test local

```bash
# Avec Python
python3 -m http.server 8000

# Ou avec npx
npx serve .
```

Puis ouvre `http://localhost:8000`.

> ⚠️ Pour voir le mode "Heure" (Question du soir), il faut être entre 20h et 8h.
> Sinon utilise le bouton **JOUR / NUIT** en haut à droite pour basculer manuellement.
