const certifications = [
  "Atlassian Agile Project Management Professional Certificate (LinkedIn Learning)",
  "Career Essentials in Business Analysis by Microsoft and LinkedIn (LinkedIn Learning)",
  "Lean Six Sigma AI Yellow Belt (Sparen & Gewinn - CSSC)",
  "Introduction to Generative AI (AWS)",
];

const certificationLinks = [
  "https://www.linkedin.com/learning/certificates/ac6f2e5edec8e1aa36c502b578cf84dba5995ed6829aefe714f31300be377466/",
  "https://www.linkedin.com/learning/certificates/27b0cbce7ec2b043d408f9ed023c40fdfbcca5004ac3050313facfa78f74fc7d/",
  "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Fodvco%2Ecom%2Fsparengewinnai3%2F%3Fid%3DSG2024AI34820&urlhash=5FUD&isSdui=true",
  "https://www.aws.training/",
];

export function Certifications() {
  return (
    <section className="relative z-10 overflow-hidden border-y border-white/5 bg-black py-28 text-white" id="certifications">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-gray-500">Certifications</p>
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {certifications.map((name, index) => (
            <a
              key={name}
              href={certificationLinks[index]}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] p-6 shadow-[0_24px_64px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-[32px]"
            >
              <div className="pointer-events-none absolute -top-px inset-x-10 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02]" />
              <p className="relative z-10 text-base font-medium text-gray-100">{name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
