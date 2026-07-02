import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/login", label: "Log in" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-editorial flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-2 w-2 rounded-full bg-accent transition-transform group-hover:scale-125" />
          <span className="font-display text-lg tracking-tight text-ink">SOLINKO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-ink transition-colors"
              activeProps={{ className: "text-ink" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/signup"
            className="rounded-xl bg-ink px-4 py-2 text-sm text-primary-foreground hover:bg-ink/90 transition-colors"
          >
            Join as vendor
          </Link>
        </nav>

        <button
          className="md:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container-editorial py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-ink px-4 py-3 text-center text-primary-foreground"
            >
              Join as vendor
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
