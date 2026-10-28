import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About the YAML to JSON Converter",
  description:
    "About this free online YAML to JSON converter. It runs in your browser, with no account, no payment, and no sign-up.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="prose">
      <div className="wrap measure">
        <h1>About</h1>
        <p className="lede">
          yamltojson is a free online converter for one job: turn YAML into JSON,
          or JSON back into YAML.
        </p>
        <p>
          Paste a document, copy the result, and leave. There is no account, no
          history, and no paid plan. Parsing happens in your browser with the
          open-source yaml package. The page itself is a small Next.js site, and
          it does not send the contents of the editor to a server.
        </p>
        <p>
          The tool is meant for everyday config and data: workflow files, app
          settings, and manifests. It is not a general programming environment,
          and it will refuse a few shapes JSON cannot store, such as circular
          aliases and non-finite numbers.
        </p>
        <p>
          Source for this site is on{" "}
          <a href="https://github.com/kkchan1999/yamltojson">GitHub</a>.
        </p>
      </div>
    </article>
  );
}
