"use client";

import { useState } from "react";

const topics = [
  {
    id: "comments",
    label: "Comments",
    rows: [
      {
        key: "YAML",
        val: "A # note sits beside a key",
        note: "Written for people who read the file",
      },
      {
        key: "JSON",
        val: "The note is gone",
        note: "JSON has no comment syntax, so it cannot come back",
      },
    ],
  },
  {
    id: "anchors",
    label: "Anchors",
    rows: [
      {
        key: "YAML",
        val: "An alias points at an earlier node",
        note: "Anchors and << merge keys are YAML-only",
      },
      {
        key: "JSON",
        val: "The value is written out in full",
        note: "A circular alias is refused instead of looping",
      },
    ],
  },
  {
    id: "documents",
    label: "Documents",
    rows: [
      {
        key: "YAML",
        val: "--- splits a stream",
        note: "One document stays a single JSON value",
      },
      {
        key: "JSON",
        val: "Two or more become an array",
        note: "Each document is one element, in order",
      },
    ],
  },
  {
    id: "numbers",
    label: "Numbers",
    rows: [
      {
        key: "YAML",
        val: "1.10 and 0123 look like numbers",
        note: "true, false, null, and ~ follow YAML 1.2",
      },
      {
        key: "JSON",
        val: "They become 1.1 and 123",
        note: "Quote them when the digits themselves matter",
      },
    ],
  },
] as const;

export function ExpectList() {
  const [active, setActive] = useState<(typeof topics)[number]["id"]>(
    "comments",
  );
  const topic = topics.find((item) => item.id === active) ?? topics[0];

  return (
    <section className="expect" aria-labelledby="expect-heading">
      <div className="wrap">
        <div className="expect-head">
          <h2 id="expect-heading">YAML vs JSON</h2>
          <p data-reveal>
            They can describe the same trees. They are not the same syntax. A
            conversion is a translation.
          </p>
        </div>
        <div className="expect-body">
          <div className="day-tabs" role="tablist" aria-label="YAML to JSON cases">
            {topics.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={item.id === active}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActive(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            className="bands"
            role="tabpanel"
            id={`panel-${topic.id}`}
            aria-labelledby={`tab-${topic.id}`}
          >
            {topic.rows.map((row) => (
              <article className="band" key={row.key}>
                <p className="key">{row.key}</p>
                <p className="val">
                  {row.val}
                  <span className="note">{row.note}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
