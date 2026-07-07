import { Briefcase, Calendar, Star, MessageSquare } from "lucide-react";

interface VendorStatsSectionProps {
  stats?: {
    projects?: number;
    years?: number;
    rating?: number;
    responseRate?: string;
  };
}

export function VendorStatsSection({ stats }: VendorStatsSectionProps) {
  // Fallback defaults matching your requested configuration metrics
  const displayStats = [
    {
      label: "Projects Completed",
      value: stats?.projects ?? 125,
      icon: <Briefcase className="h-5 w-full text-indigo-500" />,
      bgColor: "bg-indigo-50",
    },
    {
      label: "Years Experience",
      value: `${stats?.years ?? 12}+`,
      icon: <Calendar className="h-5 w-full text-emerald-500" />,
      bgColor: "bg-emerald-50",
    },
    {
      label: "Average Rating",
      value: stats?.rating ?? 4.8,
      icon: <Star className="h-5 w-full text-amber-500 fill-amber-500" />,
      bgColor: "bg-amber-50",
    },
    {
      label: "Response Rate",
      value: stats?.responseRate ?? "98%",
      icon: <MessageSquare className="h-5 w-full text-rose-500" />,
      bgColor: "bg-rose-50",
    },
  ];

  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Performance Overview
      </div>
      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col p-5 rounded-2xl border border-border bg-surface shadow-soft min-w-0"
          >
            <div className={`p-2.5 rounded-xl w-fit ${stat.bgColor} mb-3`}>
              {stat.icon}
            </div>
            <span className="font-display text-2xl font-bold text-ink tracking-tight">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground mt-1 truncate font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}