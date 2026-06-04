import type { PublicServicesResponse } from "@codeebe/shared";
import { howWeHelp, trustBadges } from "@/data/services";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const staticServices: PublicServicesResponse = {
  cards: howWeHelp.map((item) => ({
    title: item.title,
    description: item.description,
  })),
  badges: [...trustBadges],
};

async function fetchFromApi<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getServices(): Promise<PublicServicesResponse> {
  const fromApi = await fetchFromApi<PublicServicesResponse>("/services");
  if (
    fromApi &&
    (fromApi.cards.length > 0 || fromApi.badges.length > 0)
  ) {
    return fromApi;
  }
  return staticServices;
}
