import { Zap } from "lucide-react";

interface ServicesSectionProps {
  services: string[] | string;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Handle parsing if the database passes it down as a stringified JSON array
  const servicesArray = typeof services === "string" 
    ? JSON.parse(services) 
    : services;

  if (!servicesArray || servicesArray.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Services Offered
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {servicesArray.map((service: string, index: number) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface shadow-soft"
          >
            <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
              <Zap className="h-4 w-4 fill-amber-500" />
            </div>
            <span className="font-medium text-ink text-sm">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}