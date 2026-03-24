import Image from "next/image";

export default function UnderConstruction() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_45%,#ffffff_100%)] px-6 py-16 text-slate-900">
      <div className="construction-orb construction-orb--one" aria-hidden="true" />
      <div className="construction-orb construction-orb--two" aria-hidden="true" />

      <div className="construction-panel relative z-10 w-full max-w-2xl rounded-3xl border border-white/70 bg-white/70 p-8 text-center shadow-[0_10px_80px_rgba(59,130,246,0.18)] backdrop-blur-xl sm:p-12">
        <Image
          className="mx-auto mb-6"
          src="/10xdevs-bg-removed.svg"
          alt="10xdevs logo"
          width={100}
          height={100}
          priority
        />

        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
          <span className="construction-dot" aria-hidden="true" />
          Coming Soon
        </p>

        <h1 className="text-balance text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Website is Under Construction
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
          We are building something fresh and useful for you. Core pages are being
          prepared and this temporary screen will be replaced soon.
        </p>

        <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600">
          <span className="construction-pulse" aria-hidden="true" />
          Project setup in progress
        </div>
      </div>
    </section>
  );
}
