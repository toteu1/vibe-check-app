"use client";

import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getSavedLang, texts } from "@/lib/translations";

export default function HomePage() {
  const lang = getSavedLang();
  const t = texts[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex w-full items-center justify-end">
          <LanguageSwitcher />
        </div>

        <div className="mb-6 inline-flex rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
          {t.homeBadge}
        </div>

        <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          {t.homeTitle1}
          <br />
          <span className="bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-transparent">
            {t.homeTitle2}
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
          {t.homeDesc}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
  href="/analyze"
  className="rounded-2xl px-6 py-4 text-base font-semibold transition duration-300 hover:scale-[1.05]"
  style={{
    background: "linear-gradient(135deg, #ff4d8d, #ff7a18)",
    color: "#ffffff",
    boxShadow: "0 0 25px rgba(255, 100, 150, 0.4)",
  }}
>
  {t.homeCta} 🔥
</Link>

          <a
            href="#cum-functioneaza"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white/90 transition hover:bg-white/10"
          >
            {t.homeHow}
          </a>
        </div>

        <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
          {t.homeNote}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
  <Link href="/privacy" className="transition hover:text-white">
    Privacy Policy
  </Link>
  <span>•</span>
  <Link href="/terms" className="transition hover:text-white">
    Terms & Conditions
  </Link>
</div>
      </section>
    </main>
  );
}