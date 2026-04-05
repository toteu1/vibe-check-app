"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { getSavedLang, texts } from "@/lib/translations";

type AnalyzeResponse = {
  vibe?: string;
  description?: string;
  confidence?: number;
  mystery?: number;
  charm?: number;
  aura?: number;
};

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-white/75">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-white via-pink-200 to-orange-200 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ResultContent() {
  const params = useSearchParams();
  const img = params.get("img");

  const lang = getSavedLang();
  const t = texts[lang];

  const [vibe, setVibe] = useState(t.loadingTitle);
  const [desc, setDesc] = useState(t.loadingDesc);
  const [confidence, setConfidence] = useState(0);
  const [mystery, setMystery] = useState(0);
  const [charm, setCharm] = useState(0);
  const [aura, setAura] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState(t.loadingSteps[0]);

  const loadingMessages = useMemo<string[]>(
    () => [...t.loadingSteps],
    [t.loadingSteps]
  );

  useEffect(() => {
    if (!loading) return;

    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[i]);
    }, 850);

    return () => clearInterval(interval);
  }, [loading, loadingMessages]);

  useEffect(() => {
    async function analyzeImage() {
      if (!img) {
        setVibe("—");
        setDesc(t.noImage);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: img, lang }),
        });

        const data: AnalyzeResponse = await res.json();

        if (data.vibe) setVibe(data.vibe);
        if (data.description) setDesc(data.description);
        if (typeof data.confidence === "number") setConfidence(data.confidence);
        if (typeof data.mystery === "number") setMystery(data.mystery);
        if (typeof data.charm === "number") setCharm(data.charm);
        if (typeof data.aura === "number") setAura(data.aura);
      } catch (error) {
        console.error("ANALYZE ERROR:", error);
        setVibe("Eroare");
        setDesc(t.error);
      } finally {
        setLoading(false);
      }
    }

    analyzeImage();
  }, [img, lang, t]);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(t.copiedLink);
    } catch {
      alert(t.copyError);
    }
  }

  async function handleCopyResult() {
    try {
      const text = `My result: ${vibe} 🔥 ${desc} Aura Score: ${aura}% — Try it here: ${window.location.href}`;
      await navigator.clipboard.writeText(text);
      alert(t.copiedResult);
    } catch {
      alert(t.copyError);
    }
  }

  async function handleShareChallenge() {
    try {
      const text = `I got ${aura}% Aura Score 🔥\n${vibe}\n\nTry to beat me 👉 ${window.location.href}`;
      await navigator.clipboard.writeText(text);
      alert(t.copiedChallenge);
    } catch {
      alert(t.copyError);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(251,146,60,0.12),_transparent_22%),linear-gradient(to_bottom,_#000,_#0a0a0a,_#000)] text-white">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
          >
            {t.back}
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <div className="rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-pink-300">
              Viral Vibe Scan
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
            {t.resultTitle}
          </h1>

          <p className="mt-3 text-center text-white/60">{t.resultDesc}</p>

          {img && (
            <div className="mt-8">
              <div className="mx-auto max-w-md rounded-[30px] border border-white/10 bg-white/[0.03] p-3 shadow-2xl">
                <img
                  src={img}
                  alt="Rezultat"
                  className="mx-auto h-auto w-full rounded-[24px] object-cover"
                />
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <div className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 shadow-[0_0_30px_rgba(251,146,60,0.12)]">
              {t.resultBadge}
            </div>

            <h2 className="mt-5 text-3xl font-bold sm:text-5xl">
              {loading ? t.loadingTitle : vibe}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/72">
              {loading ? t.loadingDesc : desc}
            </p>

            {loading && (
              <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm text-white/70">
                {loadingText}
              </div>
            )}
          </div>

          {!loading && (
            <>
              <div className="mt-10 rounded-[30px] border border-pink-500/20 bg-[linear-gradient(180deg,rgba(236,72,153,0.14),rgba(236,72,153,0.06))] p-6 text-center shadow-[0_0_40px_rgba(236,72,153,0.08)]">
                <div className="text-sm uppercase tracking-[0.25em] text-pink-300/80">
                  {t.auraScore}
                </div>

                <div className="mt-3 bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl">
                  {aura}%
                </div>

                <div className="mt-4 text-sm text-pink-100/80">
                  {t.auraText}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <ScoreBar label={t.confidence} value={confidence} />
                <ScoreBar label={t.mystery} value={mystery} />
                <ScoreBar label={t.charm} value={charm} />
              </div>

              <div className="mt-8 rounded-2xl border border-pink-500/20 bg-pink-500/10 px-5 py-4 text-center text-sm text-pink-200">
                {t.shareNote}
              </div>
            </>
          )}

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <button
              onClick={handleCopyLink}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              {t.copyLink}
            </button>

            <button
              onClick={handleCopyResult}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              {t.copyResult}
            </button>

            <button
              onClick={handleShareChallenge}
              className="rounded-2xl border border-pink-500/20 bg-pink-500/12 px-5 py-4 font-semibold text-pink-200 transition hover:bg-pink-500/20"
            >
              {t.challenge}
            </button>

            <Link
              href="/analyze"
              className="rounded-2xl px-5 py-4 text-center font-semibold text-white transition duration-300 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg, #ff4d8d, #ff7a18)",
                boxShadow: "0 0 25px rgba(255, 100, 150, 0.35)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🔁 {t.retry}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          Se încarcă...
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  );
}