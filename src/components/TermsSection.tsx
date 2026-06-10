"use client";

import { useReveal } from "@/hooks/useReveal";

const terms = [
  {
    no: "01",
    title: "The free build",
    desc: "A full team starts on day one and builds your MVP — completely free for the first 30 days. You see how good we are before anything is owed.",
    tag: "30 days · free",
  },
  {
    no: "02",
    title: "The incubation",
    desc: "We don't stop at the free month. We keep building for six months on a deeply super-subsidized basis while you find traction.",
    tag: "6 months · super-subsidized",
  },
  {
    no: "03",
    title: "The partnership",
    desc: "From there we grow with you — aligned, hands-on, and invested in what you're building for the long run.",
    tag: "long-term partners",
  },
];

export default function TermsSection() {
  const headRef = useReveal<HTMLDivElement>();
  const introRef = useReveal<HTMLParagraphElement>();

  return (
    <section className="sec" id="model">
      <div className="wrap">
        <div className="sec-head">
          <span className="no">01</span>
          <span className="lab">The model</span>
          <span className="lab r">Founder-friendly by design</span>
        </div>

        <h2
          ref={headRef as React.RefObject<HTMLHeadingElement>}
          className="sec-title rv"
        >
          We invest in you —{" "}
          <em>then we grow together.</em>
        </h2>

        <p
          ref={introRef as React.RefObject<HTMLParagraphElement>}
          className="sec-intro rv"
        >
          Most studios bill by the hour and disappear. We pick five founders a
          quarter and back them like a studio should: build first, charge gently,
          stay aligned.
        </p>

        <div className="terms" style={{ marginTop: 40 }}>
          {terms.map((term) => (
            <TermItem key={term.no} term={term} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TermItem({ term }: { term: (typeof terms)[0] }) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="term rv"
    >
      <span className="tno">{term.no}</span>
      <div>
        <h4>{term.title}</h4>
        <p>{term.desc}</p>
      </div>
      <span className="tag">{term.tag}</span>
    </div>
  );
}
