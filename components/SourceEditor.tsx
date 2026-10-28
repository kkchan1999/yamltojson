"use client";

import {
  useLayoutEffect,
  useRef,
  type TextareaHTMLAttributes,
} from "react";

type Props = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange" | "children"
> & {
  value: string;
  onChange: (value: string) => void;
  errorLine?: number;
  errorColumn?: number;
};

export function SourceEditor({
  value,
  onChange,
  errorLine,
  errorColumn,
  className,
  onScroll,
  ...rest
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLPreElement>(null);
  const mark = markableLocation(value, errorLine, errorColumn);

  function syncOverlay() {
    const textarea = textareaRef.current;
    const overlay = overlayRef.current;
    if (!textarea || !overlay) return;
    overlay.scrollTop = textarea.scrollTop;
    overlay.scrollLeft = textarea.scrollLeft;
  }

  useLayoutEffect(() => {
    syncOverlay();
  }, [value, mark?.line, mark?.column]);

  return (
    <div className={mark ? "source-editor is-marked" : "source-editor"}>
      {mark ? (
        <pre ref={overlayRef} className="source-overlay" aria-hidden="true">
          <ErrorMark source={value} line={mark.line} column={mark.column} />
        </pre>
      ) : null}
      <textarea
        {...rest}
        ref={textareaRef}
        className={className}
        value={value}
        wrap="off"
        onChange={(event) => onChange(event.target.value)}
        onScroll={(event) => {
          syncOverlay();
          onScroll?.(event);
        }}
      />
    </div>
  );
}

function markableLocation(
  source: string,
  line?: number,
  column?: number,
): { line: number; column: number } | undefined {
  if (typeof line !== "number" || typeof column !== "number") return undefined;
  if (line < 1 || column < 1) return undefined;
  const lineCount = source.length === 0 ? 1 : source.split("\n").length;
  if (line > lineCount) return undefined;
  return { line, column };
}

function ErrorMark({
  source,
  line,
  column,
}: {
  source: string;
  line: number;
  column: number;
}) {
  const lines = source.split("\n");

  return (
    <>
      {lines.map((text, index) => {
        const n = index + 1;
        const breakAfter = n < lines.length ? "\n" : "";
        if (n !== line) {
          return (
            <span key={n}>
              {text}
              {breakAfter}
            </span>
          );
        }

        const at = Math.min(Math.max(column, 1) - 1, text.length);
        const before = text.slice(0, at);
        const ch = text.slice(at, at + 1);
        const after = text.slice(at + 1);

        return (
          <span key={n} className="source-error-line">
            {before}
            <span className="source-error-col">{ch.length > 0 ? ch : " "}</span>
            {after}
            {breakAfter}
          </span>
        );
      })}
    </>
  );
}
