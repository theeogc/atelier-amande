# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes

```bash
npm run dev      # Démarrage du serveur de développement (port 3000)
npm run build    # Build de production
npm run lint     # ESLint
npm run start    # Démarrage du serveur de production
```

Pas de tests automatisés dans ce projet. La vérification se fait visuellement via le serveur de dev.

## Architecture

Application Next.js 16 (App Router) — site vitrine monopage pour **L'Atelier d'Amande**, prothésiste ongulaire à Marcellaz, Haute-Savoie. La propriétaire s'appelle **Amanda**.

### Structure de la page

`app/page.tsx` orchestre les sections dans l'ordre :

```
Navigation → Hero → Services → About → Portfolio → Testimonials → Contact → Footer
```

Chaque section est un composant client dans `components/`. Ils sont autonomes : état local, animations propres, pas de state management global.

### Pages supplémentaires

- `app/mentions-legales/page.tsx` — Page mentions légales (serveur, pas de `"use client"`). Tous les champs sont complétés : Mme Goncalves Amanda, SIRET 848 725 909 00024, latelierdamande74@gmail.com, 217 Route de la Vieille Verne, 74250 Marcellaz.
- `app/not-found.tsx` — Page 404 (serveur, metadata + robots noindex). Délègue le rendu à `components/not-found-content.tsx` (client).
- `app/sitemap.ts` — Sitemap XML (homepage + mentions-légales).
- `app/robots.ts` — Robots.txt (allow all, pointeur sitemap).
- `app/opengraph-image.tsx` — OG image 1200×630 générée avec `ImageResponse`. Fond sombre, monogramme "A" italic, nom du salon, localisation, rating texte (pas de caractère ★ — provoque une erreur de chargement de police dans `next/og`).

### Système de design

**Couleurs principales :**
| Token | Valeur | Usage |
|-------|--------|-------|
| Rose gold | `#B08060` / `#C4956A` | Accents, CTA, éléments clés |
| Fond sombre hero | `#1a0f0a` | Hero, témoignages, footer |
| Brun chaud foncé | `#2C1A0E` | Cartes témoignages |
| Nav | `#2C1F1A` | Pill navigation |
| Beige crème | `#F5EFE8` / `#FAF7F3` / `#F5F0EB` | Sections claires, portfolio |
| Brun texte | `#3A2A1E` | Titres sur fond clair |
| Brun muted | `#6B5A4E` | Corps de texte |

**Rythme des sections (fond) :**
`#1a0f0a` (hero) → `#FAF7F3` (services) → `#F5F0EB` (about) → `#FAF7F3` (portfolio) → `#1a0f0a` (testimonials) → `#FAF7F3` (contact) → `#1a0f0a` (footer)

**Polices (chargées dans `app/layout.tsx`) :**
- `--font-playfair` → Playfair Display (titres `font-serif`)
- `--font-cormorant` → Cormorant Garamond (accents italiques rose gold)
- `--font-jost` → Jost (corps de texte `font-sans`)

**Animations :** Framer Motion partout. Pattern standard : `useInView` avec `once: true` pour les entrées au scroll, `useScroll` + `useTransform` pour les effets parallax.

**Règle critique Framer Motion :** Ne jamais utiliser `animate={condition ? { ... } : {}}` — quand `animate` vaut `{}`, Framer Motion revient aux styles CSS natifs et ignore l'état `initial`. Toujours définir les deux états : `animate={condition ? { opacity: 1 } : { opacity: 0 }}`.

### Composants clés

**`components/hero.tsx`** — Section principale full-screen dark.
- Split layout : texte gauche (50%) / photo droite (52%, `position: absolute`)
- `AnimatedWord` : chaque mot entre par le bas (`y: "110%" → 0`)
- Mot cyclique (`WORDS`) via `AnimatePresence mode="sync"` + `useEffect` setTimeout 3s
- `AvatarSilhouette` : SVG silhouette personne (cercle tête + ellipse corps), fond brun — remplace les initiales textuelles
- Stars + "Avis Google" est un lien `<a href="#avis">` cliquable
- Image mobile plein écran (hidden md+) avec overlay `rgba(26,15,10,0.74)` et dégradé bas
- `GlowButton` : bouton combinant deux techniques :
  - **ButtonColorful** : dégradé rose gold flou (`blur(10px)`) dans un wrapper `overflow-hidden`, opacity animée au hover via Framer Motion variants
  - **GlowCard border** : bordure spotlight CSS (`[data-btn]::before/::after`, `background-attachment: fixed`, masque `padding-box/border-box intersect`). Les coordonnées viewport `--mx`/`--my` sont mises à jour par un seul `pointermove` sur `document.documentElement` dans le `useEffect` du composant `Hero`.

**`components/services.tsx`** — Section tarifs.
- `id="services"` + `scroll-mt-24` sur le `<section>` (ancre nav directe, sans HeroScrollAnimation intermédiaire)
- 4 cartes (Gel, Semi-Permanent, Forfaits, Nail Art) + banner infos bas
- Hover : top border reveal rose gold (pas de shimmer)
- Utilise le composant partagé `SectionHeading`

