import type {
  AdminOverview,
  CreateLeadPayload,
  CreateLeadResponse,
  HealthResponse,
  HelloResponse,
  Lead,
  LeadStatus,
  PublicShowcaseProject,
  ShowcaseProject,
  UpsertShowcaseProjectPayload,
  UpsertTeamMemberPayload,
  UpsertServiceItemPayload,
  TeamMember,
  ServiceItem,
} from "./types";

export function createApiClient(baseUrl: string) {
  const base = baseUrl.replace(/\/$/, "");

  async function request<T>(
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`${base}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `API request failed: ${res.status}`);
    }
    return res.json() as Promise<T>;
  }

  return {
    async getHealth(): Promise<HealthResponse> {
      const res = await fetch(`${base}/health`);
      if (!res.ok) {
        throw new Error(`API health check failed: ${res.status}`);
      }
      return res.json() as Promise<HealthResponse>;
    },

    async getHello(): Promise<HelloResponse> {
      const res = await fetch(`${base}/`);
      if (!res.ok) {
        throw new Error(`API request failed: ${res.status}`);
      }
      return res.json() as Promise<HelloResponse>;
    },

    createLead(payload: CreateLeadPayload): Promise<CreateLeadResponse> {
      return request<CreateLeadResponse>("/leads", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    getLeads(): Promise<Lead[]> {
      return request<Lead[]>("/leads");
    },

    getLead(id: string): Promise<Lead> {
      return request<Lead>(`/leads/${id}`);
    },

    updateLeadStatus(id: string, status: LeadStatus): Promise<Lead> {
      return request<Lead>(`/leads/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },

    getProjects(): Promise<PublicShowcaseProject[]> {
      return request<PublicShowcaseProject[]>("/projects");
    },

    getProjectBySlug(slug: string): Promise<PublicShowcaseProject> {
      return request<PublicShowcaseProject>(`/projects/${slug}`);
    },

    getAdminOverview(): Promise<AdminOverview> {
      return request<AdminOverview>("/admin/overview");
    },

    getAdminProjects(): Promise<ShowcaseProject[]> {
      return request<ShowcaseProject[]>("/admin/projects");
    },

    getAdminProject(id: string): Promise<ShowcaseProject> {
      return request<ShowcaseProject>(`/admin/projects/${id}`);
    },

    createProject(
      payload: UpsertShowcaseProjectPayload,
    ): Promise<ShowcaseProject> {
      return request<ShowcaseProject>("/admin/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    updateProject(
      id: string,
      payload: Partial<UpsertShowcaseProjectPayload>,
    ): Promise<ShowcaseProject> {
      return request<ShowcaseProject>(`/admin/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },

    deleteProject(id: string): Promise<{ deleted: boolean; id: string }> {
      return request<{ deleted: boolean; id: string }>(
        `/admin/projects/${id}`,
        { method: "DELETE" },
      );
    },

    getAdminTeam(): Promise<TeamMember[]> {
      return request<TeamMember[]>("/admin/team");
    },

    getAdminTeamMember(id: string): Promise<TeamMember> {
      return request<TeamMember>(`/admin/team/${id}`);
    },

    createTeamMember(
      payload: UpsertTeamMemberPayload,
    ): Promise<TeamMember> {
      return request<TeamMember>("/admin/team", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    updateTeamMember(
      id: string,
      payload: Partial<UpsertTeamMemberPayload>,
    ): Promise<TeamMember> {
      return request<TeamMember>(`/admin/team/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },

    deleteTeamMember(id: string): Promise<{ deleted: boolean; id: string }> {
      return request<{ deleted: boolean; id: string }>(`/admin/team/${id}`, {
        method: "DELETE",
      });
    },

    getAdminServices(): Promise<ServiceItem[]> {
      return request<ServiceItem[]>("/admin/services");
    },

    getAdminService(id: string): Promise<ServiceItem> {
      return request<ServiceItem>(`/admin/services/${id}`);
    },

    createServiceItem(
      payload: UpsertServiceItemPayload,
    ): Promise<ServiceItem> {
      return request<ServiceItem>("/admin/services", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },

    updateServiceItem(
      id: string,
      payload: Partial<UpsertServiceItemPayload>,
    ): Promise<ServiceItem> {
      return request<ServiceItem>(`/admin/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },

    deleteServiceItem(id: string): Promise<{ deleted: boolean; id: string }> {
      return request<{ deleted: boolean; id: string }>(
        `/admin/services/${id}`,
        { method: "DELETE" },
      );
    },
  };
}
