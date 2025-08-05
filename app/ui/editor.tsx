"use client";

import { useRef } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github_light_default";
import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeEditor() {
  const aceRef = useRef<any>(null);

  return (
    <AceEditor
      mode="javascript"
      theme="github_light_default"
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
