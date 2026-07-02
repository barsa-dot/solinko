import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Sparkles,
  Wallet,
  Store,
  Users,
  Search,
  ShoppingBag,
  MessageCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import heroImg from "@/assets/hero-vendors.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { type Vendor } from "@/data/vendors";
import { fetchVendors, fetchCategories } from "@/services/fakeApi";
import { VendorCard } from "@/components/VendorCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLINKO — Where neighbourhoods meet their local vendors" },
      { name: "description", content: "Discover nearby street food, tailors, parlours and local services — or list your own shop. Built for the people who make your neighbourhood work." },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Store,
    title: "A storefront in minutes",
    body: "Set up a clean, modern profile with photos, menu, and hours. No design skills needed.",
  },
  {
    icon: MapPin,
    title: "Found by neighbours",
    body: "Show up when people nearby search for what you offer. Real reach, no ad-spend race.",
  },
  {
    icon: Wallet,
    title: "Payments that just work",
    body: "Accept UPI and cards, track earnings daily, and get paid the same evening.",
  },
  {
    icon: Sparkles,
    title: "Tools, not noise",
    body: "Light, focused features. Nothing you need to learn. Nothing you'll never use.",
  },
];

const steps = [
  { n: "01", title: "Create your storefront", body: "Add your photos, location, and what you sell. Ten minutes, tops." },
  { n: "02", title: "Get discovered nearby", body: "Customers in your area find you when they search by category." },
  { n: "03", title: "Take orders, get paid", body: "Manage requests, mark them done, and watch the day's earnings add up." },
];

const testimonials = [
  { quote: "I used to wait for foot traffic. Now people walk in asking for me by name.", who: "Amma, street food vendor" },
  { quote: "My tailoring orders doubled in the first month. The setup took one evening.", who: "Rafi, master tailor" },
  { quote: "Finally a digital tool that doesn't make me feel out of place.", who: "Sneha, parlour owner" },
];

// Rotating story slides — "the engaging bit"
const slides = [
  {
    kicker: "Easy connect",
    title: "Talk to customers like a neighbour, not a brand.",
    body: "Chat, confirm an order, share today's menu — all from one inbox that works on the cheapest smartphone.",
    icon: MessageCircle,
    tint: "from-orange-100 to-amber-50",
  },
  {
    kicker: "Found nearby",
    title: "Be the first name they see, three streets away.",
    body: "Hyperlocal search puts your shop in front of people already walking past your door.",
    icon: Search,
    tint: "from-sky-100 to-indigo-50",
  },
  {
    kicker: "Orders, sorted",
    title: "From a passing customer to a paid order in 30 seconds.",
    body: "Take orders, accept UPI, mark them done. Your evening totals add themselves up.",
    icon: ShoppingBag,
    tint: "from-emerald-100 to-lime-50",
  },
  {
    kicker: "Grow with proof",
    title: "Watch your shop grow, week by week.",
    body: "A simple dashboard shows what's selling, who's coming back, and where to focus next.",
    icon: BarChart3,
    tint: "from-rose-100 to-pink-50",
  },
];

function LandingPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const vendorsData = await fetchVendors();
        const categoriesData = await fetchCategories();

        setVendors(vendorsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Failed to load data:", err);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  const featured = vendors.slice(0, 3);
  const slide = slides[active];
  const SlideIcon = slide.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-editorial pt-12 pb-16 md:pt-20 md:pb-24 grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Hyperlocal RetailTech · Now in beta
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-6 font-display text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl text-ink text-balance"
            >
              Where neighbourhoods meet their{" "}
              <span className="italic text-accent">local vendors</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground text-pretty"
            >
              Discover the shops, cooks, and craftspeople around you — or bring your own to a growing
              digital high-street. Two doors in. Same neighbourhood.
            </motion.p>

            {/* DUAL PATH — Customer vs Vendor */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
              className="mt-10 grid gap-4 sm:grid-cols-2 max-w-xl"
            >
              <Link
                to="/discover"
                className="group relative rounded-2xl border border-border bg-surface p-5 hover-lift overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                    <Users className="h-3.5 w-3.5" /> For customers
                  </div>
                  <div className="mt-3 font-display text-xl text-ink">Find local vendors</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Discover food, services and shops on your street.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink font-medium">
                    Browse now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>

              <Link
                to="/signup"
                className="group relative rounded-2xl bg-ink text-primary-foreground p-5 hover-lift overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/30 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                    <Store className="h-3.5 w-3.5" /> For vendors
                  </div>
                  <div className="mt-3 font-display text-xl">List your shop</div>
                  <p className="mt-1 text-sm text-white/70">
                    Get a storefront, reach nearby customers, take orders.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                    Join as vendor <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
              {[
                { k: "1,200+", v: "Vendors" },
                { k: "38", v: "Neighbourhoods" },
                { k: "4.8★", v: "Avg. rating" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl text-ink">{s.k}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            className="md:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden bg-subtle shadow-lift">
              <img
                src={heroImg}
                alt="Local vendors using SOLINKO on their phones"
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-lift border border-border"
            >
              <Users className="h-4 w-4 text-accent" />
              <div className="text-xs">
                <div className="text-ink font-medium">42 new customers</div>
                <div className="text-muted-foreground">this week, in your area</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ENGAGING SLIDE CAROUSEL */}
      <section className="container-editorial pb-16 md:pb-24">
        <Reveal>
          <div className="relative rounded-3xl border border-border bg-surface overflow-hidden shadow-soft">
            <div className="grid md:grid-cols-12">
              {/* Visual side */}
              <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`vis-${active}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                    className={`absolute inset-0 bg-gradient-to-br ${slide.tint}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-white/40 blur-2xl scale-150" />
                        <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl bg-white/80 backdrop-blur border border-white shadow-lift flex items-center justify-center">
                          <SlideIcon className="h-14 w-14 md:h-16 md:w-16 text-ink" strokeWidth={1.4} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text side */}
              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between min-h-[320px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`txt-${active}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                  >
                    <div className="text-xs uppercase tracking-widest text-accent">
                      {slide.kicker}
                    </div>
                    <h3 className="mt-3 font-display text-3xl md:text-4xl text-ink text-balance leading-tight">
                      {slide.title}
                    </h3>
                    <p className="mt-4 text-muted-foreground max-w-lg text-pretty">
                      {slide.body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Slide ${i + 1}`}
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: i === active ? 28 : 10,
                          background:
                            i === active ? "var(--ink)" : "var(--border)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setActive((i) => (i - 1 + slides.length) % slides.length)
                      }
                      className="h-9 w-9 rounded-full border border-border bg-surface hover:bg-subtle text-ink inline-flex items-center justify-center transition-colors"
                      aria-label="Previous"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setActive((i) => (i + 1) % slides.length)}
                      className="h-9 w-9 rounded-full bg-ink text-primary-foreground hover:bg-ink/90 inline-flex items-center justify-center transition-colors"
                      aria-label="Next"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section className="container-editorial py-16 md:py-24 border-t border-border/60">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Features</div>
              <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink max-w-2xl text-balance">
                A toolkit small enough to fit on your phone.
              </h2>
            </div>
            <Link to="/discover" className="text-sm text-ink hover:text-accent inline-flex items-center gap-1">
              See it in action <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-soft hover-lift">
                <f.icon className="h-5 w-5 text-accent" />
                <h3 className="mt-4 font-display text-xl text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-editorial py-16 md:py-24 border-t border-border/60">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">How it works</div>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink max-w-2xl text-balance">
            From sidewalk to storefront, in three steps.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="border-t border-ink pt-6">
                <div className="font-display text-sm text-accent">{s.n}</div>
                <h3 className="mt-3 font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-xs">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-editorial py-16 md:py-24 border-t border-border/60">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Categories</div>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink max-w-2xl text-balance">
            Every kind of neighbourhood expertise.
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              to="/discover"
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink hover:border-ink transition-colors"
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.05}>
              <VendorCard vendor={v} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-editorial py-16 md:py-24 border-t border-border/60">
        <Reveal>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">In their words</div>
          <h2 className="mt-2 font-display text-3xl md:text-5xl text-ink max-w-2xl text-balance">
            Vendors using SOLINKO today.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.who} delay={i * 0.06}>
              <figure className="rounded-2xl bg-surface border border-border p-6 shadow-soft h-full">
                <blockquote className="font-display text-xl text-ink leading-snug text-balance">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">— {t.who}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DUAL CTA */}
      <section className="container-editorial py-16 md:py-24">
        <Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-surface border border-border p-10 md:p-12 relative overflow-hidden hover-lift">
              <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-accent">For customers</div>
                <h3 className="mt-3 font-display text-3xl md:text-4xl text-ink text-balance">
                  Support the people on your street.
                </h3>
                <p className="mt-4 text-muted-foreground max-w-md">
                  Discover what's good, what's open, and what's two blocks away — all without a single ad.
                </p>
                <Link
                  to="/discover"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm text-primary-foreground hover:bg-ink/90 transition-colors"
                >
                  Explore vendors <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-3xl bg-ink text-primary-foreground p-10 md:p-12 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-accent">For vendors</div>
                <h3 className="mt-3 font-display text-3xl md:text-4xl text-balance">
                  Bring your shop into the next decade.
                </h3>
                <p className="mt-4 text-white/70 max-w-md">
                  Free to start. No commission on your first 50 orders. Real humans on support, in your language.
                </p>
                <Link
                  to="/signup"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Join as vendor <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
