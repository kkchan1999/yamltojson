import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for this free YAML to JSON converter. Pasted text is processed in your browser and is not uploaded to a server.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="prose">
      <div className="container measure">
        <h1>Privacy</h1>
        <p className="lede">
          This converter is built so the document you paste stays on your device.
        </p>

        <h2>Your text is not uploaded</h2>
        <p>
          YAML and JSON are parsed by JavaScript in your browser. Clicking Copy
          writes the output to your clipboard and does not send it anywhere. The
          site does not store editor contents, and it does not keep a history of
          what you converted.
        </p>

        <h2>What a page view includes</h2>
        <p>
          Opening the site downloads HTML, CSS, and JavaScript from the host.
          That request can show up in ordinary hosting logs: IP address, user
          agent, and the URL of the page. Those logs are not the text in the
          editor. This site does not add an analytics script.
        </p>

        <h2>Cookies and storage</h2>
        <p>
          The converter does not set cookies and does not use browser storage.
          There is no account to sign in to.
        </p>

        <h2>Last updated</h2>
        <p>October 28, 2026.</p>
      </div>
    </article>
  );
}
