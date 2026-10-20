// "How it works" — walks a new customer through what happens after they get in touch
const steps = [
  {
    title: "Get in touch",
    description: "Give us a call or send an email. Tell us about your car and what it needs.",
  },
  {
    title: "Free estimate",
    description: "We look the car over and give you a clear estimate before any work begins.",
  },
  {
    title: "The work",
    description: "Everything is carried out in our own Fernhurst workshop, with care and respect for originality.",
  },
  {
    title: "Back on the road",
    description: "Collect your car from the workshop, ready to drive and enjoy.",
  },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="bg-[var(--cream-light)] py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-[var(--burgundy)]">
              How it works
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-[var(--charcoal)] sm:text-4xl md:text-5xl">
              From first call to collection
            </h2>
          </div>
          <a
            href="#contact"
            className="btn-primary inline-flex w-fit shrink-0 items-center rounded-[6px] px-8 py-4 font-ui text-sm font-semibold uppercase tracking-wider"
          >
            Book a Free Estimate
          </a>
        </div>

        <ol className="mt-16 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-[var(--charcoal)]/15 py-8 first:border-[var(--burgundy)]">
              <span className="font-ui text-sm font-semibold tracking-wider text-[var(--burgundy)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-bold text-[var(--charcoal)]">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-base leading-relaxed text-[var(--grey-medium)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
