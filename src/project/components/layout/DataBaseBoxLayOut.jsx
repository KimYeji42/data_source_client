import styles from "../styles.module.css";
import BoxUI from "../uI/BoxUI";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import SendModalLayOut from "./SendModalLayOut";
import SuccessModalLayout from "./SuccessModalLayout";

export default function DataBaseBoxLayOut() {
    const [sendModalMessage , setSendModalMessage] = useState()
    const [isSendModalOpen , setSendModalOpen] = useState(false)
    const [successMessage , setSuccessMessage] = useState(false)
    const [successModalOpen , setSuccessModalOpen] = useState(false)
    const [favoriteItem , setFavoriteItem] = useState()
    const [deleteItem , setDeleteItem] = useState()
    const { dataBaseID } = useParams();
    const [activeTable, setActiveTable] = useState(null); // 선택된 테이블을 저장하는 상태 변수
    const [dataBaseTables , setDataBaseTables] = useState([])
    const handleClick = () => {
        alert(activeTable.id)
    };
    const reloadPage = () =>{
        window.location.reload()
    }

    const starBtnClickHandler = (item) =>{
        setFavoriteItem(item)
        if (item.isFavorite === 1)
            setSendModalMessage(`${item.name} 테이블을 즐겨찾기를 해제 하시겠습니까?`)
        else
            setSendModalMessage(`${item.name} 테이블을 즐겨찾기 하   시겠습니까?`)
        setSendModalOpen(true)
    }

    const deleteBtnClickHandler = (item) =>{
        setDeleteItem(item)
        setSendModalMessage(`${item.name} 테이블을 삭제 하시겠습니까?`)
        setSendModalOpen(true)
    }

    const tableStatusUpdate = async () => {
        if (deleteItem != null || favoriteItem == null)
            await deleteDataSend(); // 비동기 처리를 위해 await 추가
        else
            await updateDataSend(); // 비동기 처리를 위해 await 추가
    }

    const updateDataSend = async () =>{
        let obj = {
            favoriteTableId : favoriteItem.id,
            favoriteTableName :favoriteItem.name
        }
        console.log(obj)
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/table/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Data sent successfully:', responseData);
                console.log(responseData.message);
                setSuccessMessage(responseData.message)
                if (successModalOpen !== true){
                    setSuccessModalOpen(true)
                }
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    const deleteDataSend =  async () => {
        let obj = {
            deleteTableID : deleteItem.id,
            deleteTableName:deleteItem.name
        }
        console.log(obj)

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/table/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Data sent successfully:', responseData);
                console.log(responseData.message);
                setSuccessMessage(responseData.message)
                if (successModalOpen !== true){
                    setSuccessModalOpen(true)
                }
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    const getDatabaseTables = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/table/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setDataBaseTables(responseData);
            console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        getDatabaseTables()
    }, []);


    function extractDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월
        const day = String(date.getDate()).padStart(2, '0'); // 일


        return `${year}-${month}-${day}일`;
    }

    return (
        <>
            <div className={styles.dataBaseBoxButton}>
                {activeTable ? (
                    <Link to={`/table/${activeTable.id}`}>
                        <button className={styles.blueButton} onClick={handleClick}>
                            테이블 데이터 관리하기
                        </button>
                    </Link>
                ) : (
                    <button className={styles.inactiveButton} disabled>
                        테이블 데이터 관리하기
                    </button>
                )}
            </div>

            <div className={`${styles.dataBaseContentBox} ${styles.scrollbar}`}>
                {dataBaseTables.map((item , index) => (
                    <BoxUI
                        header={item.name}
                        imageSrc={"../image/table_icon.png"}
                        comment={item.comment}
                        item = {item}
                        date={extractDate(item.updateTime)}
                        setActiveTable = {setActiveTable}
                        activeTable={activeTable}
                        starBtnClickHandler = {starBtnClickHandler}
                        deleteBtnClickHandler = {deleteBtnClickHandler}
                    />
                ))}
            </div>
            <SendModalLayOut
                data={sendModalMessage}
                onClose={() => setSendModalOpen(false)}
                isOpen={isSendModalOpen}
                onClickEvent={tableStatusUpdate}
            />

            <SuccessModalLayout
                data={successMessage}
                onClose={() => setSuccessMessage(false)}
                isOpen={successModalOpen}
                onClickEvent={reloadPage}
            />
        </>
    );
}