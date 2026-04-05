import { NextResponse } from "next/server";

type Lang = "ro" | "en" | "de";

type ResultBase = {
  vibe: string;
  description: string;
};

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getDeterministicNumber(seed: number, min: number, max: number) {
  return min + (seed % (max - min + 1));
}

const results: Record<Lang, ResultBase[]> = {
  ro: [
    {
      vibe: "Main Character Energy",
      description:
        "Pari genul de persoană care intră într-o cameră și schimbă instant energia locului.",
    },
    {
      vibe: "Dangerous Charm",
      description:
        "Ai un vibe atrăgător și puțin imprevizibil, fix genul care rămâne în mintea oamenilor.",
    },
    {
      vibe: "Elite Aura",
      description:
        "Transmiți un mix de clasă, siguranță și standarde foarte ridicate.",
    },
    {
      vibe: "Heartbreaker Vibe",
      description:
        "Ai o energie care atrage rapid atenția și lasă impresia că nu ești ușor de uitat.",
    },
    {
      vibe: "Soft Power",
      description:
        "Pari calm, controlat și puternic fără să forțezi nimic.",
    },
    {
      vibe: "Mystery Magnet",
      description:
        "Ai un aer enigmatic care îi face pe oameni să vrea să afle mai mult despre tine.",
    },
    {
      vibe: "Boss Energy",
      description:
        "Transmiți control, încredere și o prezență care domină natural spațiul.",
    },
    {
      vibe: "Unapproachable Beauty",
      description:
        "Pari foarte atrăgător, dar și greu de citit, ceea ce îți crește și mai mult impactul.",
    },
    {
      vibe: "Golden Retriever Energy",
      description:
        "Ai un vibe cald, simpatic și foarte ușor de plăcut încă din primele secunde.",
    },
    {
      vibe: "Silent Flex",
      description:
        "Pari genul care nu se laudă, dar tot transmite valoare și siguranță.",
    },
  ],
  en: [
    {
      vibe: "Main Character Energy",
      description:
        "You feel like the kind of person who enters a room and instantly changes the energy.",
    },
    {
      vibe: "Dangerous Charm",
      description:
        "You give off an attractive, slightly unpredictable vibe that sticks in people’s minds.",
    },
    {
      vibe: "Elite Aura",
      description:
        "You project a mix of class, confidence, and very high standards.",
    },
    {
      vibe: "Heartbreaker Vibe",
      description:
        "You have the kind of energy that grabs attention fast and feels hard to forget.",
    },
    {
      vibe: "Soft Power",
      description:
        "You come across as calm, controlled, and powerful without trying too hard.",
    },
    {
      vibe: "Mystery Magnet",
      description:
        "You have an enigmatic aura that makes people want to know more about you.",
    },
    {
      vibe: "Boss Energy",
      description:
        "You project control, confidence, and a presence that naturally dominates the room.",
    },
    {
      vibe: "Unapproachable Beauty",
      description:
        "You seem highly attractive yet hard to read, which makes your impact even stronger.",
    },
    {
      vibe: "Golden Retriever Energy",
      description:
        "You give off a warm, likable energy that feels instantly approachable.",
    },
    {
      vibe: "Silent Flex",
      description:
        "You seem like someone who does not show off, but still radiates value and confidence.",
    },
  ],
  de: [
    {
      vibe: "Main Character Energy",
      description:
        "Du wirkst wie die Art von Person, die einen Raum betritt und sofort die Energie verändert.",
    },
    {
      vibe: "Dangerous Charm",
      description:
        "Du hast eine attraktive, leicht unberechenbare Ausstrahlung, die im Kopf bleibt.",
    },
    {
      vibe: "Elite Aura",
      description:
        "Du strahlst Klasse, Selbstsicherheit und sehr hohe Standards aus.",
    },
    {
      vibe: "Heartbreaker Vibe",
      description:
        "Du hast eine Energie, die schnell Aufmerksamkeit zieht und schwer zu vergessen ist.",
    },
    {
      vibe: "Soft Power",
      description:
        "Du wirkst ruhig, kontrolliert und stark, ohne dich anzustrengen.",
    },
    {
      vibe: "Mystery Magnet",
      description:
        "Du hast eine geheimnisvolle Aura, die Menschen neugierig auf dich macht.",
    },
    {
      vibe: "Boss Energy",
      description:
        "Du strahlst Kontrolle, Selbstvertrauen und eine starke Präsenz aus.",
    },
    {
      vibe: "Unapproachable Beauty",
      description:
        "Du wirkst sehr attraktiv, aber auch schwer zu lesen, was deinen Eindruck noch stärker macht.",
    },
    {
      vibe: "Golden Retriever Energy",
      description:
        "Du hast eine warme, sympathische Ausstrahlung, die sofort angenehm wirkt.",
    },
    {
      vibe: "Silent Flex",
      description:
        "Du wirkst wie jemand, der nicht angibt, aber trotzdem Wert und Selbstvertrauen ausstrahlt.",
    },
  ],
};

export async function POST(req: Request) {
  try {
    const { imageUrl, lang } = await req.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Missing imageUrl" },
        { status: 400 }
      );
    }

    const safeLang: Lang =
      lang === "ro" || lang === "de" || lang === "en" ? lang : "en";

    const seed = hashString(imageUrl);
    const list = results[safeLang];
    const base = list[seed % list.length];

    const confidence = getDeterministicNumber(seed * 3, 70, 98);
    const mystery = getDeterministicNumber(seed * 7, 40, 95);
    const charm = getDeterministicNumber(seed * 11, 65, 99);
    const aura = Math.round((confidence + mystery + charm) / 3);

    return NextResponse.json({
      vibe: base.vibe,
      description: base.description,
      confidence,
      mystery,
      charm,
      aura,
    });
  } catch (error) {
    console.error("ANALYZE ERROR:", error);

    return NextResponse.json(
      {
        vibe: "Error",
        description: "Could not analyze image.",
        confidence: 74,
        mystery: 68,
        charm: 81,
        aura: 74,
      },
      { status: 200 }
    );
  }
}