import React, {useState} from "react";
import DataUI from "./DataUI";
import styles from '../../styleModule/ColumnStyle.module.css';
import up from '../../Image/upButton.png';
import down from '../../Image/downButton.png';
import { Button } from "./ButtonUI";
import Button_UI from "./Button_UI";
import { Image } from "react-bootstrap";
import SendModalLayOut from "../../../project/components/layout/SendModalLayOut";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

export default function ColumnUI({ columns , updateData , setUpdateData ,createData , setCreateData, tableID }) {
    const [clickCount, setClickCount] = useState(0);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1); // 선택된 행 인덱스
    const [deleteRowIndex , setDeleteRowIndex] = useState([])
    const [isSendModalOpen , setIsSendModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [success , setSuccess] = useState("")


    //해당 목록들을 보내는 함수
    const submitModifiedTable = async () => {
        let obj = {
            tableID : tableID,
            createData : createData,
            updateData : updateData,
            deleteData : deleteRowIndex
        };

        console.log(obj)
        try {
            const response = await fetch('http://localhost:8080/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Data sent successfully:', responseData);
                setSuccess(responseData.message)
                setIsSuccessModalOpen(true)
            } else {
                const errorData = await response.json();
                console.log(errorData)
                setError(errorData.message);
                setIsErrorModalOpen(true);
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const handleDeleteData = () => {
        if (selectedRowIndex !== -1) {
            setDeleteRowIndex([...deleteRowIndex, selectedRowIndex]);

        }else {
            if (clickCount !== -1){
                setClickCount(clickCount - 1)
            }
        }
    };
    const handleRollBackData = () => {
        if (selectedRowIndex !== -1) {
            if (deleteRowIndex.includes(selectedRowIndex)) {
                const updatedDeleteRow
                    = deleteRowIndex.filter(index => index !== selectedRowIndex);
                setDeleteRowIndex(updatedDeleteRow);
            }
        }
    };

    // 선택된 행의 인덱스를 설정하는 함수
    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    };

    const handleReload = () => {
        window.location.reload()
    };

    const handlePushData = () =>{
        setClickCount(clickCount +1)
    }

    return (
        <div>
            <div className={styles.button}>
                <ul className={styles.menuIconBox}>
                    <div className={styles.leftIcon}>
                        <Button_UI image={Button[0].image} onClick={handleReload} />
                    </div>
                    <div className={styles.rightIcon}>
                        <Button_UI image={Button[1].image} onClick={handlePushData}/>
                        <Button_UI image={Button[2].image} onClick={handleDeleteData}/>
                        <Button_UI image={Button[3].image} onClick={() => setIsSendModalOpen(true)}/>
                        <Button_UI image={Button[4].image} />
                        <Button_UI image={Button[5].image} onClick={handleRollBackData}/>
                    </div>
                </ul>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        {[...columns.keys()].map((columnName) => (
                            <th key={columnName}>
                                <div className={styles.columnContainer}>
                                    <div style={{ display: 'flex', paddingLeft: '10px' }}>
                                        {columnName} {/* 열의 이름 */}
                                        <div className={styles.imageContainer}>
                                            <Image src={up} />
                                            <Image src={down} />
                                        </div>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {[...columns.keys()].map((columnName, index) => (
                                <td key={index}>
                                    <DataUI
                                        column={columnName}
                                        newDataCount={clickCount}
                                        selectedRowIndex={selectedRowIndex} // 선택된 행 인덱스 전달
                                        onRowClick={handleRowClick} // 행 클릭 핸들러 전달
                                        deleteRow={deleteRowIndex}
                                        tableMap={columns}
                                        updateData = {updateData}
                                        setUpdateData = {setUpdateData}
                                        createData = {createData}
                                        setCreateData = {setCreateData}
                                        columnSize = {index}

                                    />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <
                SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={success}
                clickLink={`/table/${tableID}`}
                onClickEvent={handleReload}
            />
            <
                ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}
                clickLink={`/table/${tableID}`}
            />
            <SendModalLayOut
                data={"데이터를 변경 하시겠습니까?"}
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onClickEvent={submitModifiedTable}
            />

        </div>
    );
}
