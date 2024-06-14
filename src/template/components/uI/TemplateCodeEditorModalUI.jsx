import React, {useEffect, useState} from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/theme-monokai'; // 어두운 테마 사용
import styles from "../../styleModule/templateCodeEditor.module.css"
import {CardTemplateCode} from "../code/CardTemplateCode";
import {BarTemplateCode} from "../code/BarTemplateCode";
import {TreeTemplateCode} from "../code/TreeTemplateCode";
import {TableTemplateCode} from "../code/TableTemplateCode";

export default function TemplateCodeEditorModalUI({ template , title , description , image , tableID}) {
    const [code, setCode] = useState('');
    const [tableDataUrl, setTableDataUrl] = useState(null);

    const getTemplateInfo = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/builder/tableUrl/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.text();
            console.log(responseData);

            setTableDataUrl(responseData); // URL 저장
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getTemplateInfo();
    }, [tableID]);

    useEffect(() => {
        if (tableDataUrl) {
            switch (template) {
                case 'CARD Template':
                    setCode(CardTemplateCode({ url: tableDataUrl, title, description, img: image }));
                    break;
                case 'Bar Template':
                    setCode(BarTemplateCode({ url: tableDataUrl, title, description, img: image }));
                    break;
                case 'Tree Template':
                    setCode(TreeTemplateCode({ url: tableDataUrl}));
                    break
                case 'Table Template':
                    setCode(TableTemplateCode({ url: tableDataUrl}));
                    break
                default:
                    setCode('');
            }
        }
    }, [tableDataUrl, template, title, description, image]);

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
