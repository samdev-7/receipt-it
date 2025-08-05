"use client";

import { useRef, useEffect } from "react";
import AceEditor from "react-ace";

// Configure ace-builds base path
import ace from "ace-builds/src-noconflict/ace";
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/"
);

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditor() {
  const aceRef = useRef<any>(null);

  return (
    <AceEditor
      mode="javascript"
      theme="github"
      name="editor"
      className="grow"
      ref={aceRef}
      width="100%"
      height="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showPrintMargin: false,
      }}
    />
  );
}
