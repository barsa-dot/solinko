import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Phone, Star, Clock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { type Vendor } from "@/data/vendors";
import { fetchVendor } from "@/services/fakeApi";

export const Route = createFileRoute("/vendor/$id")({
  loader: async ({ params }) => {
    try {
      const vendor = await fetchVendor(params.id);
      return { vendor };
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.vendor.name} — SOLINKO` },
          { name: "description", content: loaderData.vendor.tagline },
          { property: "og:title", content: `${loaderData.vendor.name} — SOLINKO` },
          { property: "og:description", content: loaderData.vendor.tagline },
          { property: "og:image", content: loaderData.vendor.banner },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-muted-foreground">Vendor not found.</p>
        <Link to="/discover" className="mt-4 inline-block text-ink underline">Back to discover</Link>
      </div>
    </div>
  ),
  component: VendorPage,
});

function VendorPage() {
  const { vendor } = Route.useLoaderData() as { vendor: Vendor };
  const isService = vendor.category !== "Street Food" && vendor.category !== "Local Shops";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative">
        <div className="h-56 md:h-80 w-full overflow-hidden bg-subtle">
          <img src={vendor.banner} alt={vendor.name} className="h-full w-full object-cover" />
        </div>
        <div className="container-editorial">
          <Link
            to="/discover"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-ink mt-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to discover
          </Link>
        </div>
      </section>

      <section className="container-editorial mt-6 md:mt-8 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-start gap-5">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover border border-border shadow-soft -mt-16 md:-mt-20 bg-surface"
            />
            <div className="pt-1">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {vendor.category}
              </div>
              <h1 className="mt-1 font-display text-3xl md:text-4xl text-ink">{vendor.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {vendor.rating} <span className="text-muted-foreground/70">({vendor.reviewCount})</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" /> {vendor.area} · {vendor.distanceKm} km
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> {vendor.hours}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-8 text-base text-foreground/90 leading-relaxed max-w-2xl text-pretty">
            {vendor.description}
          </p>

          <div className="mt-12">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {isService ? "Services" : "Menu"}
            </div>
            <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface overflow-hidden">
              {vendor.items.map((it) => (
                <div key={it.name} className="flex items-baseline justify-between gap-4 p-5">
                  <div>
                    <div className="font-medium text-ink">{it.name}</div>
                    {it.note && <div className="text-xs text-muted-foreground mt-0.5">{it.note}</div>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-ink">{it.price}</span>
                    <button className="hidden sm:inline-flex rounded-lg border border-border px-3 py-1.5 text-xs text-ink hover:bg-subtle">
                      {isService ? "Book" : "Add"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Gallery</div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {vendor.gallery.map((g, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl bg-subtle">
                  <img src={g} alt="" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Reviews</div>
            <div className="mt-4 space-y-4">
              {vendor.reviews.map((r) => (
                <div key={r.author} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-center gap-2 text-sm text-ink">
                    <span className="font-medium">{r.author}</span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {r.rating}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/90">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="md:sticky md:top-24 h-fit space-y-4">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {vendor.openNow ? "Open now" : "Closed"}
            </div>
            <div className="mt-1 font-display text-lg text-ink">{vendor.hours}</div>
            <a
              href={`tel:${vendor.phone.replace(/\s/g, "")}`}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm text-primary-foreground hover:bg-ink/90 transition-colors"
            >
              <Phone className="h-4 w-4" /> Call {vendor.name.split(" ")[0]}
            </a>
            <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink hover:bg-subtle transition-colors">
              {isService ? "Book a slot" : "Place an order"}
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Location</div>
            <div className="mt-1 text-ink">{vendor.area}</div>
            <div className="text-sm text-muted-foreground">{vendor.distanceKm} km from you</div>
          </div>
        </aside>
      </section>

      <div className="h-24" />
      <SiteFooter />
    </div>
  );
}
