import Link from "next/link";
import { Closing, PageIntro, SectionHeading } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";

export const metadata = pageMetadata("Impact", "See what the Foundation intends to report about community initiatives, healthcare resources, and educational support.", "/impact");

const reportingAreas = [
  { title: "Community Initiatives", description: "The local need, what the initiative set out to do, and how participating organizations contributed." },
  { title: "Healthcare Resource Support", description: "The types of equipment or supplies provided, the settings they served, and any confirmed follow-up." },
  { title: "Educational Opportunity", description: "The kinds of assistance offered and, where appropriate, verified aggregate information about who it reached." },
];

export default function ImpactPage() {
  return (
    <>
      <PageIntro label="Impact & Transparency" title="How we’ll report on our work." summary="This page will share verified information about Foundation initiatives, resources provided, and educational support." photo={photos.community} />
      <section className="band">
        <div className="wrap values-grid">
          <div><p className="eyebrow">Reporting Priorities</p><h2>What we plan to share.</h2></div>
          <ul className="reporting-list">
            {reportingAreas.map(({ title, description }) => (
              <li key={title}><h3>{title}</h3><p>{description}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="band tint">
        <div className="wrap">
          <SectionHeading label="Future Impact Reports" title="Foundation reports">
            <p className="lead">Impact reports will be published here once reviewed and available.</p>
          </SectionHeading>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <SectionHeading label="Project Updates" title="Updates from our programs">
            <p className="lead">Project updates will appear here as verified information becomes available.</p>
            <Link className="text-link" href="/programs">Explore the Foundation’s programs</Link>
          </SectionHeading>
        </div>
      </section>
      <Closing title="Have a question about our work?" href="/contact" action="Contact the Foundation" />
    </>
  );
}
