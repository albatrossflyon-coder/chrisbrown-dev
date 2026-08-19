import { bio } from "@/data/bio";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="flex flex-col items-center gap-8 border-t border-(--color-surface) bg-(--color-surface) px-6 py-20 text-center"
    >
      <div>
        <h2 className="font-display text-2xl font-bold text-(--color-paper) sm:text-3xl">
          Get In Touch
        </h2>
        <p className="mt-2 text-sm text-(--color-muted)">
          Open to junior frontend roles, always happy to talk shop.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={bio.links.phone}
          className="rounded border border-(--color-signal) px-4 py-2 font-mono text-sm text-(--color-signal) transition-colors hover:bg-(--color-signal) hover:text-(--color-ink)"
        >
          {bio.phone}
        </a>
        <a
          href={bio.links.email}
          className="rounded border border-(--color-circuit) px-4 py-2 font-mono text-sm text-(--color-circuit) transition-colors hover:bg-(--color-circuit) hover:text-(--color-ink)"
        >
          Email
        </a>
        <a
          href={bio.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-(--color-alert) px-4 py-2 font-mono text-sm text-(--color-alert) transition-colors hover:bg-(--color-alert) hover:text-(--color-ink)"
        >
          GitHub
        </a>
      </div>

      <p className="font-mono text-xs text-(--color-muted)">
        {bio.name} | {bio.headline}
      </p>
    </footer>
  );
}
