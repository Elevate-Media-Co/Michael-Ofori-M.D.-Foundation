import { Closing, Founder, PageIntro, SectionHeading } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/lib/photos";
import { foundation } from "@/lib/site";

export const metadata = pageMetadata("About", "Learn about the Foundation’s mission, vision, values, and founder, Dr. Michael K. Ofori.", "/about");

const values = [
  { title: "Access", description: "Financial or social circumstances should not determine who can pursue a healthcare education or receive essential care." },
  { title: "Practical support", description: "Supplies, equipment, and educational assistance should respond to needs people and institutions identify for themselves." },
  { title: "Collaboration", description: "Local healthcare and education teams can help determine which resources would be useful and how to put them to work." },
  { title: "Stewardship", description: "We consider how resources will be used, supported, and sustained before pursuing a contribution." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro label="About the Foundation" title="The resources that make care possible." summary={foundation.summary} photo={photos.team} />

      <section className="band">
        <div className="wrap">
          <SectionHeading label="Our Story" title="How healthcare education and access connect.">
            <p className="lead">The Michael Ofori M.D. Foundation brings together support for people training to provide care and for the facilities where care is delivered. Its purpose is to improve access to the education, equipment, and supplies that both depend on.</p>
          </SectionHeading>
        </div>
      </section>

      <section className="band tint">
        <div className="wrap paired-statements">
          <div><p className="eyebrow">Our Mission</p><h2>Advance health and opportunity.</h2><p>{foundation.mission}</p></div>
          <div><p className="eyebrow">Our Vision</p><h2>Build healthier communities.</h2><p>{foundation.vision}</p></div>
        </div>
      </section>

      <section className="band">
        <div className="wrap values-grid">
          <div><p className="eyebrow">Our Values</p><h2>How we make decisions.</h2></div>
          <dl>
            {values.map(({ title, description }) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}
          </dl>
        </div>
      </section>

      <Founder full />

      <section className="band tint">
        <div className="wrap">
          <SectionHeading label="Responsible Support" title="Start with what a community needs.">
            <p className="lead">When evaluating a potential initiative, the Foundation considers the need, whether the proposed support is suitable, and who will be responsible for delivering or maintaining it. Clinical decisions remain with qualified healthcare teams.</p>
          </SectionHeading>
        </div>
      </section>
      <Closing />
    </>
  );
}
