import Link from "next/link";
import { Closing, Founder, PhotoFrame, SectionHeading } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { programs } from "@/lib/programs";
import { foundation } from "@/lib/site";

export const metadata = pageMetadata("Home", foundation.summary, "/");

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">A Healthcare Nonprofit</p>
            <h1><span>Advancing health.</span> <em>Creating<br />{" "}opportunity.</em></h1>
            <p className="lead">Supporting future healthcare professionals and expanding access to essential medical resources for communities in need.</p>
            <div className="actions">
              <Link className="button button-primary" href="#mission">Explore our mission</Link>
              <Link className="button button-outline" href="/get-involved#donate">Support the Foundation</Link>
            </div>
          </div>
          <figure className="hero-figure">
            <PhotoFrame photo={photos.hero} className="hero-image" priority sizes="(max-width: 760px) 96vw, (max-width: 1480px) 53vw, 735px" />
            <figcaption>Illustrative healthcare photography</figcaption>
          </figure>
        </div>
      </section>

      <section className="band mission" id="mission">
        <div className="wrap">
          <SectionHeading label="Our Mission" title="A commitment to care. A foundation for change.">
            <p className="lead">{foundation.mission}</p>
            <Link href="/about" className="text-link">About the Foundation</Link>
          </SectionHeading>
        </div>
      </section>

      <section className="band focus">
        <div className="wrap">
          <div className="focus-head">
            <div>
              <p className="eyebrow">Our Focus</p>
              <h2>Where we direct support.</h2>
            </div>
            <Link className="text-link" href="/programs">Explore all programs</Link>
          </div>
          <div className="focus-grid">
            <PhotoFrame photo={photos.education} className="focus-image" />
            <ul className="focus-list">
              {programs.map(({ id, title, short, icon: Icon }) => (
                <li key={id}>
                  <Link href={`/programs#${id}`}>
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    <div><h3>{title}</h3><p>{short}</p></div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="vision">
        <PhotoFrame photo={photos.community} className="vision-image" sizes="(max-width: 760px) 100vw, 55vw" />
        <div className="vision-pane">
          <p className="eyebrow">Our Vision</p>
          <h2>Access to the resources that make care possible.</h2>
          <p>{foundation.vision}</p>
        </div>
      </section>

      <Founder />

      <section className="band involvement">
        <div className="wrap involvement-grid">
          <div>
            <p className="eyebrow">Get Involved</p>
            <h2>Make a contribution that fits.</h2>
          </div>
          <div className="involvement-links">
            <div><Link className="text-link" href="/get-involved#donate">Support the mission</Link><p>Find out how to support the Foundation’s work.</p></div>
            <div><Link className="text-link" href="/get-involved#partnerships">Become a partner</Link><p>Explore how your organization could meet a practical need.</p></div>
            <div><Link className="text-link" href="/get-involved#volunteer">Volunteer or collaborate</Link><p>Start a conversation about sharing your time or expertise.</p></div>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