**`components/about.tsx`** — Section "Rencontrez Amanda".
- Layout 3/5 texte + 2/5 photo, grille `lg:grid-cols-5`
- Photo réelle d'Amanda : `public/about-photo.png`
- Shape premium : `border-radius: 1.5rem 4rem 1.5rem 4rem`
- Animation d'entrée photo : **polygon sweep** depuis la droite — `polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)` → `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`, `ease: "circOut"`, durée 1.2s
  - Structure : outer `div` (`overflow-hidden` + `border-radius`) + inner `motion.div` (clip-path) + `motion.img` (Ken Burns `scale: 1.08 → 1`)
- Badges : Diplômée Kittycia, Reconversion passionnée, Toujours en formation
- Utilise le composant partagé `SectionHeading`

**`components/contact.tsx`** — Section "Me Retrouver".
- Layout 2 colonnes : Horaires (gauche) / Me Retrouver (droite)
- Email ajouté : `latelierdamande74@gmail.com` (lien `mailto:`)
- **Carte Leaflet** (package `leaflet` + `@types/leaflet`) initialisée dans un `useEffect` via import dynamique (`import("leaflet")`) pour éviter les erreurs SSR
  - Tuiles CartoDB Positron (fond clair minimaliste)
  - Marker custom rose gold avec animation CSS `pulse` injectée dans le composant
  - Coordonnées : `lat: 46.1502, lng: 6.3563` (217 Route de la Vieille Verne, Marcellaz)
  - CSS Leaflet importé en haut du fichier : `import "leaflet/dist/leaflet.css"`
- Carte flottante (`z-[500]`) en bas à gauche : nom + adresse, `max-w-[calc(100%-80px)]`
- 3 boutons navigation (Google Maps, Plans Apple, Waze) en grille 3 colonnes, fond `bg-white`
- Liens sociaux : WhatsApp, Instagram, Facebook, Email
- Gros bouton Planity CTA en bas
- Utilise le composant partagé `SectionHeading`

**`components/footer.tsx`** — Footer sombre (`#1a0f0a`), structure simplifiée :
- Logo `public/logo-monogramme.png` centré
- Liens de navigation en ligne horizontale (6 ancres — "Accueil" pointe sur `#accueil`)
- Icônes sociales style `border-dotted rounded-xl` (Instagram, Facebook, WhatsApp, **Planity**)
- Icône Planity : composant `PlanityIcon` SVG inline (path "P" extrait du favicon officiel Planity), `fill="currentColor"`
- Pill "Haut de page" avec `window.scroll({ top: 0, behavior: "smooth" })`
- Copyright 2026 + lien vers `/mentions-legales`

**`components/navigation.tsx`** — Nav pill flottante avec comportement scroll.
- Fond `#2C1F1A`, centrée dans un conteneur `flex justify-center` full-width
- **Scroll vers le bas** (>150px) : pill se rétracte à `w-12`, glisse vers la droite via `x: 50vw - 48px` (spring Framer Motion), icône Menu rose gold apparaît
- **Scroll vers le haut** (60px de remontée) : pill revient au centre en pleine largeur. Seuil : `EXPAND_SCROLL_THRESHOLD = 60`
- CTA desktop et mobile : "Réserver ma séance"
- `xOffset` calculé en JS (`window.innerWidth / 2 - 48`) dans un `useEffect` avec resize listener
- Menu mobile (`AnimatePresence`) séparé en élément `fixed` indépendant (`top-[86px]`)

**`components/portfolio.tsx`** — Section galerie.
- 18 vraies photos locales dans `public/portfolio/` (carousel 3D cylindrique sur desktop, deux marquees horizontaux sur mobile), compressées (max 1400px, JPEG). Lightbox au clic.
- L'auto-rotation du carousel est désactivée si `prefers-reduced-motion` (via `useReducedMotion`)
- Le `<section>` utilise `overflow-x-clip` (PAS `overflow-x-hidden` : `hidden` force `overflow-y: auto` et crée une barre de défilement interne à cause du débordement 3D du carousel)

**`components/testimonials.tsx`** — Section avis clients.
- Deux rangées de cartes défilant en sens opposé (marquee CSS pur)
- Animation via `@keyframes marqueeScroll` (`translateX(0) → -50%`) injectée via `<style>`
- 3 avis vrais row 1 (Clara, Delphine, Sab), 4 avis vrais row 2 (Laura, Elena, Paula, Isabelle) — données réelles Google/Planity

**`components/ui/section-heading.tsx`** — Composant partagé d'animation de titre.
- Révèle le children via `clipPath: "inset(0 0 100% 0)"` → `"inset(0 0 0% 0)"` au scroll
- Utilisé dans : Services, About, Contact

**`components/not-found-content.tsx`** — Page 404 client.
- Fond `#1a0f0a`, glow ambiant, accents coins
- "404" en texte outlined (`WebkitTextStroke`) avec glow derrière (`blur(48px)`)
- CTAs : "Retour à l'accueil" (rose gold) + "Prendre rendez-vous" (Planity, outline)

