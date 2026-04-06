"use client";

import { useMemo, useState } from "react";
import { getSavedLang, texts } from "@/lib/translations";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const lang = getSavedLang();
  const t = texts[lang];

  const preview = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  async function handleAnalyze() {
    if (!file) {
      alert(
        lang === "ro"
          ? "Selectează mai întâi o poză."
          : lang === "de"
          ? "Wähle zuerst ein Foto aus."
          : "Select a photo first."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        window.location.href = `/result?img=${encodeURIComponent(data.url)}`;
      } else {
        alert(
          data.error ||
            (lang === "ro"
              ? "Eroare la upload."
              : lang === "de"
              ? "Fehler beim Upload."
              : "Upload error.")
        );
      }
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert(
        lang === "ro"
          ? "A apărut o eroare la upload."
          : lang === "de"
          ? "Beim Upload ist ein Fehler aufgetreten."
          : "An upload error occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
      <label className="block cursor-pointer rounded-3xl border border-dashed border-white/15 bg-black/20 p-6 text-center transition hover:border-white/25 hover:bg-black/30">
        <div className="text-lg font-semibold">{t.uploadTitle}</div>
        <div className="mt-2 text-sm text-white/60">{t.uploadDesc}</div>

        <input
          type="file"
          accept="image/*"
          className="mt-4 block w-full text-sm text-white/70"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-6 h-80 w-full rounded-[28px] object-cover"
        />
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 w-full rounded-2xl px-6 py-4 font-semibold text-white transition duration-300 hover:scale-[1.05] disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background: "linear-gradient(135deg, #ff4d8d, #ff7a18)",
          boxShadow: "0 0 25px rgba(255, 100, 150, 0.4)",
        }}
      >
        {loading
          ? t.uploadLoading
          : lang === "ro"
          ? "Analizează poza 🔥"
          : lang === "de"
          ? "Foto analysieren 🔥"
          : "Analyze photo 🔥"}
      </button>
    </div>
  );
}