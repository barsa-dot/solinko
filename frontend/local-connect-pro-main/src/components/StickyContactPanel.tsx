import { Phone, MessageSquare, Share2, Bookmark, FileText } from "lucide-react";
import { type Vendor } from "@/data/vendors";

interface StickyContactPanelProps {
  vendor: Vendor;
  isService: boolean;
}

export function StickyContactPanel({ vendor, isService }: StickyContactPanelProps) {
  return (
    <aside className="md:sticky md:top-24 h-fit space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft space-y-4">
        {/* Status indicator header */}
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {vendor.openNow ? "Open now" : "Closed"}
          </div>
          <div className="mt-1 font-display text-lg text-ink">{vendor.hours}</div>
        </div>

        {/* Primary Action Button */}
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-ink/90 transition-colors shadow-sm">
          <FileText className="h-4 w-4" />
          Request Quote
        </button>

        {/* Core Communication Row */}
        <div className="grid grid-cols-2 gap-2.5">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:bg-subtle transition-colors">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Call
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink hover:bg-subtle transition-colors">
            <MessageSquare className="h-4 w-4 text-emerald-600" />
            WhatsApp
          </button>
        </div>

        {/* Utility Actions Row */}
        <div className="grid grid-cols-2 gap-2.5 pt-1 border-t border-border/60">
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-subtle px-4 py-2.5 text-xs font-medium text-ink hover:bg-muted/50 transition-colors">
            <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
            Share
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-subtle px-4 py-2.5 text-xs font-medium text-ink hover:bg-muted/50 transition-colors">
            <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
            Save
          </button>
        </div>
      </div>

      {/* Static Location Card */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Location</div>
        <div className="mt-1 text-ink font-medium">{vendor.area}</div>
        <div className="text-sm text-muted-foreground mt-0.5">{vendor.distanceKm} km from you</div>
      </div>
    </aside>
  );
}