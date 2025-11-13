"use server";

import { getDateRange, validateArticle, formatArticle } from "../utils";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const NEXT_PUBLIC_FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

interface RawNewsArticle {
  id: number;
  headline: string;
  summary: string;
  url: string;
  datetime: number;
  source: string;
  image?: string;
  category?: string;
  related?: string;
}

interface FormattedArticle {
  id: number | string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  datetime: number;
  image: string;
  category: string;
  related: string;
}

async function fetchJSON<T = unknown>(url: string, revalidateSeconds?: number): Promise<T> {
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (revalidateSeconds) {
    options.next = { revalidate: revalidateSeconds };
  } else {
    options.cache = "no-store";
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function getNews(symbols?: string[]): Promise<FormattedArticle[]> {
  try {
    const { from, to } = getDateRange(5);

    if (symbols && symbols.length > 0) {
      const cleanedSymbols = symbols.map(s => s.toUpperCase().trim());
      const articles: FormattedArticle[] = [];
      const maxRounds = 6;

      for (let round = 0; round < maxRounds && articles.length < 6; round++) {
        for (const symbol of cleanedSymbols) {
          if (articles.length >= 6) break;
          try {
            const url = `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${NEXT_PUBLIC_FINNHUB_API_KEY}`;
            const data: RawNewsArticle[] = await fetchJSON(url);
            const validArticles = data.filter(validateArticle);
            if (validArticles.length > 0) {
              const article = validArticles[0];
              articles.push(formatArticle(article, true, symbol, round));
            }
          } catch (err) {
            console.error(`Failed to fetch news for ${symbol}:`, err);
          }
        }
      }

      return articles.sort((a, b) => b.datetime - a.datetime);
    } else {
      const url = `${FINNHUB_BASE_URL}/news?category=general&token=${NEXT_PUBLIC_FINNHUB_API_KEY}`;
      const data: RawNewsArticle[] = await fetchJSON(url);

      const seen = new Set<string>();
      const uniqueArticles = data.filter(article => {
        const key = `${article.id}-${article.url}-${article.headline}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return validateArticle(article);
      });

      return uniqueArticles.slice(0, 6).map((article, index) => formatArticle(article, false, undefined, index));
    }
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw new Error("Failed to fetch news");
  }
}
