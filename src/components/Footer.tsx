import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <a href="#" className="brand" aria-label="WhatBytes">
            <Logo />
          </a>
          <p>We don&apos;t take clients. We pick five.</p>
          <div className="fr">&copy; 2026 WhatBytes &middot; Toronto<br />357 Bay St., ON M5H 4A6</div>
        </div>
      </div>
    </footer>
  );
}
