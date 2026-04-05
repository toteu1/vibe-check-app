"use client";

import Link from "next/link";
import UploadBox from "@/components/UploadBox";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getSavedLang, texts } from "@/lib/translations";

export default function AnalyzePage() {
  const lang = getSavedLang();
  const t = texts[lang];

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/5"
          >
            {t.back}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-medium text-pink-300">
              {t.analyzeBadge}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.analyzeTitle}
          </h1>

          <p className="mt-4 text-lg text-white/65">{t.analyzeDesc}</p>

          <div className="mt-6 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
            {t.analyzeTip}
          </div>
        </div>

        <div className="mt-10">
          <UploadBox />
        </div>
      </section>
    </main>
  );
}