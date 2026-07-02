import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { VendorCard } from "@/components/VendorCard";
import { type VendorCategory, type Vendor } from "@/data/vendors";
import { fetchVendors, fetchCategories, searchVendors, filterVendors } from "@/services/fakeApi";
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

  const handleSearch = async () => {
    try {
      const data = await searchVendors(search);
      setVendors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = async () => {
    try {
      const data = await filterVendors(
        selectedCity,
        selectedRating
          ? Number(selectedRating)
          : undefined
      );

      setVendors(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchCat = active === "All" || v.category === active;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.tagline.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, active, vendors]);

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

          <button
            onClick={handleSearch}
            className="max-w-xl rounded-xl bg-ink text-primary-foreground px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Search
          </button>

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
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>

            <button
              onClick={handleFilter}
              className="rounded-xl bg-ink text-primary-foreground px-6 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Apply Filters
            </button>

            <button
              onClick={() => {
                setVendors(allVendors);
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
