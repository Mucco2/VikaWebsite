import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'viden'>;

export const audienceLabel: Record<Article['data']['audience'], string> = {
  institutioner: 'For institutioner',
  vikarer: 'For vikarer',
};

/** Alle artikler (uden kladder), nyeste først */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('viden', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const dateFormat = new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric' });
export const formatDate = (date: Date) => dateFormat.format(date);

/** Anslået læsetid i minutter (ca. 200 ord i minuttet) */
export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Artiklens HTML, hvor interne links (fx [kontakt](/kontakt)) får base-stien foran,
 * så de også virker, når siden ligger i en undermappe (GitHub Pages).
 */
export function articleHtml(article: Article): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const html = article.rendered?.html ?? '';
  return base ? html.replace(/href="\/(?!\/)/g, `href="${base}/`) : html;
}
