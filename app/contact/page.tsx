import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/editorial";
import { contactSettings, publicDetails } from "@/lib/config";
import { inquiryLabel } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Contact the Michael Ofori M.D. Foundation about programs, giving, and partnerships.", "/contact");

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ inquiry?: string | string[] }> }) {
  const { inquiry } = await searchParams;
  const initialType = typeof inquiry === "string" && inquiryLabel(inquiry) ? inquiry : "";
  const available = Boolean(contactSettings());

  return (
    <>
      <PageIntro label="Contact" title="Contact the Foundation." summary="For questions about the Foundation’s programs, giving, or a potential partnership, tell us what you have in mind." />
      <section className="band">
        <div className="wrap contact-grid">
          <div className="contact-sidebar">
            <Mail size={27} strokeWidth={1.5} aria-hidden="true" />
            <h2>Send an inquiry.</h2>
            {!available && <p className="configuration-note">Online inquiries are awaiting setup.{publicDetails.email ? " You can use the email address below." : " Contact information will be published here when available."}</p>}
            {publicDetails.email && <a className="text-link" href={`mailto:${publicDetails.email}`}>{publicDetails.email}</a>}
            {publicDetails.location && <p>{publicDetails.location}</p>}
          </div>
          <ContactForm key={initialType} available={available} initialType={initialType} />
        </div>
      </section>
    </>
  );
}
