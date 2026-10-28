import Link from "next/link";
import { Converter } from "@/components/Converter";
import { ExpectList } from "@/components/ExpectList";
import { HowItWorks } from "@/components/HowItWorks";
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

const serviceYaml = `service:
  name: api
  ports: [8080, 8081]
  # staging only
  debug: true`;

const serviceJson = `{
  "service": {
    "name": "api",
    "ports": [8080, 8081],
    "debug": true
  }
}`;

const multiYaml = `---
name: web
---
name: worker`;

const multiJson = `[
  { "name": "web" },
  { "name": "worker" }
]`;

export default function HomePage() {
  return (
    <>
      <JsonLd data={webAppJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="hero">
        <div className="wrap hero-copy">
          <div>
            <h1 className="lines">
              <span className="line">
                <span data-line style={{ ["--i" as string]: 0 }}>
                  YAML to JSON
                </span>
              </span>
              <span className="line">
                <span data-line style={{ ["--i" as string]: 1 }}>
                  Converter
                </span>
              </span>
            </h1>
            <p className="lede" data-rise style={{ ["--i" as string]: 2 }}>
              Paste YAML on the left and copy formatted JSON from the right. It
              is free, it runs in your browser, and it does not ask you to sign
              up. Flip the direction for JSON to YAML.
            </p>
          </div>
        </div>
        <div className="wrap hero-tool" data-rise style={{ ["--i" as string]: 3 }}>
          <Converter />
        </div>
      </section>

      <HowItWorks />

      <section className="chapter" aria-labelledby="when-heading">
        <div className="wrap chapter-grid">
          <figure className="figure shutter" data-reveal>
            <img
              src="/media/card-storage.jpg"
              width={1920}
              height={1516}
              alt="Stacks of boxed IBM punch cards filling a federal records warehouse in 1959"
            />
            <figcaption>
              IBM punch-card storage at the Federal Records Center, Alexandria,
              1959.
            </figcaption>
          </figure>
          <div className="body" data-reveal>
            <h2 id="when-heading">When to convert YAML to JSON</h2>
            <p>
              YAML is common in Kubernetes manifests, CI configs, Docker Compose,
              and app settings. Many APIs, front-end fixtures, and log pipelines
              expect JSON. A free online YAML to JSON converter lets you paste a
              snippet, check the structure, and copy JSON without installing a
              CLI — useful when you only need a one-off conversion.
            </p>
            <p>
              That one-off case shows up constantly. A manifest goes into a ticket
              so someone without kubectl can read the data. A Compose file has to
              become JSON before a script that only calls JSON.parse. A values file
              is compared with the shape a chart expects. A workflow snippet is
              dropped into a browser fixture. In each of those moments the source
              of truth can stay YAML. The JSON is a view of it, produced for the
              tool that asked.
            </p>
            <p>
              A local CLI is still the right habit when the same conversion runs on
              every commit. This page does not replace yq, a short Python or Node
              script, or a build step you can pin. It covers the gap before that:
              the text is already in a buffer, you want formatted JSON now, and you
              do not want to create a project just to see the result. Used as a
              yaml to json online step, the snippet is parsed in the tab. It is not
              posted anywhere for conversion.
            </p>
            <p>
              The same editor helps when a service dumped JSON and a person now has
              to maintain it. Configs that started as JSON are often easier to
              review once they are YAML, especially in a pull request. Flip the
              direction, paste, and read. The section on JSON to YAML below is that
              path. Diffing is another quiet use: convert two YAML files to JSON
              and compare the JSON, so comments and indentation stop looking like
              real changes.
            </p>
            <p>
              This is a converter, not a cluster client and not a schema checker. It
              will not apply a file, call an API, or decide whether a manifest is
              valid Kubernetes. It checks that the text parses, and that each value
              can live in JSON. That narrower job is why it can stay free, in the
              browser, with no account.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter" aria-labelledby="how-prose-heading">
        <div className="wrap chapter-grid">
          <h2 id="how-prose-heading">Paste, parse, copy</h2>
          <div className="body" data-reveal>
            <p>
              Conversion runs locally in the tab. This page is a browser YAML
              parser plus formatter-style JSON output — not a server upload form.
              The parser is the yaml package, running as JavaScript on your device.
              Nothing in the text areas is sent off for conversion. Sample fills
              the current direction with a short built-in document. Clear empties
              the input. There is no submit button: a valid edit updates the other
              side immediately.
            </p>
            <ol>
              <li>Paste YAML on the left (or load a small example).</li>
              <li>
                Valid input becomes pretty-printed JSON on the right as you type.
              </li>
              <li>Copy or download the result.</li>
            </ol>
            <p>
              The two controls above the editors pick the direction. YAML to JSON
              is the default. JSON to YAML uses the same boxes, with JSON on the
              left and YAML on the right. Switching keeps a valid result as the
              next input, so you can turn a document around and see what survives.
              One limit matters: comments that JSON dropped do not come back.
            </p>
            <p>
              Output JSON is indented with two spaces. That is the formatter-style
              part. The tool does not rewrite your original YAML, and it is not a
              general YAML formatter that prints YAML back with a house style. If
              you need YAML again, switch direction. If you need the JSON for an
              API body or a fixture, copy it, or download converted.json. In the
              other direction the file is converted.yaml. Copy and Download stay
              off while the input is empty or invalid, so a broken parse is not
              written to the clipboard by accident.
            </p>
            <p>
              Empty input produces empty output and no error. The first problem in
              an invalid document is shown above the editors. When the parser
              reports a location, that note includes the line and column, for
              example “at line 3, column 1”, and the source marks that spot
              instead of painting the whole pane. Fix that line and convert again.
              The steps, and a few extra rules about quotes and numbers, are also
              on the <Link href="/how-to">how to convert YAML to JSON</Link> page.
            </p>
          </div>
        </div>
      </section>

      <ExpectList />

      <section className="chapter" aria-labelledby="vs-detail-heading">
        <div className="wrap chapter-grid">
          <h2 id="vs-detail-heading">What the translation keeps</h2>
          <div className="body" data-reveal>
            <p>
              YAML and JSON can describe the same trees of maps, lists, strings,
              numbers, booleans, and null. They are not the same syntax. JSON is
              stricter. A conversion is a translation, and a few YAML features have
              nowhere to go.
            </p>
            <ul>
              <li>
                Comments (<code># ...</code>) do not exist in JSON, so they are
                dropped.
              </li>
              <li>Anchors and aliases are expanded into concrete values.</li>
              <li>
                Merge keys (<code>{"<<"}</code>) are applied.
              </li>
              <li>
                Multi-document YAML (<code>---</code> separators) becomes a JSON
                array.
              </li>
              <li>
                Numbers and booleans follow YAML rules unless you quote them as
                strings.
              </li>
            </ul>
            <p>
              A comment beside a key is for readers of the YAML. It will not appear
              in the JSON, and it will not reappear if you convert that JSON back
              to YAML. If a note must survive, put it in a real string field before
              you convert.
            </p>
            <p>
              Anchors are resolved the way most applications resolve YAML before
              they use it. An alias (<code>*</code>) is written out in full, so the
              JSON contains the data, repeated, rather than a pointer. A circular
              alias has no finite JSON value. The converter rejects it instead of
              looping. Very large alias graphs are also refused, so a hostile
              snippet cannot expand without limit inside the tab.
            </p>
            <p>
              Merge keys are applied before the JSON is built. Keys from the merged
              map are copied into the result, and the <code>{"<<"}</code> key itself
              is not left behind. A later key in the same map overrides a key that
              arrived through the merge. That is the usual YAML rule, and it is the
              one this parser follows.
            </p>
            <p>
              Multi-document input is the case people miss. One document stays a
              single JSON value. Two or more documents, split by <code>---</code>,
              become an array with one element per document, in order. An empty
              document in that stream becomes <code>null</code>. A normal config is
              not wrapped in an array just because YAML files sometimes start with
              <code>---</code>. The array appears when the stream actually contains
              more than one document. That shape matches Kubernetes-style files
              that stack several resources in one buffer: each resource is one
              element, and you can see the boundaries that indentation alone hides.
            </p>
            <p>
              Numbers and booleans follow YAML 1.2 unless you quote them.{" "}
              <code>true</code>, <code>false</code>, <code>null</code>, <code>~</code>,
              and numeric literals become JSON booleans, null, and numbers.{" "}
              <code>True</code> and <code>FALSE</code> are booleans too.{" "}
              <code>yes</code>, <code>no</code>, <code>on</code>, and <code>off</code>{" "}
              stay strings. This tool does not use the older YAML 1.1 reading that
              treated those four words as booleans. Quote a value when the
              characters themselves matter.
            </p>
            <p>
              A few YAML types are refused because JSON cannot store them honestly.{" "}
              <code>NaN</code> and <code>Infinity</code> are errors. An integer
              outside the range a JSON number can keep exactly is an error, with a
              note to quote it if you need every digit. Explicit binary data is
              rejected rather than turned into a list of byte numbers. Explicit{" "}
              <code>!!timestamp</code> values become ISO 8601 strings. A plain date
              such as <code>2024-01-02</code> stays a string.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter" aria-labelledby="reverse-heading">
        <div className="wrap chapter-grid">
          <figure className="figure landscape shutter" data-reveal>
            <img
              src="/media/metal-type.jpg"
              width={1920}
              height={1277}
              alt="A tied bundle of metal letterpress type, letters locked in rows"
              loading="lazy"
            />
            <figcaption>
              Metal typesetting locked in a forme, photographed by Hannes Wolf.
            </figcaption>
          </figure>
          <div className="body" data-reveal>
            <h2 id="reverse-heading">JSON to YAML on the same page</h2>
            <p>
              Need the reverse direction? Switch to <strong>JSON to YAML</strong> on
              this converter. Paste JSON, get readable YAML for configs or docs.
              Keep one URL for both directions so the work stays on one page: yaml
              to json, json to yaml, and convert yaml to json are the same editor
              with the direction flipped.
            </p>
            <p>
              The YAML you get is block style, which is the form most people want
              for manifests and settings. Objects and arrays in the JSON become
              nested blocks rather than a single long line. There is no comment
              channel in JSON, so the YAML has no comments to recover. Keys stay
              strings. Pretty-printed or minified JSON both parse. Whitespace in
              the input does not change the data.
            </p>
            <p>
              Invalid JSON does not produce a partial document. The notice above
              the editors quotes the parser. When that message includes a line and
              column, start there. Trailing commas, single quotes, and bare keys
              are the usual misses when YAML-ish text is pasted into the JSON side
              by accident. Switch back to YAML to JSON if the text is actually
              YAML.
            </p>
            <p>
              Use JSON to YAML when a service dumped JSON and you want something
              you can edit with less punctuation, or when a doc will be easier to
              scan as YAML. Download saves <code>converted.yaml</code> in that mode
              and <code>converted.json</code> in the other. Either way the file is
              built in the tab. It is not uploaded.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter" aria-labelledby="errors-heading">
        <div className="wrap chapter-grid">
          <figure className="figure landscape shutter" data-reveal>
            <img
              src="/media/punch-card.png"
              width={1920}
              height={864}
              alt="A blue IBM punch card with rows of digits and rectangular holes"
              loading="lazy"
            />
            <figcaption>
              A blue IBM-style punch card, the document as a fixed grid of holes.
            </figcaption>
          </figure>
          <div className="body" data-reveal>
            <h2 id="errors-heading">Common errors and how to fix them</h2>
            <ul>
              <li>Tabs for indentation: use spaces.</li>
              <li>Misaligned list items under a key.</li>
              <li>
                Unquoted values that look like numbers (<code>1.10</code> becomes{" "}
                <code>1.1</code>, <code>0123</code> becomes <code>123</code>). Quote
                them to keep strings.
              </li>
              <li>Broken quotes or flow collections.</li>
            </ul>
            <p>
              Tabs are rejected. YAML indentation is spaces. A tab that sneaks in
              from a snippet, or from an editor set to hard tabs, fails the parse,
              and the message points at the line. Replace the tab with spaces and
              keep each level aligned with its parent. Two spaces per level is
              enough, and it matches the sample.
            </p>
            <p>
              Misaligned list items are the next frequent break. A dash has to sit
              at the right column under its key. If a child of the list is indented
              less than the dash, or a sibling key is mixed into the list by
              mistake, the parser stops. Read the line number in the notice, then
              compare that line with the key above it. The column number is the
              other half of the same hint: it marks where on that line the parser
              gave up, which is often the dash, the tab, or the extra token.
            </p>
            <p>
              Unquoted values that look like numbers change type. <code>1.10</code>{" "}
              becomes <code>1.1</code>, and <code>0123</code> becomes <code>123</code>.
              Leading zeros and trailing zeros after a decimal are not part of
              the JSON number. Quote them (<code>&quot;1.10&quot;</code>,{" "}
              <code>&quot;0123&quot;</code>) when the text is a version, a code, or
              an identifier. The same rule applies to booleans. An unquoted{" "}
              <code>true</code> is a boolean. The string true needs quotes. Country
              codes, zip codes, and port labels that only happen to be digits are
              the usual victims. If the characters must survive, quote them in the
              YAML before you convert.
            </p>
            <p>
              Broken quotes or flow collections fail closed. A flow sequence has to
              end with <code>]</code>, and a flow mapping has to end with{" "}
              <code>{"}"}</code>. A missing closer is reported at the line where
              the parser stopped, which is often the next line rather than the line
              where the bracket opened. Scan upward from that line for the{" "}
              <code>[</code> or <code>{"{"}</code> that never closed. An unmatched
              quote does the same kind of damage: the rest of the document is
              swallowed into a string until the parser cannot recover. Close the
              quote, then look at the next error if one appears.
            </p>
            <p>
              Duplicate keys are an error. Parsers differ here. This one does not
              silently keep the last key. Rename or remove the repeated key. If you
              meant a merge, use <code>{"<<"}</code> with an anchor instead of
              pasting the same key twice. Other hard stops are circular aliases,
              non-finite numbers, integers that do not fit in a JSON number, and
              binary values. Those are limits of JSON, not indentation mistakes.
              The notice names the reason. Quoting fixes the integer case. The
              others need a different representation before JSON can hold them.
            </p>
            <p>
              The editor surfaces the first parse error, and marks that location in
              the source when a line and column are known, so you can fix the line
              and convert again. It does not list every problem in the file at once.
              Correct the first line, and the next error, if there is one, appears
              in the same place. That single-note style is deliberate: a long list
              of follow-on errors is usually noise caused by the first break. If
              the message has no line, the input is often truncated, such as a JSON
              value that simply ends early. Paste the rest of the document and try
              again.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter" aria-labelledby="example-heading">
        <div className="wrap chapter-grid">
          <figure className="figure shutter" data-reveal>
            <img
              src="/media/lead-type.jpg"
              width={1920}
              height={2880}
              alt="Inverted lead type locked in a printing forme on a metal bed"
              loading="lazy"
            />
            <figcaption>
              Early lead type typesetting, photographed by Thomas Quine.
            </figcaption>
          </figure>
          <div className="body" data-reveal>
            <h2 id="example-heading">Short example</h2>
            <p>
              The fragment below is the sort of snippet this YAML parser is meant
              for. The comment is intentional. It is in the YAML so you can see
              that it disappears in the JSON, while the boolean and the port list
              remain. Nothing else is rewritten: the name stays a string, and{" "}
              <code>debug</code> stays a boolean because it was not quoted.
            </p>
            <p className="example-label">YAML</p>
            <pre>
              <code>{serviceYaml}</code>
            </pre>
            <p className="example-label">JSON (comments removed)</p>
            <pre>
              <code>{serviceJson}</code>
            </pre>
            <p>
              In the editor, pretty-printing uses two spaces, so a short array is
              written one value per line. The values are the same as the JSON
              above. Paste the YAML into the converter if you want that expanded
              form, then copy or download it.
            </p>
            <p>
              A multi-document stream uses the same parser and a different JSON
              shape. Documents separated by <code>---</code> become one array. Two
              small resources look like this:
            </p>
            <p className="example-label">YAML</p>
            <pre>
              <code>{multiYaml}</code>
            </pre>
            <p className="example-label">JSON array</p>
            <pre>
              <code>{multiJson}</code>
            </pre>
            <p>
              Paste only the service example and you get one object, not an array.
              The array appears when a <code>---</code> separator actually splits
              the buffer into more than one document. That is the behavior to
              expect from a Kubernetes-style manifest that stacks a Service and a
              Deployment in a single paste.
            </p>
          </div>
        </div>
      </section>

      <section className="film-block" aria-labelledby="privacy-heading">
        <div className="film-frame">
          <img
            className="film-poster"
            src="/media/sage-poster.jpg"
            width={960}
            height={720}
            alt="A hand setting switches on an IBM SAGE console"
            loading="lazy"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/sage-poster.jpg"
            width={960}
            height={720}
            aria-hidden="true"
          >
            <source src="/media/sage-loop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="wrap film-copy">
          <h2 id="privacy-heading">Privacy</h2>
          <div data-reveal>
            <p>
              Nothing you paste is uploaded for conversion. The YAML to JSON parser
              runs on your device. Loading the site still fetches static assets
              from the host; editor contents are not part of that request. Copy
              writes to the clipboard through the browser. Download builds a file
              in the tab and saves it locally. Neither action sends the document
              to this site.
            </p>
            <p>
              The converter does not set cookies and does not use browser storage.
              There is no account and no history of past documents. Opening the
              page can still show up in ordinary hosting logs: IP address, user
              agent, and the URL. Those logs are not the YAML. The{" "}
              <Link href="/privacy">privacy page</Link> states the same boundary in
              more detail, including what a page view contains and what it does
              not.
            </p>
            <p>
              If you are about to paste a secret, treat the page like any other
              local editor. The text sits in memory in that tab until you clear it
              or close it. Do not expect the site to store it, and do not expect
              the site to receive it. For a longer checklist of what the conversion
              keeps and drops, see{" "}
              <Link href="/how-to">how to convert YAML to JSON</Link>. The film
              above is IBM computer operations from{" "}
              <cite>On Guard! The Story of SAGE</cite> (1956), not this site.
            </p>
          </div>
        </div>
      </section>

      <section className="faq" aria-labelledby="faq-heading">
        <div className="wrap faq-grid">
          <h2 id="faq-heading">Questions</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <details className="faq-item" key={item.question} name="faq">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
