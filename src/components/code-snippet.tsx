"use client";

import { useEffect } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";

const CodeSnippet = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  useEffect(() => {
    // Highlight all code elements when component mounts or updates
    Prism.highlightAll();
  }, [code, language]);
  return (
    <pre className="text-xs sm:text-sm font-mono rounded-md">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeSnippet;
