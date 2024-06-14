import React, {useState, useEffect} from "react";
import DataUI from "./DataUI";
import styles from '../../styleModule/ColumnStyle.module.css';
import up from '../../Image/upButton.png';
import down from '../../Image/downButton.png';
import {Button} from "./ButtonUI";
import Button_UI from "./Button_UI";
import {Image} from "react-bootstrap";
import SendModalLayOut from "../../../project/components/layout/SendModalLayOut";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import SearchModal from "./SearchModal";
import DataImportModalUI from "./DataImportModalUI";
import ColumnAppendModalUI from "./ColumnAppendModalUI";
import {useParams} from "react-router-dom";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";

export default function ColumnUI({ columns , updateData , setUpdateData ,createData , setCreateData }) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { dataBaseID, tableID } = useParams();
    const [clickCount, setClickCount] = useState(0);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1); // 선택된 행 인덱스
    const [deleteRowIndex , setDeleteRowIndex] = useState([])
    const [isSendModalOpen , setIsSendModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [success , setSuccess] = useState("")
    const [deleteData , setDeleteData] = useState([])
    const [isSearchModalOpen , setSearchModalOpen] = useState(false)
    const [isDataImportModalOpen , setIsDataModalOpen] = useState(false)
    const [isColumnAppendModalOpen, setIsColumnAppendModalOpen] = useState(false)

    //해당 목록들을 보내는 함수
    const submitModifiedTable = async () => {
        let obj = {
            tableID: tableID,
            createData: createData,
            updateData: updateData,
            deleteData: deleteData
        };

        try {
            console.log(obj)
            const response = await fetch(`${apiUrl}/api/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(obj)
            });

            if (response.ok) {
                setIsErrorModalOpen(false);
                const responseData = await response.json();
                console.log('Data sent successfully:', responseData);
                setSuccess(responseData.message);
                setIsSuccessModalOpen(true);
            } else {
                const errorData = await response.json();
                console.log(errorData);
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
            const columnDataToDelete = []; // 선택된 행의 데이터를 수집할 배열

            // 각 열의 데이터를 수집하여 배열에 추가
            for (const [columnName, columnData] of columns.entries()) {
                console.log(columnName)
                columnDataToDelete.push(columnData[selectedRowIndex]);
            }
            // deleteData 상태 업데이트
            setDeleteData([...deleteData, columnDataToDelete]);

        } else {
            if (clickCount !== 0) { //0이면 수정 불가
                setClickCount(clickCount - 1);
            }
        }
    }

    const handleImportCsvData = () => { setIsDataModalOpen(true) };

    // 선택된 행의 인덱스를 설정하는 함수
    const handleRowClick = (index) => { setSelectedRowIndex(index); };

    const handleReload = () => { window.location.reload() };

    const handlePushData = () =>{ setClickCount(clickCount +1) }

    const sortAscending = (columnName) => {
        const sortedData = [...columns.get(columnName)].sort();
        console.log(sortedData)
    };

    const sortDescending = (columnName) => {
        const sortedData = [...columns.get(columnName)].sort().reverse();
        console.log(sortedData)
    };

    const columnPlus = () =>{ setIsColumnAppendModalOpen(true) }

    // 네트워크
    useEffect(() => {
        const socket = new SockJS(`${apiUrl}/websocket-endpoint`);
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/notifications', (message) => {
                const updateTableMessage =  message.body.split(":");
                const updateTable = updateTableMessage[1]
                const dataUpdateUser =  updateTableMessage[2]
                const currentUser = localStorage.getItem("email")

                if (tableID.toString() === updateTable  &&  dataUpdateUser !== currentUser) {
                    //조건식 1. 실행 현재 테이블 ID가 일치하는 테이블 2. 현재 접속한 유저와 업데이트한 유저가 다를경우
                    setError("팀원이 데이터를 수정하였습니다.")
                    setIsErrorModalOpen(true)
                }
                if (tableID.toString() === updateTable && dataUpdateUser === "APIBuilder"){
                    setError("데이터베이스의 API 요청이 들어왔습니다.")
                    setIsErrorModalOpen(true)
                }
            });
        });

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    return (
        <>
            <div className={styles.button}>
                <ul className={styles.menuIconBox}>
                    <div className={styles.leftIcon}>
                        <Button_UI image={Button[0].image} onClick={handleReload} title={"새로고침"}/>
                        <Button_UI image={Button[7].image} onClick={columnPlus} title={"컬럼 확장"}/>
                    </div>
                    <div className={styles.rightIcon}>
                        <Button_UI image={Button[1].image} onClick={handlePushData} title={"데이터 추가"}/>
                        <Button_UI image={Button[2].image} onClick={handleDeleteData} title={"데이터 삭제"}/>
                        {
                            deleteData.length === 0 && createData.length === 0  && updateData.length === 0?(
                                <Button_UI image={Button[3].image} title={"저장"}/>
                            ) : (
                                <Button_UI image={Button[6].image} onClick={() => setIsSendModalOpen(true)} title={"저장"}/>
                            )
                        }
                        <Button_UI image={Button[4].image} onClick={() => setSearchModalOpen(true)} title={"행 데이터 검색"}/>
                        <Button_UI image={Button[5].image} onClick={handleImportCsvData} title={"CSV 데이터 불러오기"}/>
                    </div>
                </ul>
                <div className={`${styles.dataContainer} ${styles.scrollbar}`}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            {[...columns.keys()].map((columnName) => (
                                <th key={columnName}>
                                    <div className={styles.columnContainer}>
                                        <div style={{ display: 'flex', paddingLeft: '10px' }}>
                                            {columnName} {/* 열의 이름 */}
                                            <div className={styles.imageContainer}>
                                                <Image src={up} onClick={() => sortAscending(columnName)}/>
                                                <Image src={down} onClick={() => sortDescending(columnName)}/>
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
                                        tableID={tableID}
                                    />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={success}
                onClickEvent={handleReload}
            />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}
            />
            <SendModalLayOut
                data={"데이터를 변경 하시겠습니까?"}
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onClickEvent={submitModifiedTable}
            />
            <SearchModal
                columns={columns}
                isOpen={isSearchModalOpen}
                closeModal={() => setSearchModalOpen(false)}
                tableID={tableID}
            />
            {isColumnAppendModalOpen &&
                <ColumnAppendModalUI
                    isOpen={isColumnAppendModalOpen}
                    closeModal={() => setIsColumnAppendModalOpen(false)}
                    tableID = {tableID}
                />
            }
            {isDataImportModalOpen &&
                <DataImportModalUI
                    tableID={tableID}
                    onClose={() => setIsDataModalOpen(false)}
                />
            }
        </>
    );
}
