"use client";

import { useRef, forwardRef } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/ext-language_tools";

const CodeEditor = forwardRef<
  any,
  {
    onChange?: (value: string) => void;
  }
>(function CodeEditor({ onChange = () => {} }, ref) {
  return (
    <AceEditor
      mode="javascript"
      theme="chrome"
      name="editor"
      className="grow"
      ref={ref}
      width="100%"
      height="100%"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showPrintMargin: false,
      }}
      onChange={onChange}
    />
  );
});

export default CodeEditor;
