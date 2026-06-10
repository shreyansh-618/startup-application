"use client";

import { useReveal } from "@/hooks/useReveal";

const picks = [
  {
    no: "01",
    title: "You have real conviction",
    desc: "A clear idea you're obsessed with and the drive to build it now — not someday.",
  },
  {
    no: "02",
    title: "You have early momentum",
    desc: "A wedge, a waitlist, early users, a sharp insight — some signal you're onto something.",
  },
  {
    no: "03",
    title: "You move fast",
    desc: "You'd rather ship a real MVP in 30 days than polish a deck for three months.",
  },
  {
    no: "04",
    title: "You want a partner, not a vendor",
    desc: "You're up for a long-term, aligned build — a studio in your corner, not an agency sending invoices.",
  },
];

export default function WhoWePick() {
  const titleRef = useReveal<HTMLHeadingElement>();

  return (
    <section className="sec" id="who" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <span className="no">02</span>
          <span className="lab">Who we pick</span>
        </div>

        <h2
          ref={titleRef as React.RefObject<HTMLHeadingElement>}
          className="sec-title rv"
          style={{ marginBottom: 40 }}
        >
          Five founders.{" "}
          <em>We&apos;re picky.</em>
        </h2>

        <div className="pick">
          {picks.map((pick, i) => (
            <PickCard key={pick.no} pick={pick} delay={((i % 2) + 1).toString()} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PickCard({ pick, delay }: { pick: (typeof picks)[0]; delay?: string }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-d={delay}
      className="p rv"
    >
      <div className="pi">{pick.no}</div>
      <h4>{pick.title}</h4>
      <p>{pick.desc}</p>
    </div>
  );
}
