// Quick-glance credibility facts shown directly under the hero
const facts = [
  { figure: "10+", label: "Years working on classic cars" },
  { figure: "Free", label: "Estimates before any work begins" },
  { figure: "30 min", label: "From Goodwood Motor Circuit" },
  { figure: "5", label: "Specialist services under one roof" },
];

export default function TrustBar() {
  return (
    <section aria-label="Why choose Revival Motorworks" className="border-b border-[var(--charcoal)]/10 bg-[var(--cream-light)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={`px-4 py-8 sm:px-6 lg:px-8 lg:py-10 ${index % 2 === 1 ? "border-l border-[var(--charcoal)]/10" : ""} ${index >= 2 ? "border-t border-[var(--charcoal)]/10 lg:border-t-0" : ""} ${index === 2 ? "lg:border-l" : ""}`}
          >
            <p className="font-heading text-3xl font-bold text-[var(--burgundy)] sm:text-4xl">
              {fact.figure}
            </p>
            <p className="mt-2 font-body text-sm leading-snug text-[var(--grey-medium)] sm:text-base">
              {fact.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
