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
      alert("Selectează mai întâi o poză.");
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
        alert(data.error || "Eroare upload");
      }
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert("A apărut o eroare la upload.");
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
  className="w-full rounded-2xl px-6 py-4 font-semibold text-white transition duration-300 hover:scale-[1.05]"
  style={{
    background: "linear-gradient(135deg, #ff4d8d, #ff7a18)",
    boxShadow: "0 0 25px rgba(255, 100, 150, 0.4)",
  }}
  onMouseEnter={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 0 40px rgba(255, 100, 150, 0.7)")
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.boxShadow =
      "0 0 25px rgba(255, 100, 150, 0.4)")
  }
>
  Upload photo 🔥
</button>
    </div>
  );
}