import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container-editorial py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-display text-lg text-ink">SOLINKO</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Hyperlocal commerce, designed for the people who actually make your neighbourhood work.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Product</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/discover" className="hover:text-ink">Discover</Link></li>
            <li><Link to="/dashboard" className="hover:text-ink">Vendor dashboard</Link></li>
            <li><Link to="/signup" className="hover:text-ink">Join as vendor</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="hover:text-ink" href="#">About</a></li>
            <li><a className="hover:text-ink" href="#">Contact</a></li>
            <li><a className="hover:text-ink" href="#">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-editorial py-5 flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} SOLINKO. Built for local.</span>
          <span>Made with care · v0.1</span>
        </div>
      </div>
    </footer>
  );
}
