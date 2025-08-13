# Kawaii List — TodoList (Vite + TypeScript)

Mini-application “refresher” pour réviser les bases **JS/TS**, **DOM**, **Vite**, et un peu d’**accessibilité** — sans framework.

---

## Objectifs

- Revoir la **boucle d’état** propre : `setTodos → saveData → refresh`.
- Manipuler le **DOM** sans `innerHTML` (sécurité) et avec des **IDs/datasets** clairs.
- Gérer une **persistance locale** simple via `localStorage`.
- Appliquer une **charte CSS** (tokens, responsive, dark mode léger).
- Respecter quelques **bonnes pratiques a11y**.

---

## Fonctionnalités (MVP)

- Ajouter / marquer “fait” / supprimer une tâche
- Filtres : **Toutes**, **En cours**, **Terminées**
- Persistance via `localStorage` (clé : `kawaii.todos`)
- Compteurs globaux (total, terminées)
- État “liste vide”
- UI pastel “kawaii”, responsive, micro-animations

---

## Stack technique

- **Vite** (dev server + build)
- **TypeScript** strict
- **HTML/CSS** natifs (aucune lib UI)
- Aucune dépendance runtime côté client

---

## Architecture

```
.
├─ index.html
├─ src/
│  ├─ main.ts
│  ├─ style.css
│  ├─ services/
│  │  └─ storageService.ts
│  └─ types/
│     └─ todo.types.ts
└─ vite.config.ts / tsconfig.json / package.json
```

- `main.ts` : état + rendu + écouteurs d’événements
- `storageService.ts` : `saveData/getData` (try/catch, clé dédiée)
- `todo.types.ts` : `Todo`, `TODOS`

---

## Démarrage rapide

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production
npm run preview  # prévisualisation du build
```

---

## Scripts NPM (suggestion)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "echo \"(optionnel) ajoutez eslint/prettier\""
  }
}
```

---

## Qualité & Conventions

- `tsconfig.json` recommandé :

  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true
    }
  }
  ```

- Éviter `innerHTML` pour du contenu utilisateur → utiliser `textContent` + nœuds DOM.
- Nommage clair (`updateTodo`, `setTodos`, `filterMode`), petites fonctions pures côté logique.

---

## Accessibilité

- Label **visible pour lecteurs d’écran** (classe utilitaire `.sr-only` plutôt que `hidden`).
- Compteurs avec `aria-live="polite"`.
- Focus visibles (outline) et navigation clavier OK.
- Boutons avec texte explicite (pas uniquement des icônes).

> Exemple de classe utilitaire :

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Sécurité

- Pas d’injection HTML à partir des entrées utilisateur.
- Pas de logique sensible côté client (c’est une démo locale).

---

## État du projet

- **Version** : v0.1 (Refresher MVP)
- **Portée** : exercice de révision — pas destiné à la prod.

---

## Futures versions (roadmap)

- Édition inline d’une tâche (Double-clic, Enter pour valider, Esc pour annuler)
- “Clear completed” avec confirmation + **Undo** (dernier état en mémoire)
- Drag & Drop pour réordonner
- Export / Import JSON
- **Tests unitaires** sur le cœur (add/toggle/remove/filter)
- Thèmes : “Pastel Day / Night Sakura” (toggle)
- i18n (FR/EN) via dictionnaire simple
- Intégration API Node (optionnelle) + proxy Vite

---

## Captures (optionnel)

- `docs/screenshot-light.png`
- `docs/screenshot-dark.png`

_(À ajouter si nécessaire.)_

---

## Changelog

- **v0.1** — MVP : ajout/toggle/suppression, filtres, persistance, compteurs, état vide, styles et dark mode léger.

---

## Licence

MIT — libre pour usage éducatif/démo.

---

## Remarques

Ce dépôt sert de **base d’entraînement**. L’objectif était de **rafraîchir** les réflexes JS/TS/DOM et de garder une structure propre (état centralisé, rendu filtré, stockage isolé) sans framework.
Pour la suite, orientez-vous vers l’une des étapes de la roadmap selon votre temps (30–60 min).
