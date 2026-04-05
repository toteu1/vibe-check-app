export type Lang = "ro" | "en" | "de";

export function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return "en";

  const lang = navigator.language.toLowerCase();

  if (lang.startsWith("ro")) return "ro";
  if (lang.startsWith("de")) return "de";
  return "en";
}

export function getSavedLang(): Lang {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem("app_lang");
  if (saved === "ro" || saved === "en" || saved === "de") return saved;

  return detectBrowserLang();
}

export function saveLang(lang: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem("app_lang", lang);
}

export const texts = {
  ro: {
    homeBadge: "Viral Vibe Scanner",
    homeTitle1: "Încarcă o poză.",
    homeTitle2: "Vezi ce vibe transmiți.",
    homeDesc:
      "Încarcă o poză și află instant ce energie transmiți: aura score, mystery level, charm și first impression.",
    homeCta: "Testează-ți vibe-ul",
    homeHow: "Cum funcționează",
    homeNote: "Prietenii tăi probabil nu vor primi același scor 👀",

    analyzeBadge: "Încarcă poza",
    analyzeTitle: "Încarcă poza ta",
    analyzeDesc:
      "Alege o imagine și lasă aplicația să îți genereze vibe-ul instant.",
    analyzeTip:
      "Cu cât poza e mai clară, cu atât rezultatul pare mai accurate 👀",
    uploadTitle: "Alege o fotografie",
    uploadDesc: "JPG, PNG sau WEBP. Ideal: poză clară, bine luminată.",
    uploadBtn: "Analizează poza",
    uploadLoading: "Se trimite...",

    resultTitle: "Rezultatul tău",
    resultDesc: "Prima impresie generată instant pe baza imaginii tale",
    resultBadge: "🔥 Vibe detectat",
    loadingTitle: "Scanning your vibe...",
    loadingDesc:
      "Analizăm energia, magnetismul și impactul primei impresii...",
    loadingSteps: [
      "Citim energia feței...",
      "Măsurăm încrederea...",
      "Detectăm misterul...",
      "Calculăm charm score...",
      "Finalizăm aura result...",
    ],
    auraScore: "Aura Score",
    auraText:
      "Trimite rezultatul unui prieten și vezi cine are scorul mai mare.",
    confidence: "Confidence",
    mystery: "Mystery",
    charm: "Charm",
    shareNote:
      "Postează rezultatul în story sau trimite challenge-ul unui prieten ca să vă comparați vibe-ul.",
    copyLink: "Copiază link",
    copyResult: "Copiază rezultatul",
    challenge: "Challenge a friend 🔥",
    retry: "Încearcă altă poză 🔁",
    back: "← Înapoi",

    copiedLink: "Link copiat!",
    copiedResult: "Rezultatul a fost copiat!",
    copiedChallenge: "Challenge copiat! Trimite-l prietenilor 🔥",
    copyError: "Nu am putut copia.",
    noImage: "Nu a fost găsită nicio imagine pentru analiză.",
    error: "Nu am putut analiza poza.",
  },

  en: {
    homeBadge: "Viral Vibe Scanner",
    homeTitle1: "Upload a photo.",
    homeTitle2: "See what vibe you give off.",
    homeDesc:
      "Upload a photo and instantly find out what energy you give off: aura score, mystery level, charm, and first impression.",
    homeCta: "Test your vibe",
    homeHow: "How it works",
    homeNote: "Your friends probably won’t get the same score 👀",

    analyzeBadge: "Upload your photo",
    analyzeTitle: "Upload your photo",
    analyzeDesc: "Choose an image and let the app generate your vibe instantly.",
    analyzeTip:
      "The clearer the photo, the more accurate the result feels 👀",
    uploadTitle: "Choose a photo",
    uploadDesc: "JPG, PNG or WEBP. Best results: clear, well-lit photo.",
    uploadBtn: "Analyze photo",
    uploadLoading: "Uploading...",

    resultTitle: "Your result",
    resultDesc: "Instant first impression generated from your image",
    resultBadge: "🔥 Vibe detected",
    loadingTitle: "Scanning your vibe...",
    loadingDesc:
      "Analyzing your energy, magnetism, and first-impression impact...",
    loadingSteps: [
      "Reading facial energy...",
      "Measuring confidence...",
      "Detecting mystery...",
      "Calculating charm score...",
      "Finalizing aura result...",
    ],
    auraScore: "Aura Score",
    auraText: "Send this result to a friend and see who gets the higher score.",
    confidence: "Confidence",
    mystery: "Mystery",
    charm: "Charm",
    shareNote:
      "Post your result to your story or send the challenge to a friend to compare your vibe.",
    copyLink: "Copy link",
    copyResult: "Copy result",
    challenge: "Challenge a friend 🔥",
    retry: "Try another photo 🔁",
    back: "← Back",

    copiedLink: "Link copied!",
    copiedResult: "Result copied!",
    copiedChallenge: "Challenge copied! Send it to your friends 🔥",
    copyError: "Could not copy.",
    noImage: "No image was found for analysis.",
    error: "Could not analyze the image.",
  },

  de: {
    homeBadge: "Viral Vibe Scanner",
    homeTitle1: "Lade ein Foto hoch.",
    homeTitle2: "Sieh, welchen Vibe du ausstrahlst.",
    homeDesc:
      "Lade ein Foto hoch und finde sofort heraus, welche Energie du ausstrahlst: Aura Score, Mystery Level, Charm und First Impression.",
    homeCta: "Teste deinen Vibe",
    homeHow: "Wie es funktioniert",
    homeNote: "Deine Freunde bekommen wahrscheinlich nicht denselben Score 👀",

    analyzeBadge: "Foto hochladen",
    analyzeTitle: "Lade dein Foto hoch",
    analyzeDesc:
      "Wähle ein Bild und lass die App sofort deinen Vibe generieren.",
    analyzeTip:
      "Je klarer das Foto, desto genauer wirkt das Ergebnis 👀",
    uploadTitle: "Wähle ein Foto",
    uploadDesc: "JPG, PNG oder WEBP. Am besten: klares, gut beleuchtetes Foto.",
    uploadBtn: "Foto analysieren",
    uploadLoading: "Wird hochgeladen...",

    resultTitle: "Dein Ergebnis",
    resultDesc: "Sofortige First Impression basierend auf deinem Bild",
    resultBadge: "🔥 Vibe erkannt",
    loadingTitle: "Dein Vibe wird gescannt...",
    loadingDesc:
      "Wir analysieren Energie, Magnetismus und den Eindruck auf den ersten Blick...",
    loadingSteps: [
      "Gesichtsenergie wird gelesen...",
      "Selbstbewusstsein wird gemessen...",
      "Mystery wird erkannt...",
      "Charm Score wird berechnet...",
      "Aura Ergebnis wird finalisiert...",
    ],
    auraScore: "Aura Score",
    auraText:
      "Schick dieses Ergebnis an einen Freund und schau, wer den höheren Score hat.",
    confidence: "Confidence",
    mystery: "Mystery",
    charm: "Charm",
    shareNote:
      "Poste dein Ergebnis in deiner Story oder schicke die Challenge an einen Freund, um euren Vibe zu vergleichen.",
    copyLink: "Link kopieren",
    copyResult: "Ergebnis kopieren",
    challenge: "Challenge a friend 🔥",
    retry: "Anderes Foto testen 🔁",
    back: "← Zurück",

    copiedLink: "Link kopiert!",
    copiedResult: "Ergebnis kopiert!",
    copiedChallenge: "Challenge kopiert! Schick sie deinen Freunden 🔥",
    copyError: "Kopieren nicht möglich.",
    noImage: "Kein Bild für die Analyse gefunden.",
    error: "Das Bild konnte nicht analysiert werden.",
  },
};