export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string;
  source?: string;
}

export interface Lead extends LeadInput {
  id: string;
  status: "new" | "contacted" | "quoted" | "booked" | "closed";
  createdAt: string;
  updatedAt: string;
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error || "Request failed.");
  return payload as T;
}

export const leadApi = {
  create: (lead: LeadInput) => request<{ id: string; createdAt: string }>("/api/leads", { method: "POST", body: JSON.stringify(lead) }),
  session: () => request<{ authenticated: boolean }>("/api/admin/session"),
  login: (email: string, password: string) => request<{ authenticated: boolean }>("/api/admin/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  logout: () => request<{ authenticated: boolean }>("/api/admin/logout", { method: "POST" }),
  list: () => request<Lead[]>("/api/admin/leads"),
  updateStatus: (id: string, status: Lead["status"]) => request<Lead>(`/api/admin/leads/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) }),
};

