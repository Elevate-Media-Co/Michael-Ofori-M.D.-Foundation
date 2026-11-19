import Link from "next/link";
import { PageIntro } from "@/components/editorial";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy", "How information submitted through the Foundation website is used.", "/privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageIntro label="Website Information" title="Privacy" summary="How this website handles information when you contact or support the Foundation." />
      <div className="wrap legal">
        <h2>Contact inquiries</h2>
        <p>When the contact form is enabled, it sends the name, email address, inquiry type, and message you provide to the Foundation through an email delivery service. The Foundation uses this information to review and respond to your inquiry. Please keep medical records and other sensitive information out of the form.</p>
        <h2>Website hosting</h2>
        <p>The hosting provider may process routine technical information, such as IP addresses and request logs, to operate and protect the site.</p>
        <h2>External services</h2>
        <p>If an online giving link is available, it takes you to an external service governed by that provider’s privacy notice. Payment details entered there are handled by the provider.</p>
        <h2>Questions</h2>
        <p><Link className="text-link" href="/contact">Contact the Foundation</Link> with questions about information you have shared.</p>
      </div>
    </>
  );
}
