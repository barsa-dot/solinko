import { Link } from "@tanstack/react-router";
import { Star, MapPin } from "lucide-react";
import { type Vendor } from "@/data/vendors";

interface SimilarVendorsSectionProps {
  currentVendor: Vendor;
  allVendors: Vendor[];
}

export function SimilarVendorsSection({ currentVendor, allVendors }: SimilarVendorsSectionProps) {
  // Filter for matching category, excluding the active vendor profile item
  const recommendations = allVendors
    .filter((v) => v.category === currentVendor.category && v.id !== currentVendor.id)
    .slice(0, 3); // Cap at 3 recommendations

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-border/60">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Similar Vendors You Might Need
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {recommendations.map((vendor) => (
          <Link
            key={vendor.id}
            to="/vendor/$id"
            params={{ id: vendor.id.toString() }}
            className="group block rounded-2xl border border-border bg-surface overflow-hidden shadow-soft hover:shadow-medium transition-all"
          >
            {/* Card Banner Thumbnail */}
            <div className="h-32 w-full overflow-hidden bg-subtle relative">
              <img 
                src={vendor.banner} 
                alt={vendor.name} 
                className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-surface/95 backdrop-blur-sm border border-border px-2 py-0.5 rounded-lg flex items-center gap-1 text-xs font-semibold text-ink">
                <Star className="h-3 w-3 fill-accent text-accent" />
                {vendor.rating}
              </div>
            </div>

            {/* Card Content Brief */}
            <div className="p-4">
              <h4 className="font-display font-semibold text-ink group-hover:text-ink/80 transition-colors text-base truncate">
                {vendor.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{vendor.tagline}</p>
              
              <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {vendor.area}
                </span>
                <span className="font-medium text-ink/80">{vendor.distanceKm} km away</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}