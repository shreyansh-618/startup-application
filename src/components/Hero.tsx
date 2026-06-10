"use client";

import { useEffect, useState } from "react";
import SelectionCard from "./SelectionCard";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setLoaded(true))
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={loaded ? "loaded" : ""}>
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="hero-meta">
                <span className="kicker">
                  <span className="dot" /> Venture Studio — by selection
                </span>
                <span className="kicker">
                  Y Combinator · Forbes 30U30
                </span>
              </div>

              <h1>
                <span className="l"><span>We back five</span></span>
                <span className="l"><span>startups <em>a quarter.</em></span></span>
              </h1>

              <p className="lead">
                We don&apos;t take clients — we choose five founders and invest in
                building their product.{" "}
                <b>We build your MVP free for 30 days</b>
                , then keep building through a six-month, super-subsidized
                incubation. If we pick you, we&apos;re in it together.
              </p>

              <div className="hero-actions">
                <a href="#apply" className="btn btn-accent">
                  Apply for a seat <span className="ar">↗</span>
                </a>
                <a href="#model" className="btn btn-line">
                  How it works
                </a>
              </div>

              <div className="hero-note">
                Free 30-day build · 6-month super-subsidized incubation · by
                selection only
              </div>
            </div>

            <div>
              <SelectionCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
