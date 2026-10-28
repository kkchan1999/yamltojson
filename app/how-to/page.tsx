import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Convert YAML to JSON in the Browser",
  description:
    "How to convert YAML to JSON with this free browser tool, fix invalid YAML, and turn JSON back into YAML. No sign-up.",
  path: "/how-to",
});

export default function HowToPage() {
  return (
    <article className="prose">
      <div className="container measure">
        <h1>How to convert YAML to JSON</h1>
        <p className="lede">
          <Link href="/">Open the free YAML to JSON converter</Link>. Paste a YAML
          document, read the JSON beside it, and copy the result. You can also
          reverse the direction and turn JSON into YAML. The parser runs in your
          browser. There is no sign-up.
        </p>

        <h2>Convert a document</h2>
        <ol>
          <li>
            Open the <Link href="/">YAML to JSON converter</Link>.
          </li>
          <li>Paste your YAML into the left box, or click Sample to load an example.</li>
          <li>Read the JSON on the right. It is indented with two spaces.</li>
          <li>
            Click Copy to put that JSON on your clipboard, or Download to save a
            file.
          </li>
          <li>Click Clear when you want an empty editor.</li>
        </ol>

        <h2>If the YAML is rejected</h2>
        <p>
          The message above the editors quotes the first problem, including a line
          and column when the parser has one. Indent with spaces, not tabs. Close
          quotes, brackets, and braces. Then edit the YAML and the JSON updates
          on its own.
        </p>
        <p>A few values change type if you leave them unquoted:</p>
        <ul>
          <li>
            <code>true</code>, <code>false</code>, <code>null</code>, <code>~</code>,
            and numbers become JSON booleans, null, and numbers. <code>True</code> and{" "}
            <code>FALSE</code> are booleans too.
          </li>
          <li>
            <code>yes</code>, <code>no</code>, <code>on</code>, and <code>off</code> stay
            strings. This tool follows YAML 1.2, not the older YAML 1.1 rule that
            treated those words as booleans.
          </li>
          <li>
            <code>1.10</code> becomes <code>1.1</code>, and <code>0123</code> becomes{" "}
            <code>123</code>. Quote them (<code>&quot;1.10&quot;</code>,{" "}
            <code>&quot;0123&quot;</code>) when the digits matter.
          </li>
          <li>
            An integer that does not fit in a JSON number is reported as an error
            instead of being rounded.
          </li>
          <li>
            <code>NaN</code> and <code>Infinity</code> are rejected, because JSON
            cannot store them.
          </li>
        </ul>

        <h2>Turn JSON back into YAML</h2>
        <p>
          Choose JSON to YAML, then paste JSON on the left. The right side shows
          YAML. Comments cannot come back, because JSON never stored them. Invalid
          JSON produces an error instead of a partial document.
        </p>

        <h2>What the converter keeps and drops</h2>
        <ul>
          <li>Comments are removed.</li>
          <li>
            Anchors and aliases are written out in full. A circular alias is
            rejected.
          </li>
          <li>
            Merge keys (<code>{"<<"}</code>) are applied before the JSON is built.
          </li>
          <li>
            Explicit <code>!!timestamp</code> values become ISO 8601 strings. Plain
            dates such as <code>2024-01-02</code> stay strings.
          </li>
          <li>
            <code>!!binary</code> values are rejected rather than turned into a pile
            of numbers.
          </li>
          <li>
            Several YAML documents in one paste (separated by <code>---</code>) become
            a JSON array, one item per document. An empty document in that stream
            becomes <code>null</code>.
          </li>
        </ul>

        <h2>A short example</h2>
        <pre>
          <code>{`service: harbor
enabled: true`}</code>
        </pre>
        <pre>
          <code>{`{
  "service": "harbor",
  "enabled": true
}`}</code>
        </pre>

        <h2>YAML to JSON online versus a CLI</h2>
        <p>
          A command-line converter is the better fit when the same file is
          converted on every build, in CI, or from a repository script. You can
          pin a version, read from disk, and fail the job when the file is invalid.
        </p>
        <p>
          This site is the other case: a YAML to JSON online conversion for a
          snippet already on the clipboard. There is nothing to install, and the
          parser runs in the tab, so a one-off manifest does not need a project.
          Use a CLI when conversion is part of a pipeline. Use the browser when
          you want to inspect or copy a result once. Both directions, YAML to JSON
          and JSON to YAML, stay on the <Link href="/">homepage converter</Link>.
        </p>

        <h2>Why bother</h2>
        <p>
          YAML is comfortable to edit by hand. JSON is what a lot of APIs,
          browsers, and command-line tools accept. Converting lets you keep a
          readable source file and hand over the JSON those tools ask for.
        </p>
      </div>
    </article>
  );
}
