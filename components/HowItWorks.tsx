const yamlLand = `service: harbor
# staging only
debug: true`;

const yamlParsed = `service: harbor
debug: true`;

const jsonReady = `{
  "service": "harbor",
  "debug": true
}`;

const stages = [
  {
    heading: "How this tool works",
    clause: "First it lands here.",
    label: "YAML",
    code: yamlLand,
  },
  {
    clause: "Then the parser reads it.",
    label: "Still YAML",
    code: yamlParsed,
  },
  {
    clause: "Comments have nowhere to go.",
    label: "The comment is gone",
    code: yamlParsed,
  },
  {
    clause: "JSON is ready to copy.",
    label: "JSON",
    code: jsonReady,
  },
];

export function HowItWorks() {
  return (
    <section className="stages" aria-labelledby="how-heading">
      {stages.map((stage, index) => (
        <article
          className="stage"
          key={stage.clause}
          data-reveal
          style={{ ["--i" as string]: index }}
        >
          {stage.heading ? <h2 id="how-heading">{stage.heading}</h2> : <div />}
          <div data-ui className="stage-card">
            <p className="card-label">{stage.label}</p>
            <pre>
              <code>{stage.code}</code>
            </pre>
          </div>
          <p className="stage-clause">{stage.clause}</p>
        </article>
      ))}
    </section>
  );
}
