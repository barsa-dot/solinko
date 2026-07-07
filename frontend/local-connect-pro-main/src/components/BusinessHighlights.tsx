import React from "react";
import { ShieldCheck, Briefcase, CheckCircle2, Zap, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BusinessHighlightsProps {
  verified?: boolean;
  experience?: number;
  jobsCompleted?: number;
  responseTime?: string;
  languages?: string[];
}

export function BusinessHighlights({
  verified,
  experience,
  jobsCompleted,
  responseTime,
  languages,
}: BusinessHighlightsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5 items-center">
      {/* Verified Badge */}
      {verified && (
        <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/15 border border-blue-500/20 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium text-xs">
          <ShieldCheck className="h-3.5 w-3.5" /> Verified
        </Badge>
      )}

      {/* Experience */}
      {experience !== undefined && (
        <Badge variant="outline" className="bg-surface text-ink border-border px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-normal text-xs shadow-sm">
          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium text-ink">{experience} Yrs</span> Experience
        </Badge>
      )}

      {/* Jobs Completed */}
      {jobsCompleted !== undefined && (
        <Badge variant="outline" className="bg-surface text-ink border-border px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-normal text-xs shadow-sm">
          <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-medium text-ink">{jobsCompleted}</span> Jobs Done
        </Badge>
      )}

      {/* Response Time */}
      {responseTime && (
        <Badge variant="outline" className="bg-surface text-ink border-border px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-normal text-xs shadow-sm">
          <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
          Replies <span className="font-medium text-ink">{responseTime}</span>
        </Badge>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <Badge variant="outline" className="bg-surface text-ink border-border px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-normal text-xs shadow-sm">
          <Languages className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{languages.join(", ")}</span>
        </Badge>
      )}
    </div>
  );
}