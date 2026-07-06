import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { VendorCard } from "@/components/VendorCard";
import { type VendorCategory, type Vendor } from "@/data/vendors";
import { fetchVendors, fetchCategories } from "@/services/fakeApi";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover vendors near you — SOLINKO" },
      { name: "description", content: "Browse nearby street food, tailors, parlours, repair services, and local shops on SOLINKO." },
    ],
  }),
  component: DiscoverPage,
});

function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<VendorCategory | "All">("All");
  const [allVendors, setAllVendors] = useState<Vendor[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<VendorCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [vendorsData, categoriesData] = await Promise.all([
          fetchVendors(),
          fetchCategories(),
        ]);
        setAllVendors(vendorsData);
        setVendors(vendorsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load vendors");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return allVendors.filter((vendor) => {
      const matchCat = active === "All" || vendor.category === active;
      const searchableText = [
        vendor.name,
        vendor.category,
        vendor.tagline,
        vendor.city,
        vendor.description,
        ...(vendor.services || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchQ = !q || searchableText.includes(q);
      const matchCity = !selectedCity || [vendor.city, vendor.location, vendor.area].includes(selectedCity);
      const matchRating = !selectedRating || vendor.rating >= Number(selectedRating);

      return matchCat && matchQ && matchCity && matchRating;
    });
  }, [active, allVendors, search, selectedCity, selectedRating]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-editorial pt-10 md:pt-16 pb-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Discover</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl text-ink text-balance">
          Vendors near you, hand-picked by the neighbourhood.
        </h1>

        <div className="mt-8 flex flex-col gap-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, area, or what you need…"
              className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm text-ink placeholder:text-muted-foreground focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          <div className="max-w-xl flex flex-col gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
            >
              <option value="">All Cities</option>
              {Array.from(new Set(allVendors.map(v => v.city))).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-sm text-ink focus:outline-none focus:border-ink transition-colors"
            >
              <option value="">All Ratings</option>
              <option value="4.5">⭐ 4.5+</option>
              <option value="4">⭐ 4+</option>
              <option value="3">⭐ 3+</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCity("");
                setSelectedRating("");
                setActive("All");
              }}
              className="rounded-xl border border-border px-6 py-2 text-sm"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["All", ...categories] as const).map((c) => {
              const isActive = active === c;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-ink text-primary-foreground border-ink"
                      : "border-border text-ink hover:border-ink/60"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-editorial pb-24">
        {error ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
            <p className="text-red-600">Error: {error}</p>
          </div>
        ) : isLoading ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
            Loading vendors...
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center text-muted-foreground">
            No vendors match that search yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((v, i) => (
              <Reveal key={v.id} delay={i * 0.04}>
                <VendorCard vendor={v} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
