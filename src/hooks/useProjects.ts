import { projects as localProjects } from "@/data/data";
import type { Project } from "@/types/index";

// Re-export Project type from lib/data
export type { Project };

export interface UseProjectsReturn {
  projects: Project[];
}

/**
 * Custom hook to fetch projects from the local data.
 */
export function useProjects(): UseProjectsReturn {
  return {
    projects: localProjects,
  };
}

/**
 * Custom hook to fetch a single project by ID from the local data.
 */
export function useProject(projectId: string) {
  const project = localProjects.find((p) => p.id === projectId) ?? null;

  return {
    project,
  };
}

/**
 * Custom hook to fetch projects by category from the local data.
 */
export function useProjectsByCategory(
  category: string,
  subcategory?: string,
): UseProjectsReturn {
  let filtered = localProjects as Project[];

  if (category && category !== "All") {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (subcategory) {
    filtered = filtered.filter((p) => p.subcategory === subcategory);
  }

  return {
    projects: filtered,
  };
}
