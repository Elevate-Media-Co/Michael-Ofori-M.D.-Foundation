import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { foundation } from "@/lib/site";
import { type Photo } from "@/lib/photos";

export function PhotoFrame({
  photo, className = "", sizes = "(max-width: 760px) 100vw, (max-width: 1300px) 52vw, 680px", priority = false,
}: { photo: Photo; className?: string; sizes?: string; priority?: boolean }) {
  return (
    <div className={`photo-frame ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} preload={priority} style={{ objectPosition: photo.position }} />
    </div>
  );
}

export function PageIntro({
  label, title, summary, photo,
}: { label: string; title: string; summary: string; photo?: Photo }) {
  return (
    <section className={`page-intro ${photo ? "page-intro-photo" : ""}`}>
      <div className="wrap page-intro-inner">
        <div>
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className="lead">{summary}</p>
        </div>
        {photo && <PhotoFrame photo={photo} className="intro-image" priority />}
      </div>
    </section>
  );
}

export function SectionHeading({
  label, title, children,
}: { label: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export function Founder({ full = false }: { full?: boolean }) {
  return (
    <section className="band founder" id="founder">
      <div className="wrap founder-grid">
        {foundation.founderPortrait ? (
          <PhotoFrame photo={{ src: foundation.founderPortrait, alt: foundation.founder }} className="founder-image founder-portrait" sizes="(max-width: 480px) 90vw, 400px" />
        ) : (
          <div className="founder-image founder-placeholder" aria-hidden="true">
            <span>MO</span>
          </div>
        )}
        <div className="founder-copy">
          <p className="eyebrow">Our Founder</p>
          <h2>{foundation.founder}</h2>
          <p>Dr. Michael K. Ofori is a physician in anesthesiology and the founder of the Michael Ofori M.D. Foundation. The Foundation’s work centers on access to healthcare education, essential supplies, and equipment for community hospitals.</p>
          {full ? (
            <Link className="text-link" href="/contact">Contact the Foundation</Link>
          ) : (
            <Link className="text-link" href="/about#founder">Learn about the Foundation</Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function Closing({
  title = "Better healthcare begins with opportunity.",
  href = "/get-involved",
  action = "Get involved",
}: { title?: string; href?: string; action?: string }) {
  return (
    <section className="closing">
      <div className="wrap closing-inner">
        <h2>{title}</h2>
        <Link href={href} className="button button-light">{action}</Link>
      </div>
    </section>
  );
}
