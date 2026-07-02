import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { categories } from "@/data/vendors";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your shop — SOLINKO" }] }),
  component: OnboardingPage,
});

const steps = [
  "Business type",
  "Photo",
  "Location",
  "Products",
  "Payments",
] as const;

function OnboardingPage() {
  const [step, setStep] = useState(0);
  const last = step === steps.length - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      <main className="flex-1 container-editorial py-10 md:py-16 max-w-2xl mx-auto w-full">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1 rounded-full ${i <= step ? "bg-ink" : "bg-subtle"} transition-colors`} />
              <div className={`mt-2 text-[10px] uppercase tracking-widest ${i === step ? "text-ink" : "text-muted-foreground"}`}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <StepContent step={step} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground disabled:opacity-40 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {last ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              <Check className="h-4 w-4" /> Open my dashboard
            </Link>
          ) : (
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm text-primary-foreground hover:bg-ink/90 transition-colors"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function StepContent({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div>
        <h2 className="font-display text-3xl text-ink">What do you do?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Pick the closest match. You can refine this later.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          {categories.map((c) => (
            <button
              key={c}
              className="text-left rounded-2xl border border-border bg-surface p-5 hover:border-ink transition-colors"
            >
              <div className="font-display text-lg text-ink">{c}</div>
              <div className="text-xs text-muted-foreground mt-1">Tap to choose</div>
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div>
        <h2 className="font-display text-3xl text-ink">Add a photo of your shop.</h2>
        <p className="mt-2 text-sm text-muted-foreground">One clear photo is enough. You can add more later.</p>
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
          <div className="text-sm text-muted-foreground">Tap to upload from your phone</div>
          <div className="mt-1 text-xs text-muted-foreground/70">JPG or PNG, up to 10 MB</div>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div>
        <h2 className="font-display text-3xl text-ink">Where are you?</h2>
        <p className="mt-2 text-sm text-muted-foreground">We'll use this to show you to nearby customers.</p>
        <input
          className="mt-8 w-full rounded-xl border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:border-ink"
          placeholder="Area or landmark"
        />
        <button className="mt-3 text-sm text-accent hover:underline">Use my current location</button>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div>
        <h2 className="font-display text-3xl text-ink">Add what you sell.</h2>
        <p className="mt-2 text-sm text-muted-foreground">Just a few to start. You can change anything later.</p>
        <div className="mt-8 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="grid grid-cols-3 gap-3">
              <input className="col-span-2 rounded-xl border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:border-ink" placeholder={`Item ${i}`} />
              <input className="rounded-xl border border-border bg-surface px-4 py-3 text-ink focus:outline-none focus:border-ink" placeholder="Price" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-display text-3xl text-ink">How would you like to be paid?</h2>
      <p className="mt-2 text-sm text-muted-foreground">Connect once. We'll settle your earnings every evening.</p>
      <div className="mt-8 space-y-3">
        {["UPI", "Bank transfer", "Cash on delivery"].map((p) => (
          <label key={p} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 hover:border-ink transition-colors cursor-pointer">
            <input type="radio" name="pay" className="accent-[var(--accent)]" defaultChecked={p === "UPI"} />
            <span className="text-ink">{p}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
