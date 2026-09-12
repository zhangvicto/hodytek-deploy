import Link from "next/link";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-heading">
      <div className="shell">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
      </div>
    </section>
  );
}

export function ProjectCTA() {
  return (
    <section className="project-cta shell">
      <div>
        <p className="eyebrow">LET’S WORK TOGETHER</p>
        <h2>The right support for your next project.</h2>
        <p>
          Talk to our team about products, specifications, and integrated
          solutions.
        </p>
      </div>
      <Link href="/contact" className="button button-primary">
        Discuss your project <Arrow />
      </Link>
    </section>
  );
}
