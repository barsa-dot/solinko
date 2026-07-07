interface PortfolioItem {
  title: string;
  image: string;
}

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[] | string;
}

export function PortfolioGallery({ portfolio }: PortfolioGalleryProps) {
  // Parse array if database serves it as a raw stringified JSON text field
  const portfolioArray = typeof portfolio === "string" 
    ? JSON.parse(portfolio) 
    : portfolio;

  if (!portfolioArray || portfolioArray.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Portfolio Gallery
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {portfolioArray.map((item: PortfolioItem, index: number) => (
          <div 
            key={index} 
            className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
          >
            <div className="h-44 w-full overflow-hidden bg-subtle">
              <img 
                src={item.image} 
                alt={item.title} 
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-ink text-sm">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}