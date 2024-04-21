import styles from '../../styleModule/DownloadStyle.module.css'
import { useState } from "react";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function DownloadUI({ tableID }) {
    const [excelData , setExcelData] = useState(null)
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)

    const excelDataDownload = async () =>{
        await fetchTableExcelData()

        if (excelData == null){
            setIsErrorModalOpen(true)
            return
        }

        downloadExcel()
    }
    const fetchTableExcelData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/table/excel/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setExcelData(responseData)
            //받은 데이터를 자바스크립트 Map객체로 변환
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const downloadExcel = () => {
        // CSV 파일 내용 생성

        // JSON 데이터를 CSV 문자열로 변환
        const csvContent = "\uFEFF" + excelData.headers.join(",") + "\n" +
            excelData.rows.map(row => row.join(",")).join("\n");

        // CSV 파일을 Blob으로 생성
        const csvData = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        // Blob URL 생성
        const url = window.URL.createObjectURL(csvData);

        // 다운로드 링크 생성
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table_data.csv');

        // 링크 클릭 및 생성된 요소 제거
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className={styles.downloadBox}>
                <p className={styles.downloadText} onClick={excelDataDownload}>엑셀 다운로드</p>
            </div>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={()=>setIsErrorModalOpen(false)}
                error={"데이터를 불러오고 있습니다. 잠시후 다시 시작해주세요."}
            />
        </div>
    );
}
