export const categories = [
  "Electrical",
  "Plumbing",
  "Solar",
  "Paint",
  "Interior",
  "Civil",
  "Hardware",
  "Street Food",
  "Local Shops",
  "Beauty",
  "Repair",
] as const;

export type VendorCategory = (typeof categories)[number];

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory | string;
  rating: number;
  city: string;
  location?: string;
  tagline: string;
  description?: string;
  image?: string;
  banner?: string;
  openNow?: boolean;
  area?: string;
  distanceKm?: number;
  hours?: string;
  reviewCount?: number;
  verified?: boolean;
  services?: string[];
  jobsCompleted?: number;
  gallery?: string[];
  items?: Array<string | { name?: string }>;
  reviews?: unknown[];
  phone?: string;
}
