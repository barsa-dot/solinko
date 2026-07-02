import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bell, Plus, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { fetchDashboardOrders, fetchDashboardStats, type DashboardOrder } from "@/services/fakeApi";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Vendor dashboard — SOLINKO" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [bars, setBars] = useState<number[]>([]);
  const [stats, setStats] = useState({
    earnings: 0,
    ordersCount: 0,
    ordersInProgress: 0,
    newCustomers: 0,
    payoutStatus: "",
    lastPayout: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [ordersData, statsData] = await Promise.all([
          fetchDashboardOrders(),
          fetchDashboardStats(),
        ]);
        setOrders(ordersData);
        setBars(statsData.dailyOrders);
        setStats({
          earnings: statsData.earnings,
          ordersCount: statsData.ordersCount,
          ordersInProgress: statsData.ordersInProgress,
          newCustomers: statsData.newCustomers,
          payoutStatus: statsData.payoutStatus,
          lastPayout: statsData.lastPayout,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
        // Set fallback data for UI layout
        setBars([38, 52, 44, 70, 60, 88, 64]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {error && (
        <div className="container-editorial mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
          {error}
        </div>
      )}

      <section className="container-editorial pt-10 md:pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Good morning</div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl text-ink">Amma's Kitchen</h1>
            <p className="mt-1 text-sm text-muted-foreground">Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm text-ink hover:bg-subtle">
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-2 text-sm text-primary-foreground hover:bg-ink/90">
              <Plus className="h-4 w-4" /> Add product
            </button>
          </div>
        </div>
      </section>

      <section className="container-editorial mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: "Today's earnings", v: `₹${stats.earnings}`, sub: `+12% vs yesterday` },
          { k: "Orders", v: `${stats.ordersCount}`, sub: `${stats.ordersInProgress} in progress` },
          { k: "New customers", v: `${stats.newCustomers}`, sub: "this week" },
          { k: "Payouts", v: stats.payoutStatus, sub: `Last: ₹${stats.lastPayout}` },
        ].map((s) => (
          <div key={s.k} className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.k}</div>
            <div className="mt-2 font-display text-3xl text-ink">{s.v}</div>
            <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-accent" /> {s.sub}
            </div>
          </div>
        ))}
      </section>

      <section className="container-editorial mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">This week</div>
              <div className="font-display text-xl text-ink">Daily orders</div>
            </div>
            <a href="#" className="text-sm text-muted-foreground hover:text-ink inline-flex items-center gap-1">
              Analytics <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex items-end gap-3 h-44">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-ink/90 hover:bg-accent transition-colors"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Profile</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-ink text-primary-foreground flex items-center justify-center font-display">A</div>
            <div>
              <div className="text-ink font-medium">Amma's Kitchen</div>
              <div className="text-xs text-muted-foreground">Street food · Brigade Lane</div>
            </div>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-muted-foreground">Listing</span><span className="text-ink">Live</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Payments</span><span className="text-ink">UPI connected</span></li>
            <li className="flex justify-between"><span className="text-muted-foreground">Hours</span><span className="text-ink">7am – 10pm</span></li>
          </ul>
          <button className="mt-6 w-full rounded-xl border border-border bg-surface py-2.5 text-sm text-ink hover:bg-subtle">
            Edit profile
          </button>
        </div>
      </section>

      <section className="container-editorial mt-8 rounded-2xl border border-border bg-surface shadow-soft overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Recent</div>
            <div className="font-display text-xl text-ink">Orders</div>
          </div>
          <a href="#" className="text-sm text-muted-foreground hover:text-ink">See all</a>
        </div>
        <div className="divide-y divide-border">
          {orders.map((o) => (
            <div key={o.id} className="grid grid-cols-12 gap-3 p-5 items-center text-sm">
              <div className="col-span-3 md:col-span-2 text-muted-foreground">{o.id}</div>
              <div className="col-span-5 md:col-span-4 text-ink">{o.customer}</div>
              <div className="hidden md:block md:col-span-3 text-muted-foreground">{o.item}</div>
              <div className="hidden md:block md:col-span-1 text-muted-foreground">{o.time}</div>
              <div className="col-span-4 md:col-span-2 text-right">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
                    o.status === "Delivered"
                      ? "bg-subtle text-muted-foreground"
                      : o.status === "Ready"
                      ? "bg-accent/15 text-accent"
                      : "bg-ink/10 text-ink"
                  }`}
                >
                  {o.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-24" />
      <SiteFooter />
    </div>
  );
}
