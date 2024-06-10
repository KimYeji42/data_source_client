import React, { useState } from 'react';
import styles from '../../styleModule/Import.module.css'
import TitleUI from "../../../project/components/uI/TitleUI";
import * as XLSX from 'xlsx';
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function DataImportModalUI({ onClose, tableID }) {
    const [file, setFile] = useState(null);
    const [modalMessage , setModalMessage] = useState("")
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false)
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        try {
            const excelData = await excelParse(file);
            const excelJsonString = JSON.stringify(excelData);
            const csvDataOBJ = {
                excelJson : excelJsonString,
                tableID : tableID
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/table/import/csv`, {
                method: 'POST',
                body: JSON.stringify(csvDataOBJ),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();

            if (!response.ok) {
                setModalMessage(data.message)
                setIsErrorModalOpen(true)
                return
            }

            setModalMessage(data.message)
            setIsSuccessModalOpen(true)

        } catch (error) {
            console.log(error)
            setModalMessage(error.message)
            setIsErrorModalOpen(true)
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
        <div className={styles.modalOverlay}>
            <div className={styles.DataImportContainer}>
                <TitleUI title={"CSV DATA IMPORT"}/>
                <div className={styles.description}>
                    <p>1. 엑셀 가장 상단 행은 데이터베이스 <strong className={styles.comment}>행 이름과 동일</strong>하여야 합니다.</p>
                    <p>ex) </p>
                    <div className={styles.csvImgBox}>
                        <img src="/image/CSV.png" alt="CSV" className={styles.csvImg}/>
                    </div>
                    <p> 2. 해당 시트의 이름은 항상  <strong className={styles.comment}>"Sheet1"</strong>으로 해주세요.</p>
                    <p>3. 파일 선택을 누르고 추가할 EXCEL 데이터를 첨부 후 추가 버튼을 눌러주세요.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fileInputWrapper}>
                        <input
                            type="file"
                            accept=".xls,.xlsx"
                            onChange={handleFileChange}
                        />
                        <button type="button" className={styles.chooseFileButton}>파일 선택</button>
                    </div>
                    {file && <div className={styles.selectedFileName}>파일 이름: {file.name}</div>}
                    <div className={styles.buttonContainer}>
                        {file && <button type="submit" className={styles.submitButton}>추가</button>}
                        <button onClick={onClose} className={styles.closeButton}>닫기</button>
                    </div>
                </form>
            </div>
            <SuccessModalLayout
                data={modalMessage}
                onClose={()=>setIsSuccessModalOpen(false)}
                onClickEvent={onClose}
                isOpen={isSuccessModalOpen}
            />

            <ErrorModal
                error={modalMessage}
                onClose={()=>setIsErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
        </div>
    );
}
