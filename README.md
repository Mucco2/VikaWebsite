# [VIKARBUREAU NAVN] – hjemmeside

Statisk hjemmeside bygget med [Astro](https://astro.build) og [Tailwind CSS](https://tailwindcss.com).

## Kør projektet lokalt

Kræver Node.js 22.22 eller nyere.

```bash
npm install        # installer afhængigheder (første gang)
npm run dev        # udviklingsserver på http://localhost:4321
npm run build      # byg den færdige side til mappen dist/ (tager 1-2 minutter pga. billedoptimering)
npm run preview    # se den byggede side lokalt
npm run check      # tjek for fejl i koden
```

## Sider

| Side | Adresse | Fil |
| --- | --- | --- |
| Forside (med video, film, ydelser, målgrupper, artikler og FAQ) | `/` | `src/pages/index.astro` |
| Ydelser + én side pr. ydelse | `/ydelser`, `/ydelser/<slug>` | `src/pages/ydelser/` |
| Hvem vi hjælper + én side pr. målgruppe | `/kunder`, `/kunder/<slug>` | `src/pages/kunder/` |
| Sådan arbejder vi | `/saadan-arbejder-vi` | `src/pages/saadan-arbejder-vi.astro` |
| Bliv vikar (med video og ansøgningsformular) | `/bliv-vikar` | `src/pages/bliv-vikar.astro` |
| Book en vikar | `/book-vikar` | `src/pages/book-vikar.astro` |
| Viden (artikler) + én side pr. artikel | `/viden`, `/viden/<slug>` | `src/pages/viden/` + `src/content/viden/` |
| Spørgsmål og svar | `/faq` | `src/pages/faq.astro` |
| Om os | `/om-os` | `src/pages/om-os.astro` |
| Kontakt | `/kontakt` | `src/pages/kontakt.astro` |
| Privatlivspolitik | `/privatlivspolitik` | `src/pages/privatlivspolitik.astro` |
| Kvittering og 404 | `/tak`, `/404` | `src/pages/tak.astro`, `src/pages/404.astro` |

## Ret indhold

**Næsten alt rettes ét sted: `src/config/site.ts`**

| Hvad | Hvor i `site.ts` |
| --- | --- |
| Navn, telefon, e-mail, adresse, CVR | `site` |
| Facebook, LinkedIn, Instagram (vises i footeren, når de er udfyldt) | `site.social` |
| Domæne (bruges til sitemap og delingslinks) | `site.url` |
| Ydelser – titel, tekster, punkter, billede, FAQ | `services` (hver ydelse får automatisk sin egen side på `/ydelser/<slug>`) |
| Flere faggrupper (`[ANDRE FAGGRUPPER]`) | Kopiér en blok i `services` og ret den. Med `bookable: true` kommer den med i dropdown'en på "Book en vikar". |
| Målgrupper (daginstitutioner, skoler …) | `customerTypes` (hver får sin egen side på `/kunder/<slug>`) |
| Spørgsmål og svar | `faqs` |
| Videoer | `media` |
| Menu | `nav` |
| Formularer | `forms` (se nedenfor) |

Pladsholdere, der skal udfyldes, står i firkantede parenteser, fx `[TELEFON]` og `[UDDYB HER: …]`.
Søg efter `[` i `src/` for at finde dem alle. Især:

- **Hjælp til lån** – teksterne i `services` i `site.ts`
- **Privatlivspolitik** – `src/pages/privatlivspolitik.astro` (`[ANTAL]`, `[TILPAS]`, `[DATO]`). Skabelonen er ikke juridisk rådgivning, så få den gennemgået.

Farver og skrifttype: `src/styles/global.css` (`brand-600` er primærfarven).

### Billeder

Alle billeder ligger i `src/assets/images/`. Astro laver automatisk små, hurtige udgaver (AVIF/WebP i flere størrelser).

- **Udskift et billede:** læg en ny fil med **samme navn** i mappen (fx `service-paedagoger.jpg`). Liggende format, gerne mindst 2000 px bredt.
- **Husk alt-teksten:** beskrivelsen af billedet står ved siden af billednavnet (`imageAlt` i `site.ts` eller `alt` i sidefilen).
- Billederne er gratis fotos fra Pexels – se `src/assets/images/CREDITS.md`. Brug gerne jeres egne billeder, når I har dem (husk samtykke fra dem, der er med på billedet).

### Videoer

Videoerne ligger i `public/videos/`:

| Fil | Bruges |
| --- | --- |
| `hero.mp4` + `hero.webm` | Lydløs baggrundsvideo øverst på forsiden |
| `film.mp4` + `film.da.vtt` | Filmen med afspil-knap (forsiden, Om os, Sådan arbejder vi) – `.vtt` er undertekster |
| `bliv-vikar.mp4` | Lydløs video øverst på "Bliv vikar" |

Plakatbillederne (vises, før videoen starter) ligger i `src/assets/images/` som `hero-poster.jpg`, `film-poster.jpg` og `bliv-vikar-poster.jpg`.
Udskift en video ved at lægge en ny fil med samme navn. Hold filerne små (helst under 5 MB) – baggrundsvideoer skal være uden lyd.
Baggrundsvideoerne starter ikke, hvis den besøgende har slået "reducér bevægelse" til, og de har altid en pauseknap.

### Artikler (Viden)

Hver artikel er en Markdown-fil i `src/content/viden/`. Filnavnet bliver adressen (`boerneattest.md` → `/viden/boerneattest`).

Ny artikel: kopiér en eksisterende fil, ret teksten og felterne øverst:

```md
---
title: 'Overskrift'
description: 'Kort tekst til oversigten og Google (ca. 150 tegn)'
date: 2026-11-01
audience: institutioner   # eller: vikarer
image: '../../assets/images/mit-billede.jpg'
imageAlt: 'Beskrivelse af billedet'
draft: true               # valgfri – skjuler artiklen, til den er klar
---
```

## Formularer

Der er tre formularer: *Book en vikar*, *Bliv vikar* (med CV-upload) og *Kontakt*. De valideres i browseren med danske fejlbeskeder, og efter indsendelse sendes brugeren til `/tak`.

Vælg udbyder i `forms.provider` i `src/config/site.ts`:

- **`'netlify'`** (standard): virker automatisk, når siden hostes på Netlify. Indsendelser kan ses under *Forms* i Netlify-dashboardet, hvor I også kan slå e-mailnotifikationer til. CV-upload understøttes.
- **`'formspree'`**: opret tre formularer på [formspree.io](https://formspree.io), og indsæt deres URL'er i `forms.formspree`. Virker på alle hosts. Bemærk, at filupload (CV) kræver en betalt Formspree-plan.

## Deploy

Kør `npm run build`. Den færdige side ligger i `dist/` og kan hostes alle steder, der kan servere statiske filer.

- **Netlify:** Forbind jeres Git-repo. `netlify.toml` er allerede sat op (build: `npm run build`, mappe: `dist`).
- **Vercel:** Importér repoet. Astro bliver genkendt automatisk. Husk at bruge Formspree til formularerne.
- **Cloudflare Pages:** Build command `npm run build`, output directory `dist`, og miljøvariablen `NODE_VERSION=22`. Brug Formspree til formularerne.
- **GitHub Pages:** Gå til *Settings → Pages* i repoet, og vælg **Source: GitHub Actions** (ikke "Deploy from a branch"). Så bygger `.github/workflows/deploy.yml` siden ved hvert push til `main`. Siden ligger på `https://<brugernavn>.github.io/<repo>/`, og workflowet sætter selv base-stien. Interne links skal derfor skrives med `withBase('/sti')` fra `site.ts` (links i artikler rettes automatisk). Brug Formspree til formularerne.

Husk at sætte `site.url` til jeres rigtige domæne før deploy.

**Delingsbillede (Open Graph):** Hver side bruger automatisk sit eget billede, beskåret til 1200×630. Sider uden billede bruger `public/og-image.png` – kør `npm run og` for at lave det på ny, når navnet er ændret.

## Teknik i korte træk

- Statisk output, ingen server
- SEO: titel og meta description pr. side, Open Graph med billede pr. side, canonical, `sitemap-index.xml`, `robots.txt` og schema.org-data (`EmploymentAgency`, `Service`, `Article`, `FAQPage`, `BreadcrumbList`)
- Billeder optimeres automatisk (AVIF/WebP, flere størrelser, lazy loading)
- Skrifttypen Manrope, billeder og videoer hostes selv (ingen kald til Google eller YouTube), og der er ingen cookies eller tracking, så der er ikke brug for et cookie-banner. Tilføjer I statistik senere (fx Google Analytics) eller indlejrer YouTube-videoer, skal I også have et cookie-samtykke.
- Tilgængelighed: semantisk HTML, `lang="da"`, "Spring til indhold"-link, labels og fejlbeskeder koblet til alle felter, tastaturvenlige menuer (Esc lukker), alt-tekster, pauseknap på videoer og respekt for "reducér bevægelse"
- Mobil: fast bjælke nederst med "Ring" og "Book vikar"
