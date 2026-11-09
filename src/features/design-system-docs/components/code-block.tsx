// src/features/design-system-v2-docs/components/code-block.tsx

import type { CodeBlockProps } from "@/features/design-system-v2-docs/types/code-block.type";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import { useMemo } from "react";

export const CodeBlock = (props: CodeBlockProps) => {
  // Props
  const { code, language = "tsx" } = props;

  // Derived Values
  const highlighted = useMemo(() => {
    const gram = Prism.languages[language] || Prism.languages.javascript;
    return Prism.highlight(code, gram, language);
  }, [code, language]);

  return (
    <pre
      style={{
        margin: 0,
        padding: 0,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: "13px",
        lineHeight: "1.6",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        background: "transparent",
      }}
    >
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
};

