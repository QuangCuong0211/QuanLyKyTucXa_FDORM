const API_BASE = "http://localhost:3000/api";

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function getAuthHeaders(): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Lỗi kết nối");
  return data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: User }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string, fullName: string) =>
      request<{ token: string; user: User }>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, fullName }),
      }),
    me: () => request<{ user: User }>("/auth/me"),
  },
  areas: {
    list: () => request<Area[]>("/areas"),
    create: (body: { name: string; description?: string }) =>
      request<Area>("/areas", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: { name?: string; description?: string }) =>
      request<Area>(`/areas/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id: string) =>
      request<{ message: string }>(`/areas/${id}`, { method: "DELETE" }),
  },
  rooms: {
    list: (areaId?: string) =>
      request<Room[]>(areaId ? `/rooms?areaId=${areaId}` : "/rooms"),
    create: (body: { areaId: string; name: string; capacity: number }) =>
      request<Room>("/rooms", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: { name?: string; capacity?: number; status?: string }) =>
      request<Room>(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(body) }),
    delete: (id: string) =>
      request<{ message: string }>(`/rooms/${id}`, { method: "DELETE" }),
  },
  registrations: {
    list: () => request<Registration[]>("/registrations"),
    create: (body: RegistrationPayload) =>
      request<Registration>("/registrations", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    updateStatus: (id: string, status: string) =>
      request<Registration>(`/registrations/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
  },
};

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "staff" | "student";
}

export interface Area {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Room {
  id: string;
  areaId: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  status: string;
  createdAt?: string;
}

export interface Registration {
  id: string;
  userId: string;
  status: string;
  fullName: string;
  birthDate: string;
  gender: string;
  cccd: string;
  phone: string;
  email?: string;
  address: string;
  school: string;
  major: string;
  studentId: string;
  areaId?: string;
  roomId?: string;
  roomType: string;
  services: string[];
  emergencyName: string;
  emergencyPhone: string;
  avatar?: string;
  createdAt: string;
}

export type RegistrationPayload = Omit<Registration, "id" | "userId" | "status" | "createdAt"> & {
  areaId?: string;
  roomId?: string;
};
