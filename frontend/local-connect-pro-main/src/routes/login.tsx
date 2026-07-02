import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — SOLINKO" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [phone, setPhone] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 container-editorial py-16 md:py-24 grid place-items-center">
        <div className="w-full max-w-md">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Welcome back</div>
          <h1 className="mt-2 font-display text-4xl text-ink">Log in to SOLINKO</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your phone number — we'll text you a one-time code.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-soft"
          >
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98xxx 12345"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-ink focus:outline-none focus:border-ink"
              />
            </label>
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-3 text-sm text-primary-foreground hover:bg-ink/90 transition-colors">
              Send code <ArrowRight className="h-4 w-4" />
            </button>
            <div className="text-xs text-muted-foreground text-center">
              No account?{" "}
              <Link to="/signup" className="text-ink underline underline-offset-4">
                Create one
              </Link>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
