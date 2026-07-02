import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import type { Vendor } from "@/data/vendors";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link
      to="/vendor/$id"
      params={{ id: vendor.id }}
      className="group block rounded-2xl bg-surface border border-border/70 overflow-hidden shadow-soft hover-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
        <img
          src={vendor.image}
          alt={vendor.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {vendor.openNow && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Open now
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {vendor.category}
            </div>
            <h3 className="mt-1 font-display text-lg text-ink leading-tight">
              {vendor.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-sm text-ink shrink-0">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span>{vendor.rating}</span>
          </div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {vendor.tagline}
        </p>
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
          <p>📍 {vendor.city}</p>
          <p>⭐ {vendor.rating}</p>
        </div>
      </div>
    </Link>
  );
}
