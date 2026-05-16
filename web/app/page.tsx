export default function ArrivalPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-8 text-center">
      <p
        className="text-sm uppercase tracking-[0.4em] text-amber-grey"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Vespera
      </p>
      <h1
        className="mt-12 text-5xl leading-tight text-cream sm:text-6xl"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        Sept soirées.
        <br />
        Cinq inconnus.
        <br />
        Une vérité.
      </h1>
      <p
        className="mt-16 text-base text-amber-grey"
        style={{ fontFamily: "var(--font-fraunces)" }}
      >
        V.
      </p>
    </main>
  );
}
