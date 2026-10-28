# [VIKARBUREAU NAVN] – hjemmeside

Statisk hjemmeside bygget med [Astro](https://astro.build) og [Tailwind CSS](https://tailwindcss.com).

## Kør projektet lokalt

Kræver Node.js 22.22 eller nyere.

```bash
npm install        # installer afhængigheder (første gang)
npm run dev        # udviklingsserver på http://localhost:4321
npm run build      # byg den færdige side til mappen dist/
npm run preview    # se den byggede side lokalt
npm run check      # tjek for fejl i koden
```

## Ret indhold

**Næsten alt rettes ét sted: `src/config/site.ts`**

| Hvad | Hvor i `site.ts` |
| --- | --- |
| Navn, telefon, e-mail, adresse, CVR | `site` |
| Domæne (bruges til sitemap og delingslinks) | `site.url` |
| Ydelser – titel, tekster, punkter | `services` (hver ydelse får automatisk sin egen side på `/ydelser/<slug>`) |
| Flere faggrupper (`[ANDRE FAGGRUPPER]`) | Kopiér en blok i `services` og ret den. Med `bookable: true` kommer den med i dropdown'en på "Book en vikar". |
| Kundetyper | `customers` |
| Menu | `nav` |
| Formularer | `forms` (se nedenfor) |

Pladsholdere, der skal udfyldes, står i firkantede parenteser, fx `[TELEFON]` og `[UDDYB HER: …]`.
Søg efter `[` i `src/` for at finde dem alle. Især:

- **Hjælp til lån** – teksterne i `services` i `site.ts`
- **Privatlivspolitik** – `src/pages/privatlivspolitik.astro` (`[ANTAL]`, `[TILPAS]`, `[DATO]`). Skabelonen er ikke juridisk rådgivning, så få den gennemgået.

Andre tekster:

- Forsiden: `src/pages/index.astro` ("Sådan fungerer det" og "Hvorfor os" ligger øverst i filen)
- Om os, Bliv vikar, Kontakt m.fl.: `src/pages/*.astro`
- Farver og skrifttype: `src/styles/global.css` (`brand-600` er primærfarven)

**Delingsbillede (Open Graph):** Når navnet er ændret, kør `npm run og` for at generere `public/og-image.png` på ny, eller læg jeres eget billede på 1200×630 px samme sted.

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

Husk at sætte `site.url` til jeres rigtige domæne før deploy.

## Teknik i korte træk

- Statisk output, ingen server
- SEO: titel og meta description pr. side, Open Graph, canonical, `sitemap-index.xml`, `robots.txt` og schema.org-data (`EmploymentAgency`)
- Skrifttypen Manrope hostes selv (ingen kald til Google), og der er ingen cookies eller tracking, så der er ikke brug for et cookie-banner. Tilføjer I statistik senere (fx Google Analytics), skal I også have et cookie-samtykke.
- Tilgængelighed: semantisk HTML, `lang="da"`, "Spring til indhold"-link, labels og fejlbeskeder koblet til alle felter, tastaturvenlig mobilmenu (Esc lukker) og respekt for "reducér bevægelse"
