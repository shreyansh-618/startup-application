"use client";

import { useState, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const faqs = [
  {
    q: "Q1",
    question: "Is the first 30 days really free?",
    answer:
      "Yes — a full team builds your MVP for four weeks at zero cost. It's how you see what we can do, and how we decide we want to keep building together.",
  },
  {
    q: "Q2",
    question: "What happens after the free month?",
    answer:
      "We keep building. The next six months are a super-subsidized incubation — we stay hands-on while you find traction, on terms designed to be founder-friendly.",
  },
  {
    q: "Q3",
    question: "Why only five?",
    answer:
      "Because we go deep, not wide. Five founders a quarter is the most we can back properly with senior, hands-on attention. It keeps the bar — and the quality — high.",
  },
  {
    q: "Q4",
    question: "How are you different from an agency?",
    answer:
      "An agency bills you and moves on. We invest in you — building first, charging gently, and staying aligned for the long run. We win when you win.",
  },
  {
    q: "Q5",
    question: "When will I hear back?",
    answer:
      "We review applications on a rolling basis and reach out to the founders we want to back. If you'd rather not wait, book a call and we'll talk sooner.",
  },
];

export default function FAQ() {
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="sec-head">
          <span className="no">03</span>
          <span className="lab">Before you apply</span>
        </div>

        <div className="faq">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);
  const ref = useReveal<HTMLDetailsElement>();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <details
      ref={ref as React.RefObject<HTMLDetailsElement>}
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      className="q rv"
    >
      <summary>
        <span className="qno">{faq.q}</span>
        <span className="qt">{faq.question}</span>
        <span className="sign" />
      </summary>
      <div
        ref={contentRef}
        className="ans"
        style={{ maxHeight: open ? 240 : 0 }}
      >
        <div className="ans-in">{faq.answer}</div>
      </div>
    </details>
  );
}
