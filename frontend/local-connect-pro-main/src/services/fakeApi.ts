/**
 * API service layer (frontend-only stub).
 * Wire real endpoints here when backend lands; UI imports from this module
 * so swapping to axios/fetch is a one-file change.
 */
import type { Vendor, VendorCategory } from "@/data/vendors";

export const apiBaseUrl = "http://localhost:3000";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${apiBaseUrl}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} failed`);
  return res.json() as Promise<T>;
}

// Vendor API endpoints
export async function fetchVendors(): Promise<Vendor[]> {
  return apiGet<Vendor[]>("/vendors");
}

export async function fetchVendor(id: string): Promise<Vendor> {
  return apiGet<Vendor>(`/vendors/${id}`);
}

export async function fetchCategories(): Promise<VendorCategory[]> {
  return apiGet<VendorCategory[]>("/vendors/categories");
}

// Dashboard API endpoints
export interface DashboardOrder {
  id: string;
  customer: string;
  item: string;
  time: string;
  status: "Preparing" | "Ready" | "Delivered";
}

export async function fetchDashboardOrders(): Promise<DashboardOrder[]> {
  return apiGet<DashboardOrder[]>("/dashboard/orders");
}

export async function fetchDashboardStats(): Promise<{
  earnings: number;
  ordersCount: number;
  ordersInProgress: number;
  newCustomers: number;
  payoutStatus: string;
  lastPayout: number;
  dailyOrders: number[];
}> {
  return apiGet("/dashboard/stats");
}

export async function searchVendors(name: string) {
  return apiGet(`/vendors/search?name=${encodeURIComponent(name)}`);
}

export async function filterVendors(
  city?: string,
  rating?: number
) {
  const params = new URLSearchParams();

  if (city) params.append("city", city);

  if (rating) params.append("rating", rating.toString());

  return apiGet(`/vendors/filter?${params.toString()}`);
}
