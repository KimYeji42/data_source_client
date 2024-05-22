import React, { useState } from 'react';
import styles from '../../styleModule/Import.module.css'
import TitleUI from "../../../project/components/uI/TitleUI";
import * as XLSX from 'xlsx';

export default function DataImportModalUI({ onClose, tableID }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        try {
            const excelData = await excelParse(file);
            const excelJson = JSON.stringify(excelData);
            console.log(excelJson)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/table/import/csv`, {
                method: 'POST',
                body: excelJson,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('File upload failed');
            }

            const data = await response.json();
            console.log('File uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    function excelParse(file) {
        return new Promise((resolve, reject) => {
            if (!(file instanceof Blob)) {
                reject(new Error('해당 객체는 BLOB 타입이 아닙니다.'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const excelData = {};
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    excelData[sheetName] = XLSX.utils.sheet_to_json(worksheet);
                });
                resolve(excelData);
            };
            reader.onerror = reject;
            reader.readAsBinaryString(file);
        });
    }




    return (
        <div>
            <div className={styles.DataImportContainer}>
                <TitleUI title={"CSV DATA IMPORT"}/>
                <div className={styles.description}>
                    <p className={styles.comment}>데이터를 추가하기 전에 가장 상단의 행의 이름은 컬럼의 이름과 동일하여야 합니다.</p>
                    <p>예시:</p>
                    <p>[ 컬럼 이름 1 ] [ 컬럼 이름 2 ] [ 컬럼 이름 3 ]</p>
                    <p>[ 추가 데이터 ] [ 추가 데이터 ] [ 추가 데이터 ]</p>
                    <p className={styles.comment}>선택을 누르고 추가할 EXCEL 데이터를 첨부 후 추가 버튼을 눌러주세요.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fileInputWrapper}>
                        <input
                            type="file"
                            accept=".xls,.xlsx"
                            onChange={handleFileChange}
                        />
                        <button type="button" className={styles.chooseFileButton}>선택</button>
                    </div>
                    {file && <div className={styles.selectedFileName}>파일 이름: {file.name}</div>}
                    <div className={styles.buttonContainer}>
                        {file && <button type="submit" className={styles.submitButton}>추가</button>}
                        <button onClick={onClose} className={styles.closeButton}>닫기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
