import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band">
      <div className="wrap">
        <p className="eyebrow">Page Not Found</p>
        <h1>We couldn’t find this page.</h1>
        <p className="lead">Visit the homepage to find the Foundation’s programs and contact information.</p>
        <Link className="button button-primary" href="/">Return home</Link>
      </div>
    </section>
  );
}