### SEO & Métadonnées (`app/layout.tsx`)

- `metadataBase` : `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.latelierdamande.com'` (domaine réel : **latelierdamande.com**)
- Canonical relatif (`alternates.canonical: './'`) — chaque page obtient son propre canonical
- `<MotionConfig reducedMotion="user">` global via `components/motion-provider.tsx` + règle CSS `prefers-reduced-motion` dans `globals.css`
- Template de titre : `"%s | L'Atelier d'Amande"`
- JSON-LD `BeautySalon` injecté dans `<body>` : adresse complète, horaires split (mardi/jeudi avec coupures), sameAs (Instagram, Facebook, Planity), aggregateRating 5.0/7 avis
- OG image dynamique (`app/opengraph-image.tsx`) : éviter les caractères Unicode spéciaux (★ casse le chargement de police dans `next/og`)

### Assets publics

| Fichier | Usage |
|---------|-------|
| `public/logo-monogramme.png` | Logo rond (nav, footer) |
| `public/logo-texte.png` | Logo texte (nav desktop) |
| `public/about-photo.png` | Photo d'Amanda (section À propos) |
| `public/planity-icon.svg` | SVG Planity (non utilisé directement — voir `PlanityIcon` inline dans footer et testimonials) |
| `public/icon.svg` / `icon-*.png` / `apple-icon.png` | Favicons |

### Liens externes réels

- **Planity** : `https://www.planity.com/latelier-damande-74250-marcellaz`
- **Instagram** : `https://instagram.com/latelierdamande74`
- **Facebook** : `https://www.facebook.com/p/LAtelier-dAmande-61588058220042/`
- **WhatsApp** : `https://wa.me/33669036984`
- **Email** : `latelierdamande74@gmail.com`

### Conventions importantes

- Tout composant qui utilise des hooks React ou Framer Motion doit avoir `"use client"` en première ligne.
- Les images s'utilisent directement via `<img>` (pas `<Image>` de Next.js) car `next.config.mjs` a `images: { unoptimized: true }`. Les assets sont pré-compressés à la main (voir ci-dessous) ; ajouter `loading="lazy" decoding="async"` aux images sous la ligne de flottaison.
- **Compression des assets** : toute nouvelle image doit être redimensionnée (max 1400px, JPEG qualité ~80 via `sips`) avant d'être ajoutée à `public/`. Les PNG sans transparence sont convertis en JPEG.
- Les images locales (ex: `public/about-photo.png`) s'utilisent aussi via `<img>` pour la même raison. Exception : `<Image>` de Next.js est utilisé dans `navigation.tsx` et `not-found-content.tsx` pour les logos (avec `priority`).
- **Glow border buttons** : technique GlowCard — `background-attachment: fixed`, coordonnées viewport `--mx`/`--my` sur `:root`, masque CSS `padding-box/border-box intersect`. Un seul listener `pointermove` sur `document.documentElement`, partagé entre tous les `[data-btn]`.
- La technique de masque CSS pour n'afficher que la bordure : `mask: linear-gradient(transparent, transparent), linear-gradient(white, white); mask-clip: padding-box, border-box; mask-composite: intersect`.
- **Framer Motion + useInView** : toujours fournir les deux états dans `animate` (`{ prop: valeurA }` et `{ prop: valeurB }`), jamais `{}` comme fallback. Règle critique — `{}` fait ignorer `initial` et affiche l'élément immédiatement.
- **clip-path polygon + border-radius** : `clip-path: polygon()` écrase `border-radius` sur le même élément. Pour combiner les deux, utiliser un outer `div` (`overflow-hidden` + `border-radius`) et un inner `motion.div` pour le clip-path.
- **`next/og` (`ImageResponse`)** : pas de support `z-index`, pas de caractères Unicode spéciaux (★, etc.) sans police custom chargée — utiliser du texte plain ou ASCII.

## Ce qui reste à faire (contenu — côté Amanda)

- **Certifications Kittycia** : ajouter badge ou section dédiée si Amanda souhaite valoriser la certification.
- **Marques & produits** : mentionner les marques utilisées (ex. section "About" ou sous les services).
- **Descriptions prestations** : préciser VSP (Vernis Semi-Permanent), gainage, etc. si Amanda veut du contenu éducatif.
- **Coordonnées map** : vérifier que `lat: 46.1502, lng: 6.3563` pointe exactement sur le salon (clic droit Google Maps → "Plus d'infos sur cet endroit" pour affiner).
- **Déploiement Vercel** : définir `NEXT_PUBLIC_SITE_URL=https://www.latelierdamande.com` en variable d'environnement. `@vercel/analytics` est déjà installé et conditionnel en production.
- **Gestionnaire de paquets** : pnpm uniquement (`packageManager` dans `package.json`, `pnpm-lock.yaml`). `pnpm-workspace.yaml` contient `allowBuilds` pour sharp/unrs-resolver (pnpm 11 bloque les scripts de build par défaut).
- **Lint** : `npm run lint` = ESLint 9 flat config (`eslint.config.mjs`, presets `eslint-config-next`). `react/no-unescaped-entities` désactivée (texte français).
