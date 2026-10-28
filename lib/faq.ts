export const faqs = [
  {
    question: "Is this YAML to JSON converter free?",
    answer:
      "Yes. It is free to use. There is no account, no sign-up, and no payment.",
  },
  {
    question: "Is my YAML private? Does conversion stay in the browser?",
    answer:
      "Yes. The parser runs on your device. Text you paste is not uploaded for conversion. Loading the page still requests the site’s files from the host, but the editor contents are not part of that request.",
  },
  {
    question: "What is the difference between YAML and JSON?",
    answer:
      "YAML is a readable format for config and data. It allows comments, anchors, and light punctuation. JSON is stricter and is what many APIs and tools expect. JSON has no comments, so comments are dropped. Anchors are resolved into repeated values.",
  },
  {
    question: "What should I check if my YAML is invalid?",
    answer:
      "Indent with spaces, not tabs. Keep list items and keys aligned. Close quotes and brackets. If a value should stay a string, quote it — unquoted 1.10 becomes 1.1, and unquoted 0123 becomes 123. The note under the editor shows the first problem the parser finds.",
  },
  {
    question: "How do I copy the JSON output?",
    answer:
      "Click Copy beside the output. The formatted text goes on your clipboard. Copy stays unavailable while the input is empty or invalid.",
  },
] as const;
