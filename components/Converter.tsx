"use client";

import { useEffect, useState } from "react";
import { convert, type Direction } from "@/lib/convert";
import { SAMPLE_JSON, SAMPLE_YAML } from "@/lib/samples";

export function Converter() {
  const [direction, setDirection] = useState<Direction>("yaml-to-json");
  const [source, setSource] = useState(SAMPLE_YAML);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const result = convert(source, direction);
  const canCopy = result.ok && result.output !== "";
  const sourceName = direction === "yaml-to-json" ? "YAML" : "JSON";
  const outputName = direction === "yaml-to-json" ? "JSON" : "YAML";

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  function updateSource(value: string) {
    setSource(value);
    setCopied(false);
    setCopyFailed(false);
  }

  function switchDirection(next: Direction) {
    if (next === direction) return;
    if (result.ok && result.output.trim() !== "") {
      setSource(result.output);
    }
    setDirection(next);
    setCopied(false);
    setCopyFailed(false);
  }

  function loadSample() {
    setSource(direction === "yaml-to-json" ? SAMPLE_YAML : SAMPLE_JSON);
    setCopied(false);
    setCopyFailed(false);
  }

  function clearAll() {
    setSource("");
    setCopied(false);
    setCopyFailed(false);
  }

  async function copyOutput() {
    if (!canCopy || !result.ok) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  return (
    <div className="converter">
      <div className="toolbar">
        <div className="segment" role="group" aria-label="Conversion direction">
          <button
            type="button"
            aria-pressed={direction === "yaml-to-json"}
            onClick={() => switchDirection("yaml-to-json")}
          >
            YAML to JSON
          </button>
          <button
            type="button"
            aria-pressed={direction === "json-to-yaml"}
            onClick={() => switchDirection("json-to-yaml")}
          >
            JSON to YAML
          </button>
        </div>
        <div className="toolbar-actions">
          <button type="button" className="button" onClick={loadSample}>
            Sample
          </button>
          <button type="button" className="button" onClick={clearAll}>
            Clear
          </button>
        </div>
      </div>
      <p className="hint">Runs in this tab. Nothing you paste is uploaded.</p>
      {!result.ok ? (
        <p id="convert-error" className="notice" role="alert">
          <strong>
            {direction === "yaml-to-json" ? "Invalid YAML." : "Invalid JSON."}
          </strong>{" "}
          {result.error}
        </p>
      ) : null}

      <div className="panes">
        <section className={result.ok ? "pane" : "pane is-error"}>
          <header>
            <label htmlFor="source-input">{sourceName}</label>
          </header>
          <textarea
            id="source-input"
            value={source}
            onChange={(event) => updateSource(event.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            aria-invalid={!result.ok}
            aria-describedby={!result.ok ? "convert-error" : undefined}
            placeholder={
              direction === "yaml-to-json"
                ? "Paste YAML here"
                : "Paste JSON here"
            }
          />
        </section>

        <section className="pane">
          <header>
            <label htmlFor="output-input">{outputName}</label>
            <button
              type="button"
              className="button primary"
              onClick={copyOutput}
              disabled={!canCopy}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </header>
          <textarea
            id="output-input"
            readOnly
            value={result.ok ? result.output : ""}
            spellCheck={false}
            placeholder={result.ok ? "Output appears here" : ""}
          />
        </section>
      </div>

      {copyFailed ? (
        <p className="notice" role="alert">
          Could not copy automatically. Select the output and copy it manually.
        </p>
      ) : null}
    </div>
  );
}
