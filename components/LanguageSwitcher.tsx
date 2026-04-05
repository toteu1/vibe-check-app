"use client";

import { useEffect, useState } from "react";
import { Lang, getSavedLang, saveLang } from "@/lib/translations";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    setLang(getSavedLang());
  }, []);

  function changeLang(newLang: Lang) {
    setLang(newLang);
    saveLang(newLang);
    window.location.reload();
  }

  const base =
    "rounded-full px-3 py-1.5 text-xs font-semibold transition border";
  const active = "border-white/20 bg-white text-black";
  const inactive = "border-white/10 bg-white/5 text-white/75 hover:bg-white/10";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLang("ro")}
        className={`${base} ${lang === "ro" ? active : inactive}`}
      >
        RO
      </button>
      <button
        onClick={() => changeLang("en")}
        className={`${base} ${lang === "en" ? active : inactive}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLang("de")}
        className={`${base} ${lang === "de" ? active : inactive}`}
      >
        DE
      </button>
    </div>
  );
}