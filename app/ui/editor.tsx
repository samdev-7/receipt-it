import { useRef } from "react";

import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-github_dark";
// import "ace-builds/src-noconflict/ext-language_tools";

export default function Editor() {
  const aceRef = useRef<any>(null);

  return (
    <AceEditor
    //   mode={"javascript"}
    //   theme="github_dark"
    //   setOptions={{
    //     enableBasicAutocompletion: true,
    //     enableLiveAutocompletion: true,
    //     enableSnippets: true,
    //   }}
    //   className="h-full w-full"
    //   ref={aceRef}
    ></AceEditor>
  );
}
