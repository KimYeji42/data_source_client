import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai'; // 어두운 테마 사용
import styles from "../../styleModule/templateCodeEditor.module.css"
export default function TemplateCodeEditorModalUI({onClose}) {
    const code = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* CSS 코드를 보여주는 부분 */
    </style>
</head>
<body>
    <div>
        <h1>Hello World</h1>
    </div>
       <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>   <div>
        <h1>Hello World</h1>
    </div>
    <script>
        // JavaScript 코드를 보여주는 부분
    </script>
</body>
</html>`;

    // 클립보드에 코드를 복사하는 함수
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <div className={styles.container}>
            <button className={styles.copyButton} onClick={copyToClipboard}>Copy</button>
            <AceEditor
                  setOptions={{ useWorker: false }}
                  mode="html"
                  theme="monokai" // 어두운 테마 선택
                  width="100%"
                  height="100%"
                  readOnly={true}
                  value={code}
            />
        </div>
    );
}
