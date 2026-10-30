/**
 * ─────────────────────────────────────────────────────────────
 *  AL VIRKSOMHEDSINFO SAMLET ÉT STED
 *  Ret navn, kontaktoplysninger, ydelser, kundetyper, FAQ og
 *  formular-opsætning her. Alle sider og komponenter henter deres
 *  oplysninger fra denne fil.
 *
 *  Billeder: navnene (fx 'service-paedagoger') henviser til filer i
 *  src/assets/images/ (fx service-paedagoger.jpg). Læg et nyt billede
 *  med samme navn ind for at udskifte det.
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

  /** Sociale medier – udfyld en adresse, så vises ikonet i footeren. Tomme felter vises ikke. */
  social: {
    facebook: '',
    linkedin: '',
    instagram: '',
  },
};

/** Afledte links – skal normalt ikke ændres */
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, '')}`;
export const emailHref = `mailto:${site.email}`;

/**
 * Sætter base-stien foran interne links, fx withBase('/kontakt').
 * Nødvendigt på GitHub Pages, hvor siden ligger i en undermappe (/VikaWebsite).
 * På eget domæne er base-stien tom, og linket er uændret.
 */
export const withBase = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

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

/**
 * Videoer – filerne ligger i public/videos/.
 * Plakatbillederne (vises før videoen starter) ligger i src/assets/images/.
 */
export const media = {
  heroVideo: 'hero', // public/videos/hero.mp4 (+ hero.webm)
  heroPoster: 'hero-poster',
  film: 'film', // public/videos/film.mp4 (+ film.da.vtt med undertekster)
  filmPoster: 'film-poster',
  filmTitle: 'Sådan hjælper vi, når en kollega mangler',
  filmDuration: '0:39',
  filmDescription:
    'En kort film om, hvordan vi finder trygge og kompetente vikarer til daginstitutioner, skoler og specialområdet.',
  recruitVideo: 'bliv-vikar', // public/videos/bliv-vikar.mp4
  recruitPoster: 'bliv-vikar-poster',
};

export interface Faq {
  q: string;
  a: string;
}

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
  /** Billede i src/assets/images/ (uden filendelse) */
  image: string;
  imageAlt: string;
  /** Spørgsmål og svar, der vises på ydelsens egen side */
  faq: Faq[];
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
      'Vores pædagoger er vant til at komme ind i nye huse. De spørger ind til jeres dagsrytme, jeres aftaler og de børn, der har brug for lidt ekstra – og de tager ansvar for både de planlagte aktiviteter og de små øjeblikke ind imellem.',
    ],
    highlights: [
      'Uddannede pædagoger med relevant erfaring',
      'Enkeltdage, kortere og længere forløb',
      'Mulighed for samme vikar i hele perioden',
      'Børneattest og referencer er tjekket',
    ],
    suitedFor: ['Vuggestuer og børnehaver', 'SFO og fritidshjem', 'Klubber og fritidstilbud', 'Skoler og indskoling'],
    image: 'service-paedagoger',
    imageAlt: 'Pædagog, der læser højt af en billedbog for en gruppe børn på et tæppe',
    faq: [
      {
        q: 'Kan vi få en pædagog allerede i morgen?',
        a: 'Ofte ja. Ring til os så tidligt som muligt, så gør vi alt, hvad vi kan, for at finde en pædagog, der kan møde ind til aftalt tid.',
      },
      {
        q: 'Kan vikaren stå for planlagte aktiviteter?',
        a: 'Ja. Fortæl os om jeres planer, når I booker, så giver vi det videre. Vores pædagoger er vant til at tage ansvar for både aktiviteter, samling og forældrekontakt.',
      },
      {
        q: 'Kan vi få den samme pædagog flere gange?',
        a: 'Ja, så vidt det er muligt. Mange institutioner har faste vikarer hos os, som kender børnene og huset.',
      },
    ],
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
      'En god overlevering er særlig vigtig her. Vi hjælper gerne med at sætte en kort introduktion op, så vikaren kender dagens struktur, de vigtigste aftaler og de signaler, der er værd at holde øje med.',
    ],
    highlights: [
      'Erfaring med specialpædagogiske målgrupper',
      'Kendskab til anerkendte metoder og tilgange',
      'Fokus på kontinuitet og faste vikarer',
      'Grundig overlevering før første vagt',
    ],
    suitedFor: ['Specialskoler og specialklasser', 'Bosteder og botilbud', 'Aflastningstilbud', 'Særlige dagtilbud'],
    image: 'service-specialpaedagoger',
    imageAlt: 'Voksen og barn, der i ro og fordybelse lægger puslespil sammen ved et træbord',
    faq: [
      {
        q: 'Har vikarerne erfaring med vores målgruppe?',
        a: 'Vi matcher altid på erfaring. Fortæl os om jeres elever eller borgere, så foreslår vi en vikar, der har arbejdet med lignende målgrupper.',
      },
      {
        q: 'Hvordan sikrer I en god overlevering?',
        a: 'Vi aftaler med jer, hvad vikaren skal vide før første vagt – fx dagsstruktur, særlige hensyn og jeres metoder. Ved længere forløb anbefaler vi en kort introduktion på stedet.',
      },
      {
        q: 'Kan vi få en fast vikar i en længere periode?',
        a: 'Ja. Kontinuitet er ekstra vigtigt i specialområdet, så ved længere behov prioriterer vi, at det er den samme vikar, der kommer.',
      },
    ],
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
      'En medhjælper er ofte den hurtigste og mest fleksible løsning, når I har brug for en ekstra voksen i en travl periode – fx i indkøringen, på udflugter eller når mange er på ferie.',
    ],
    highlights: [
      'Pædagogiske assistenter og erfarne medhjælpere',
      'Hjælp ved sygdom, ferie og travle perioder',
      'Korte vagter og hele dage',
      'Samme screening som alle vores vikarer',
    ],
    suitedFor: ['Vuggestuer og børnehaver', 'SFO og fritidstilbud', 'Bosteder', 'Kommunale tilbud'],
    image: 'service-paedagogmedhjaelpere',
    imageAlt: 'Voksen, der binder snørebånd for et lille barn på en solrig græsplæne',
    faq: [
      {
        q: 'Hvad er forskellen på en pædagog og en pædagogmedhjælper?',
        a: 'En pædagog har en pædagoguddannelse. En pædagogmedhjælper kan være pædagogisk assistent, studerende eller have erfaring uden uddannelse. Vi hjælper jer gerne med at vurdere, hvad der passer til jeres behov.',
      },
      {
        q: 'Kan vi booke en medhjælper til få timer?',
        a: 'Ja. Vi kan levere til korte vagter, hele dage og længere perioder. Fortæl os, hvad I har brug for.',
      },
    ],
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
    image: 'service-hjaelp-til-laan',
    imageAlt: 'To kvinder i en rolig samtale ved et bord med kaffe og papirer',
    faq: [],
  },
];

/** Faggrupper i dropdown på "Book en vikar" */
export const bookableRoles = [...services.filter((s) => s.bookable).map((s) => s.title), 'Andet / ved ikke'];

export interface CustomerType {
  slug: string;
  title: string;
  icon: IconName;
  short: string;
  metaDescription: string;
  lead: string;
  body: string[];
  /** Typiske situationer, hvor kunden har brug for os */
  needs: string[];
  /** Hvilke ydelser (slugs) passer typisk til kunden */
  services: string[];
  image: string;
  imageAlt: string;
  faq: Faq[];
}

/** Hvem leverer vi til – hver kundetype får sin egen side på /kunder/<slug> */
export const customerTypes: CustomerType[] = [
  {
    slug: 'daginstitutioner',
    title: 'Daginstitutioner',
    icon: 'baby',
    short: 'Vuggestuer, børnehaver og integrerede institutioner, hvor tryghed og nærvær er alt.',
    metaDescription:
      'Vikarer til vuggestuer, børnehaver og integrerede institutioner. Uddannede pædagoger og medhjælpere med børneattest – ved sygdom, ferie og barsel.',
    lead: 'I en daginstitution mærker børnene det med det samme, når en voksen mangler. Vi sender vikarer, der hurtigt finder sig til rette i jeres rytme – fra morgenmodtagelse til eftermiddagsleg.',
    body: [
      'De mindste børn har brug for genkendelighed. Derfor forsøger vi altid at sende vikarer, der har været hos jer før, og ved længere forløb prioriterer vi, at det er den samme voksen, der kommer hver dag.',
      'Vores vikarer kender hverdagen i en daginstitution: aflevering, måltider, puslerum, lur, leg ude og inde og en god snak med forældrene ved afhentning. De tager del i det hele – ikke kun det, der står på vagtplanen.',
    ],
    needs: [
      'Sygdom og akut fravær – også samme morgen',
      'Ferie, kurser og personaledage',
      'Barsel og længere orlov',
      'Ekstra hænder i indkøring og travle perioder',
    ],
    services: ['paedagoger', 'paedagogmedhjaelpere'],
    image: 'kunder-daginstitutioner',
    imageAlt: 'Pædagog og børn, der leger med farverige træklodser på et tæppe i en lys stue',
    faq: [
      {
        q: 'Kan vikaren tage del i aflevering og forældrekontakt?',
        a: 'Ja. Vores vikarer er vant til at tage imod børn og forældre og give en god overlevering ved afhentning. Fortæl os, hvis der er særlige aftaler, vi skal give videre.',
      },
      {
        q: 'Hvad hvis vi mangler en voksen allerede i dag?',
        a: 'Ring til os. Når I ringer tidligt, kan vi ofte finde en vikar, der kan møde ind samme dag.',
      },
    ],
  },
  {
    slug: 'skoler',
    title: 'Skoler',
    icon: 'graduationCap',
    short: 'Pædagogisk personale til indskoling, SFO og fritidsdel – og støtte i klasserne.',
    metaDescription:
      'Pædagogiske vikarer til folkeskoler, SFO og fritidshjem. Hjælp i indskolingen, i klassen og i fritidsdelen – ved sygdom, kurser og travle perioder.',
    lead: 'En skoledag har mange skift – fra undervisning til frikvarter og SFO. Vi sender pædagogisk personale, der kan træde ind, hvor I har brug for det, og som hurtigt får overblik over eleverne.',
    body: [
      'Vores vikarer kan understøtte undervisningen i indskolingen, hjælpe enkeltelever, tage del i frikvarterer og stå for aktiviteter i SFO og fritidsdel.',
      'Vi spørger ind til jeres klasser, skemaer og aftaler, så vikaren ved, hvor og hvornår der skal være en ekstra voksen. Har I brug for hjælp i en længere periode, sørger vi for så stor kontinuitet som muligt.',
    ],
    needs: [
      'Pædagogisk personale i indskolingen',
      'Vikarer i SFO og fritidsdel',
      'Støtte til enkeltelever og mindre grupper',
      'Dækning ved sygdom, kurser og lejrskole',
    ],
    services: ['paedagoger', 'paedagogmedhjaelpere', 'specialpaedagoger'],
    image: 'kunder-skoler',
    imageAlt: 'Lærer, der hjælper to elever, som skriver i deres hæfter',
    faq: [
      {
        q: 'Leverer I også lærervikarer?',
        a: 'Vores fokus er pædagogisk personale. Har I brug for en lærervikar, så kontakt os alligevel – så finder vi ud af, om vi kan hjælpe.',
      },
      {
        q: 'Kan vikaren både være i klassen og i SFO samme dag?',
        a: 'Ja. Fortæl os, hvordan dagen ser ud, så finder vi en vikar, der er tryg ved både undervisningsdelen og fritidsdelen.',
      },
    ],
  },
  {
    slug: 'specialskoler',
    title: 'Specialskoler',
    icon: 'puzzle',
    short: 'Erfarne vikarer til specialskoler, specialklasser og dagbehandling – med fokus på kontinuitet.',
    metaDescription:
      'Specialpædagogiske vikarer til specialskoler, specialklasser og dagbehandlingstilbud. Erfaring med autisme, ADHD og komplekse behov – og fokus på faste vikarer.',
    lead: 'På en specialskole kan en ukendt voksen være en stor forandring for eleverne. Derfor lægger vi vægt på erfaring, en grundig overlevering og så få nye ansigter som muligt.',
    body: [
      'Vi matcher på målgruppe, metode og personlighed. En vikar, der skal arbejde med elever med autisme, har brug for andre kompetencer end en vikar i et dagbehandlingstilbud – og det tager vi højde for.',
      'Vi anbefaler, at I har nogle faste vikarer tilknyttet, som kender eleverne. Så er der altid et kendt ansigt klar, når behovet opstår.',
    ],
    needs: [
      'Vikarer med erfaring fra målgruppen',
      'Faste vikarer, der kan følge eleverne over tid',
      'Støtte til enkeltelever med særlige behov',
      'Dækning ved sygdom, efteruddannelse og ferie',
    ],
    services: ['specialpaedagoger', 'paedagoger'],
    image: 'kunder-specialskoler',
    imageAlt: 'Børnehænder, der lægger farvede træbrikker i et puslespil',
    faq: [
      {
        q: 'Kan vi møde vikaren før første vagt?',
        a: 'Ja, ved længere forløb anbefaler vi det. Et kort møde eller en rundvisning gør starten tryggere for både elever og vikar.',
      },
      {
        q: 'Hvordan håndterer I konfliktsituationer?',
        a: 'Vi matcher vikarer med erfaring i konfliktnedtrapning til de tilbud, der har brug for det, og vi sørger for, at vikaren kender jeres egne retningslinjer.',
      },
    ],
  },
  {
    slug: 'bosteder',
    title: 'Bosteder',
    icon: 'home',
    short: 'Vikarer til botilbud, opholdssteder og aflastning – til vagter, der passer ind i jeres plan.',
    metaDescription:
      'Pædagogiske vikarer til bosteder, botilbud, opholdssteder og aflastning. Erfarne vikarer, der kan indgå i jeres vagtplan og skabe ro for beboerne.',
    lead: 'På et bosted er hverdagen også beboernes hjem. Vi sender vikarer, der møder beboerne med respekt og ro, og som kan indgå i jeres vagtplan uden at skabe uro.',
    body: [
      'Vores vikarer har erfaring fra både børne-, unge- og voksenområdet og fra målgrupper med fx udviklingshæmning, autisme og psykiske vanskeligheder.',
      'Vi aftaler vagter, der passer til jeres plan, og vi sørger for, at vikaren kender husets aftaler, beboernes rutiner og jeres dokumentationspraksis.',
    ],
    needs: [
      'Vagter, der passer ind i jeres vagtplan',
      'Vikarer med erfaring fra målgruppen',
      'Dækning ved sygdom, ferie og længere fravær',
      'Faste vikarer, som beboerne kender',
    ],
    services: ['specialpaedagoger', 'paedagogmedhjaelpere', 'paedagoger'],
    image: 'kunder-bosteder',
    imageAlt: 'Medarbejder og beboer, der spiser morgenmad sammen i hjemlige omgivelser',
    faq: [
      {
        q: 'Kan I dække vagter uden for almindelig arbejdstid?',
        a: 'Fortæl os, hvilke vagter I har brug for at få dækket, så finder vi ud af, hvad vi kan tilbyde – også ved aften- og weekendvagter.',
      },
      {
        q: 'Kender vikarerne til dokumentation?',
        a: 'Mange af vores vikarer har erfaring med dokumentation fra lignende tilbud. Vi aftaler altid med jer, hvad vikaren skal stå for.',
      },
    ],
  },
  {
    slug: 'kommuner',
    title: 'Kommuner',
    icon: 'landmark',
    short: 'Én samarbejdspartner på tværs af dagtilbud, skoler og specialområdet.',
    metaDescription:
      'Vikarbureau for kommuner: pædagogiske vikarer til dagtilbud, skoler og specialområdet. Én fast kontakt og mulighed for faste samarbejdsaftaler.',
    lead: 'Som kommune har I mange tilbud med forskellige behov. Vi kan være én fast samarbejdspartner, der kender jeres institutioner og hjælper på tværs af dagtilbud, skoler og specialområdet.',
    body: [
      'Med en fast aftale ved jeres institutioner præcis, hvem de skal ringe til, og hvad de kan forvente. Vi lærer de enkelte steder at kende, så vi kan sende vikarer, der passer ind.',
      'Kontakt os for at høre, hvordan et samarbejde kan se ud for jeres kommune – uanset om det gælder enkelte tilbud eller hele områder.',
    ],
    needs: [
      'Hjælp på tværs af dagtilbud, skoler og specialområdet',
      'Én fast kontaktperson hos os',
      'Mulighed for faste samarbejdsaftaler',
      'Hurtig dækning ved akut fravær',
    ],
    services: ['paedagoger', 'specialpaedagoger', 'paedagogmedhjaelpere'],
    image: 'kunder-kommuner',
    imageAlt: 'Fagpersoner til møde omkring et bord i et lyst, moderne kontor',
    faq: [
      {
        q: 'Kan vi indgå en fast samarbejdsaftale?',
        a: 'Ja. Kontakt os, så taler vi om jeres behov og finder en model, der passer til jeres institutioner.',
      },
      {
        q: 'Kan den enkelte institution selv booke?',
        a: 'Ja. Med en fast aftale kan hver institution ringe eller booke direkte, mens I bevarer overblikket.',
      },
    ],
  },
];

/** Kundetyper som en simpel liste (bruges i tekster og chips) */
export const customers = customerTypes.map((c) => c.title);

/** Spørgsmål og svar – vises på /faq, forsiden og bliv vikar-siden */
export const faqs: { institutioner: Faq[]; vikarer: Faq[] } = {
  institutioner: [
    {
      q: 'Hvor hurtigt kan I skaffe en vikar?',
      a: 'Ofte samme dag. Ring så tidligt som muligt ved akut behov – så gør vi alt, hvad vi kan, for at finde en vikar, der kan møde ind til aftalt tid. Ved længere forløb aftaler vi opstarten med jer.',
    },
    {
      q: 'Hvad koster en vikar?',
      a: 'Prisen afhænger af faggruppe, tidspunkt og varighed. Kontakt os for et uforpligtende tilbud, så får I en klar pris, før I beslutter jer.',
    },
    {
      q: 'Hvordan er vikarerne screenet?',
      a: 'Alle vikarer har været til en personlig samtale hos os, vi har talt med deres referencer, og vi har indhentet børneattest på alle, der arbejder med børn og unge.',
    },
    {
      q: 'Kan vi få den samme vikar igen?',
      a: 'Ja, så vidt det er muligt. Ved længere forløb prioriterer vi, at det er den samme vikar, der kommer – og mange institutioner har faste vikarer hos os.',
    },
    {
      q: 'Hvad sker der, hvis vikaren ikke passer til os?',
      a: 'Så vil vi gerne vide det med det samme. Vi tager en snak om, hvad der skal til, og finder en anden løsning, hvis det er nødvendigt.',
    },
    {
      q: 'Kan vi lave en fast aftale?',
      a: 'Ja. Vi indgår gerne faste aftaler med institutioner og kommuner, så I ved, hvem I skal ringe til, og hvad I kan forvente.',
    },
  ],
  vikarer: [
    {
      q: 'Skal jeg være uddannet pædagog for at blive vikar?',
      a: 'Nej. Vi søger både pædagoger, specialpædagoger, pædagogiske assistenter, studerende og medhjælpere med relevant erfaring.',
    },
    {
      q: 'Hvor meget skal jeg arbejde?',
      a: 'Det bestemmer du selv. Du fortæller os, hvornår du kan arbejde, og så tilbyder vi dig vagter, der passer ind. Du kan altid sige nej tak.',
    },
    {
      q: 'Hvordan får jeg tilbudt vagter?',
      a: 'Vi kontakter dig på telefon eller sms, når vi har en vagt, der passer til dig. Ønsker du et længere vikariat, finder vi også gerne det.',
    },
    {
      q: 'Hvad med løn?',
      a: 'Lønnen afhænger af din uddannelse og erfaring. Vi gennemgår løn og vilkår med dig til samtalen, så du ved præcis, hvad du kan forvente.',
    },
    {
      q: 'Skal jeg have en børneattest?',
      a: 'Ja, hvis du skal arbejde med børn og unge. Vi indhenter den sammen med dig – det kræver blot dit samtykke med MitID.',
    },
    {
      q: 'Kan jeg være vikar ved siden af mit studie?',
      a: 'Ja. Mange af vores vikarer studerer. Du melder bare ind, hvornår du har tid, og så finder vi vagter, der passer til dit skema.',
    },
  ],
};

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; text?: string; icon?: IconName }[];
}

/** Hovedmenu */
export const nav: NavItem[] = [
  {
    label: 'Ydelser',
    href: '/ydelser',
    children: services.map((s) => ({ label: s.title, href: `/ydelser/${s.slug}`, icon: s.icon })),
  },
  {
    label: 'Hvem vi hjælper',
    href: '/kunder',
    children: customerTypes.map((c) => ({ label: c.title, href: `/kunder/${c.slug}`, icon: c.icon })),
  },
  { label: 'Bliv vikar', href: '/bliv-vikar' },
  { label: 'Viden', href: '/viden' },
  {
    label: 'Om os',
    href: '/om-os',
    children: [
      { label: 'Om os', href: '/om-os', icon: 'heart' },
      { label: 'Sådan arbejder vi', href: '/saadan-arbejder-vi', icon: 'compass' },
      { label: 'Spørgsmål og svar', href: '/faq', icon: 'message' },
    ],
  },
  { label: 'Kontakt', href: '/kontakt' },
];
