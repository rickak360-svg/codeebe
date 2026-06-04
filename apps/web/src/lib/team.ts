import type { PublicTeamMember } from "@codeebe/shared";
import { teamMembers as staticTeam } from "@/data/team";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type TeamMember = PublicTeamMember;

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

export async function getTeamMembers(): Promise<TeamMember[]> {
  const fromApi = await fetchFromApi<TeamMember[]>("/team");
  if (fromApi && fromApi.length > 0) return fromApi;
  return staticTeam;
}
