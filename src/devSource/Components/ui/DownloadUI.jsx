import styles from '../../styleModule/DownloadStyle.module.css'
import { useState } from "react";

export default function DownloadUI() {
    const [tableID, setTableID] = useState(1);
    const [table, setTable] = useState([]);

    const fetchColumData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/table/excel/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            setTable(responseData);
            downloadExcel()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const downloadExcel = () => {
        // CSV 파일 내용 생성
        const csvContent = table.map(row => row.join(",")).join("\n");

        // CSV 파일을 UTF-8로 인코딩하여 Blob 생성
        const csvData = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });

        const url = window.URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table_data.csv');

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    };

    return (
        <div>
            <div className={styles.downloadBox}>
                <p className={styles.downloadText} onClick={fetchColumData}>엑셀 다운로드</p>
            </div>
        </div>
    );
}
