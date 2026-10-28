/**
 * ─────────────────────────────────────────────────────────────
 *  AL VIRKSOMHEDSINFO SAMLET ÉT STED
 *  Ret navn, kontaktoplysninger, ydelser og formular-opsætning her.
 *  Alle sider og komponenter henter deres oplysninger fra denne fil.
 * ─────────────────────────────────────────────────────────────
 */
import type { IconName } from '../lib/icons';

export const site = {
  /** Bureauets navn – vises i header, footer, titler og tekster */
  name: '[VIKARBUREAU NAVN]',
  /** Den endelige adresse for hjemmesiden (bruges til sitemap, canonical og Open Graph) */
  url: 'https://www.example.dk',
  /** Standard meta description (bruges hvis en side ikke har sin egen) */
  description:
    'Pædagogiske vikarer til daginstitutioner, skoler, specialskoler, bosteder og kommuner. Screenede vikarer, hurtig hjælp og faste ansigter.',

  phone: '[TELEFON]', // fx '+45 12 34 56 78'
  email: '[EMAIL]', // fx 'kontakt@ditdomaene.dk'
  address: '[ADRESSE]', // fx 'Eksempelvej 1, 8000 Aarhus C'
  cvr: '[CVR]', // fx '12345678'
};

/** Afledte links – skal normalt ikke ændres */
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, '')}`;
export const emailHref = `mailto:${site.email}`;

/**
 * Formularer
 * - 'netlify':   virker automatisk, når siden hostes på Netlify (inkl. CV-upload).
 * - 'formspree': opret formularer på formspree.io og indsæt jeres endpoints nedenfor.
 *                Virker på alle hosts (Vercel, Cloudflare Pages, Netlify m.fl.).
 */
export const forms = {
  provider: 'netlify' as 'netlify' | 'formspree',
  formspree: {
    booking: 'https://formspree.io/f/DIT_FORM_ID',
    application: 'https://formspree.io/f/DIT_FORM_ID',
    contact: 'https://formspree.io/f/DIT_FORM_ID',
  },
  /** Siden brugeren sendes til efter en vellykket indsendelse */
  successPage: '/tak',
};

/** Hvem leverer vi til */
export const customers = ['Daginstitutioner', 'Skoler', 'Specialskoler', 'Bosteder', 'Kommuner'];

export interface Service {
  slug: string;
  title: string;
  icon: IconName;
  /** Kort tekst til kort på forsiden og i oversigter */
  short: string;
  /** Kan ydelsen bookes som vikar? (vises i dropdown på "Book en vikar") */
  bookable: boolean;
  metaDescription: string;
  lead: string;
  body: string[];
  highlights: string[];
  /** Typiske arbejdssteder / målgrupper */
  suitedFor: string[];
}

/**
 * Ydelser – hver ydelse får automatisk sin egen underside på /ydelser/<slug>.
 * Tilføj flere faggrupper ([ANDRE FAGGRUPPER]) ved at kopiere en blok og rette den.
 */
export const services: Service[] = [
  {
    slug: 'paedagoger',
    title: 'Pædagoger',
    icon: 'users',
    bookable: true,
    short:
      'Uddannede pædagoger, der hurtigt finder sig til rette – i vuggestue, børnehave, SFO og fritidstilbud.',
    metaDescription:
      'Book en uddannet pædagog som vikar til vuggestue, børnehave, SFO eller skole. Screenede vikarer med børneattest – til enkeltdage og længere forløb.',
    lead: 'Når en kollega er syg, på kursus eller på barsel, skal hverdagen fortsætte. Vores pædagoger kan træde ind med kort varsel og tage del i jeres pædagogiske arbejde fra første dag.',
    body: [
      'Vi matcher vikaren efter jeres målgruppe, jeres pædagogiske tilgang og de praktiske behov. Har I brug for hjælp i en længere periode, prioriterer vi kontinuitet, så børnene møder et kendt ansigt.',
      'Alle vikarer er personligt interviewet og referencetjekket, og de har en gyldig børneattest, før de kommer ud hos jer.',
    ],
    highlights: [
      'Uddannede pædagoger med relevant erfaring',
      'Enkeltdage, kortere og længere forløb',
      'Mulighed for samme vikar i hele perioden',
      'Børneattest og referencer er tjekket',
    ],
    suitedFor: ['Vuggestuer og børnehaver', 'SFO og fritidshjem', 'Klubber og fritidstilbud', 'Skoler og indskoling'],
  },
  {
    slug: 'specialpaedagoger',
    title: 'Specialpædagoger',
    icon: 'heart',
    bookable: true,
    short: 'Vikarer med specialpædagogisk erfaring til børn, unge og voksne med særlige behov.',
    metaDescription:
      'Specialpædagogiske vikarer til specialskoler, bosteder og særlige dagtilbud. Erfaring med bl.a. autisme, ADHD og udviklingshæmning – med fokus på kontinuitet.',
    lead: 'I det specialpædagogiske arbejde er tryghed og forudsigelighed afgørende. Derfor sender vi vikarer med erfaring fra målgrupper som autisme, ADHD, udviklingshæmning og udadreagerende adfærd.',
    body: [
      'Vi bruger tid på at forstå jeres elever eller borgere, jeres struktur og jeres metoder, før vi foreslår en vikar. Ved længere forløb sørger vi så vidt muligt for, at det er den samme vikar, der kommer.',
      'Vi spørger altid ind til de tilgange, I arbejder med – fx KRAP, Low Arousal eller neuropædagogik – så vikaren kan følge jeres praksis.',
    ],
    highlights: [
      'Erfaring med specialpædagogiske målgrupper',
      'Kendskab til anerkendte metoder og tilgange',
      'Fokus på kontinuitet og faste vikarer',
      'Grundig overlevering før første vagt',
    ],
    suitedFor: ['Specialskoler og specialklasser', 'Bosteder og botilbud', 'Aflastningstilbud', 'Særlige dagtilbud'],
  },
  {
    slug: 'paedagogmedhjaelpere',
    title: 'Pædagogmedhjælpere',
    icon: 'smile',
    bookable: true,
    short: 'Engagerede medhjælpere og pædagogiske assistenter, der giver en ekstra hånd i hverdagen.',
    metaDescription:
      'Vikarer som pædagogmedhjælper og pædagogisk assistent til daginstitutioner, SFO og bosteder. Hjælp ved sygdom, ferie og travle perioder.',
    lead: 'Nogle gange handler det om at få flere voksne på gulvet. Vores pædagogmedhjælpere er stabile, varme og vant til at indgå i et team.',
    body: [
      'Medhjælperne tager del i både de praktiske og de pædagogiske opgaver – fra garderobe og måltider til leg og aktiviteter.',
      'Det kan fx være pædagogiske assistenter (PAU), pædagogstuderende eller erfarne medhjælpere. Alle gennemgår samme screening som vores øvrige vikarer.',
    ],
    highlights: [
      'Pædagogiske assistenter og erfarne medhjælpere',
      'Hjælp ved sygdom, ferie og travle perioder',
      'Korte vagter og hele dage',
      'Samme screening som alle vores vikarer',
    ],
    suitedFor: ['Vuggestuer og børnehaver', 'SFO og fritidstilbud', 'Bosteder', 'Kommunale tilbud'],
  },
  {
    slug: 'hjaelp-til-laan',
    title: 'Hjælp til lån',
    icon: 'clipboard',
    bookable: false,
    short: '[UDDYB HER: kort beskrivelse af ydelsen i én til to sætninger.]',
    metaDescription: '[UDDYB HER: meta description for hjælp til lån – ca. 150 tegn.]',
    lead: '[UDDYB HER: hvad går hjælpen til lån præcist ud på, og hvem er den for?]',
    body: ['[UDDYB HER: beskriv forløbet – hvordan man kommer i gang, og hvad man kan forvente.]'],
    highlights: ['[UDDYB HER: fordel 1]', '[UDDYB HER: fordel 2]', '[UDDYB HER: fordel 3]'],
    suitedFor: ['[UDDYB HER: målgruppe]'],
  },
];

/** Faggrupper i dropdown på "Book en vikar" */
export const bookableRoles = [...services.filter((s) => s.bookable).map((s) => s.title), 'Andet / ved ikke'];

/** Hovedmenu */
export const nav = [
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Bliv vikar', href: '/bliv-vikar' },
  { label: 'Om os', href: '/om-os' },
  { label: 'Kontakt', href: '/kontakt' },
];
