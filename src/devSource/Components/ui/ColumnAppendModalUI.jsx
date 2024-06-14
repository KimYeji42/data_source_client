import styles from "../../styleModule/ColumnAppendModalStyle.module.css";
import React, { useState } from "react";
import stylesCreateTable from '../../styleModule/createTableStyle.module.css';
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SendModalLayOut from "../../../project/components/layout/SendModalLayOut";
import TitleUI from "../../../project/components/uI/TitleUI";

export default function ColumnAppendModalUI({ isOpen, closeModal, tableID }) {
    const [appendColumnName, setAppendColumnName] = useState('');
    const [appendColumnDataType, setAppendColumnDataType] = useState('TEXT');
    const [appendColumnPk, setAppendColumnPk] = useState(false);
    const [appendColumnFk, setAppendColumnFk] = useState(false);
    const [appendColumnUk, setAppendColumnUk] = useState(false);
    const [isSendModalOpen, setIsSendModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleAddColumn = () => {
        const newColumn = {
            tableID: tableID,
            columnName: appendColumnName,
            dataType: appendColumnDataType,
            pk: appendColumnPk,
            fk: appendColumnFk,
            uk: appendColumnUk
        };
        console.log('New Column:', newColumn);
        appendColumnDataSend(newColumn);
    };

    const appendColumnDataSend = async (obj) => {
        if (obj.columnName.trim().length === 0){
            setMessage("컬럼 이름을 작성해주세요")
            setIsErrorModalOpen(true)
        }
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/column/append`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Data sent successfully:', responseData);
                setMessage(responseData.message);
                setIsSuccessModalOpen(true);
            } else {
                const errorData = await response.json();
                console.log(errorData);
                setMessage(errorData.message);
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleModalClose = () => {
        closeModal(false)
        window.location.reload();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.columnAppendContainer}>
                <TitleUI title={"컬럼 추가"} />
                <table className={stylesCreateTable.selectHeaderTable}>
                    <thead>
                    <tr>
                        <th>컬럼 이름</th>
                        <th>데이터 타입</th>
                        <th>PK</th>
                        <th>FK</th>
                        <th>UK</th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    <tr>
                        <td style={{ width: '250px' }}>
                            <input
                                type="text"
                                name="columnName"
                                style={{ border: "none" }}
                                value={appendColumnName}
                                onChange={(e) => setAppendColumnName(e.target.value)}
                            />
                        </td>
                        <td style={{ width: '200px' }}>
                            <select
                                name="dataType"
                                className={stylesCreateTable.inputDataType}
                                value={appendColumnDataType}
                                onChange={(e) => setAppendColumnDataType(e.target.value)}
                            >
                                <option value="TEXT">TEXT</option>
                                <option value="INTEGER">INTEGER</option>
                                <option value="REAL">REAL</option>
                                <option value="MediaFile">MediaFile</option>
                            </select>
                        </td>
                        <td style={{ width: '50px' }}>
                            <input
                                type="checkbox"
                                name="pk"
                                checked={appendColumnPk}
                                onChange={(e) => setAppendColumnPk(e.target.checked)}
                            />
                        </td>
                        <td style={{ width: '50px' }}>
                            <input
                                type="checkbox"
                                name="fk"
                                checked={appendColumnFk}
                                onChange={(e) => setAppendColumnFk(e.target.checked)}
                            />
                        </td>
                        <td style={{ width: '50px' }}>
                            <input
                                type="checkbox"
                                name="uk"
                                checked={appendColumnUk}
                                onChange={(e) => setAppendColumnUk(e.target.checked)}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>

                <div className={styles.closeButtonContainer}>
                    <button onClick={handleAddColumn} className={styles.sendButton}>추가</button>
                    <button onClick={() => closeModal(false)} className={styles.closeButton}>닫기</button>
                </div>
            </div>
            <SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={message}
                onClickEvent={handleModalClose}
            />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={message}
            />
            <SendModalLayOut
                data={"컬럼을 추가 하시겠습니까?"}
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onClickEvent={handleAddColumn}
            />
        </div>
    );
}
