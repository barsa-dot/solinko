import { Star } from "lucide-react";

interface ReviewItem {
  author: string;
  rating: number;
  text: string;
  date?: string;
}

interface CustomerReviewsSectionProps {
  reviews: ReviewItem[] | string;
}

export function CustomerReviewsSection({ reviews }: CustomerReviewsSectionProps) {
  // Parse array safely if served as a raw text string from SQLite columns
  const reviewsArray = typeof reviews === "string" 
    ? JSON.parse(reviews) 
    : reviews;

  if (!reviewsArray || reviewsArray.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        Customer Reviews
      </div>
      
      <div className="mt-4 space-y-4">
        {reviewsArray.map((review: ReviewItem, index: number) => (
          <div 
            key={index} 
            className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              {/* Profile Header */}
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-subtle border border-border flex items-center justify-center font-display text-xs font-semibold text-ink uppercase">
                  {review.author.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-ink leading-none">{review.author}</h4>
                  {/* Render Stars directly underneath the name on mobile / inline on desktop */}
                  <div className="flex items-center gap-0.5 mt-1 sm:hidden">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Stars & Dynamic Timestamp */}
              <div className="flex items-center sm:gap-3 justify-between sm:justify-end">
                <div className="hidden sm:flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground/80 font-medium">
                  {review.date ?? "July 2026"}
                </span>
              </div>
            </div>

            {/* Comment Body Text */}
            <p className="mt-3 text-sm text-foreground/90 leading-relaxed text-pretty pl-0 sm:pl-10固定">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}