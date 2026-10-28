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
      "Indent with spaces, not tabs. Keep list items and keys aligned. Close quotes and brackets. If a value should stay a string, quote it: unquoted 1.10 becomes 1.1, and unquoted 0123 becomes 123. The note above the editors shows the first problem the parser finds, including a line and column when it has one, and the source marks that spot.",
  },
  {
    question: "How do I copy the JSON output?",
    answer:
      "Click Copy beside the output. The formatted text goes on your clipboard. Copy stays unavailable while the input is empty or invalid. Download, next to Copy, saves converted.json or converted.yaml instead.",
  },
  {
    question: "Can I convert JSON to YAML here too?",
    answer:
      "Yes. Switch the direction to JSON to YAML, paste JSON on the left, and copy the YAML output. Both directions stay on this page.",
  },
  {
    question: "Is this a YAML formatter or only a converter?",
    answer:
      "The main job is YAML to JSON conversion. The JSON side is pretty-printed (formatter-style indentation). YAML comments are not preserved in JSON because JSON has no comment syntax.",
  },
  {
    question: "Does it work as a YAML parser for multi-document files?",
    answer:
      "Yes. Streams separated by --- convert to a JSON array with one element per document, handy for Kubernetes-style manifests.",
  },
] as const;
