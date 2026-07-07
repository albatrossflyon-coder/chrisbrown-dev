import { bio } from "@/data/bio";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-(--color-surface) px-6 py-10 text-center font-mono text-xs text-(--color-muted)">
      <p>
        {bio.name} — {bio.headline}
      </p>
      <div className="flex gap-4">
        <a
          href={bio.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-(--color-signal)"
        >
          GitHub
        </a>
        <a href={bio.links.email} className="hover:text-(--color-signal)">
          Email
        </a>
      </div>
    </footer>
  );
}
