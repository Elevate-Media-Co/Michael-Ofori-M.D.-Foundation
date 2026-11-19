import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Terms of Use", "Terms for using the Michael Ofori M.D. Foundation website.", "/terms");

export default function TermsPage() {
  return (
    <>
      <PageIntro label="Website Information" title="Terms of Use" summary="Information about using the Foundation’s website and submitting inquiries." />
      <div className="wrap legal">
        <h2>Website information</h2>
        <p>This website provides general information about the Foundation and its areas of focus. For medical advice, consult a qualified healthcare professional.</p>
        <h2>Program inquiries</h2>
        <p>Use the contact form, when available, to ask about the Foundation’s work. Program inquiries do not guarantee funding, participation, or assistance.</p>
        <h2>Photography and external links</h2>
        <p>The stock healthcare photography on this site is illustrative. External sites and hosted donation services have their own terms.</p>
        <h2>Questions</h2>
        <p><Link className="text-link" href="/contact">Contact the Foundation</Link> with questions about this website.</p>
      </div>
    </>
  );
}
