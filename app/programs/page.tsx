import Link from "next/link";
import { Closing, PageIntro, PhotoFrame } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";
import { programs } from "@/lib/programs";

export const metadata = pageMetadata("Programs", "Explore four areas of support, from medical and dental education to hospital equipment and rural clinic supplies.", "/programs");

export default function ProgramsPage() {
  return (
    <>
      <PageIntro label="Our Programs" title="Where we direct support." summary="Four areas of work connect healthcare education with the needs of hospitals, clinics, and the communities they serve." />
      <nav aria-label="Program sections" className="jump-nav">
        <ul className="wrap">
          {programs.map(({ id, title }) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}
        </ul>
      </nav>

      <div className="wrap program-list">
        {programs.map(({ id, title, detail, photo, action, inquiry, icon: Icon }) => (
          <section className="program-row" id={id} key={id}>
            <PhotoFrame photo={photo} className="program-image" />
            <div className="program-copy">
              <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
              <h2>{title}</h2>
              <p>{detail}</p>
              <Link className="text-link" href={`/contact?inquiry=${inquiry}`}>{action}</Link>
            </div>
          </section>
        ))}
      </div>
      <Closing title="Help meet a practical need." />
    </>
  );
}
