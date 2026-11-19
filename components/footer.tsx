import Link from "next/link";
import { Wordmark } from "./header";
import { publicDetails } from "@/lib/config";
import { foundation } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-intro">
            <Wordmark footer />
            <p>{foundation.summary}</p>
          </div>
          <nav className="footer-nav" aria-label="Foundation information">
            <h2>Explore</h2>
            <Link href="/about">About the Foundation</Link>
            <Link href="/programs">Our Programs</Link>
            <Link href="/impact">Our Impact</Link>
            <Link href="/get-involved">Get Involved</Link>
          </nav>
          <nav className="footer-nav" aria-label="Contact and social links">
            <h2>Connect</h2>
            {publicDetails.email && <a href={`mailto:${publicDetails.email}`}>{publicDetails.email}</a>}
            {publicDetails.location && <p>{publicDetails.location}</p>}
            <Link href="/contact">Contact the Foundation</Link>
            {publicDetails.social.map((link) => <a key={link.label} href={link.url}>{link.label}</a>)}
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getUTCFullYear()} {foundation.name}</p>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms of Use</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
