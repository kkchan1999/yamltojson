import Link from "next/link";
import { Converter } from "@/components/Converter";
import { JsonLd } from "@/components/JsonLd";
import { faqs } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YAML to JSON Converter",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  isAccessibleForFree: true,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webAppJsonLd} />
      <JsonLd data={faqJsonLd} />
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Free online tool</p>
          <h1>YAML to JSON Converter</h1>
          <p className="lede">
            Paste YAML on the left and copy formatted JSON from the right. It is
            free, it runs in your browser, and it does not ask you to sign up.
          </p>
        </div>
      </section>
      <section className="tool" aria-label="Converter">
        <div className="container">
          <Converter />
        </div>
      </section>
      <section className="notes" aria-labelledby="notes-heading">
        <div className="container measure">
          <h2 id="notes-heading">What changes when YAML becomes JSON</h2>
          <p>
            Comments are removed, and anchors are written out in full. Merge keys
            ({"<<"}) are applied. Several documents in one paste become a JSON
            array. The result is indented with two spaces. For the steps, and a
            few rules about quotes and numbers, see{" "}
            <Link href="/how-to">how to convert YAML to JSON</Link>.
          </p>
        </div>
      </section>
      <section className="faq" aria-labelledby="faq-heading">
        <div className="container measure">
          <h2 id="faq-heading">Questions</h2>
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
