import type { PublicShowcaseProject } from "@codeebe/shared";
import {
  getAllProjectSlugs as staticSlugs,
  getProjectBySlug as getStaticProject,
  projects as staticProjects,
} from "@/data/projects";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export type Project = PublicShowcaseProject;

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

export async function getProjects(): Promise<Project[]> {
  const fromApi = await fetchFromApi<Project[]>("/projects");
  if (fromApi && fromApi.length > 0) return fromApi;
  return staticProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const fromApi = await fetchFromApi<Project>(`/projects/${slug}`);
  if (fromApi) return fromApi;
  return getStaticProject(slug);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getProjects();
  if (projects.length > 0) return projects.map((p) => p.slug);
  return staticSlugs();
}
