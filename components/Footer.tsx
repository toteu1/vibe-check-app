import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* TOP */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-lg font-semibold text-white">
              Viral Vibe Scanner
            </div>
            <p className="mt-2 text-sm text-white/50 max-w-xs">
              Discover your vibe, aura, and first impression instantly.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/60">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <a
              href="#"
              className="transition hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Viral Vibe Scanner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}