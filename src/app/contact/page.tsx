import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 pb-8 border-b-2 border-border-bright/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 border border-border-bright bg-bg-surface px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-purple-400 animate-pulse" />
            <span className="font-pixel text-[10px] text-text-accent">
              NIGHT PURPLE // 04 CONTACT
            </span>
          </div>

          <Link
            href="/"
            className="border-2 border-border-bright bg-bg-surface px-4 py-2 font-pixel text-xs text-text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:border-accent-primary hover:text-accent-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            ◀ RETURN TO HOME (SUNSET)
          </Link>
        </div>

        <div>
          <h1 className="font-pixel text-2xl leading-relaxed text-text-primary sm:text-3xl lg:text-4xl">
            TRANSMIT <span className="text-accent-primary">MESSAGE</span>
          </h1>
          <p className="mt-2 max-w-2xl text-base text-text-secondary">
            Send carrier ravens or establish crystal resonance under the mystical purple night sky.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-xl border-2 border-border-bright bg-bg-surface/70 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] backdrop-blur-xs">
        <div className="space-y-4">
          <div>
            <label className="block font-pixel text-xs text-text-accent mb-1">CALLSIGN / EMAIL</label>
            <input
              type="text"
              placeholder="mage@citadel.realm"
              className="w-full border border-border-bright bg-bg-deep px-3 py-2 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-pixel text-xs text-text-accent mb-1">TRANSMISSION CONTENT</label>
            <textarea
              rows={4}
              placeholder="State your quest inquiry..."
              className="w-full border border-border-bright bg-bg-deep px-3 py-2 text-xs text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="w-full border-2 border-accent-primary bg-accent-primary px-4 py-2.5 font-pixel text-xs text-bg-deep shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all hover:bg-accent-primary/90 active:translate-x-[1px] active:translate-y-[1px]"
          >
            SEND TRANSMISSION ▶
          </button>
        </div>
      </div>
    </div>
  );
}
