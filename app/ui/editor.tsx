"use client";

import { useRef } from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditor() {
  const aceRef = useRef<any>(null);

  return (
    <AceEditor
      mode="javascript"
      theme="github_dark"
      name="editor"
      className="grow"
      ref={aceRef}
      width="100%"
      height="100%"
    />
  );
}
