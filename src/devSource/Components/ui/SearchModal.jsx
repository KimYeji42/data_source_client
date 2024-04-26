import styles from '../../styleModule/serach.module.css'
import {Image} from "react-bootstrap";
import {Button} from "./ButtonUI";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import { useState } from "react";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SendModalLayOut from "../../../project/components/layout/SendModalLayOut";
import DataContainerLayout from "../layout/DataContainerLayout";
export default function SearchModal({isOpen , closeModal , columns , tableID}){
    const [isSendModal , setSendModal] = useState(false)
    const [sendMessage , setSendMessage] = useState("")
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)
    const [errorMessage , setErrorMessage] = useState("")
    const [columnsResponseData , setColumnResponseData] = useState(null)
    const [searchColumnText , setSearchColumnText] = useState("")
    function confirmText(){
        let columnList = columns.keys()
        const columnSet = new Set(columnList)
        let find = searchColumnText.search(",")
        let result = true
        let userSearchText = ""

        if (find !== -1){
            let userSearchTextColumns = searchColumnText.split(",")
            for (let column in userSearchTextColumns){
                let userSearchColumn = userSearchTextColumns[column]
                if (!columnSet.has(userSearchColumn))
                    result = false
                userSearchText += (userSearchColumn +" ")
            }
        }else {
            if (!columnSet.has(searchColumnText)){
                result = false
            }
            userSearchText += (searchColumnText + " ")
        }
        console.log(result)
        if (result){
            setSendModal(true)
            setSendMessage(userSearchText +"컬럼 을 검색 하시겠습니까?")
        }
        else {
            setIsErrorModalOpen(true)
            setErrorMessage(userSearchText +"의 컬럼중 존재하지 않는 컬럼이 있습니다.")
        }

    }

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/data/${searchColumnText}/${tableID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const columnsData = await response.json();
            setColumnResponseData(columnsData)
            console.log(`호출 ${columnsData}`)
        } catch (error) {
        }
    };


    if (!isOpen) return null;

    return(
        <div>
            <div className={styles.searchModalBox}>

                <div className={styles.inputContainer}>
                    <Image src={Button[4].image} className={styles.searchIcon}/>
                    <input type={"text"} placeholder={"ex) person_name,person_age"}
                           onChange={(event) => setSearchColumnText(event.target.value)}
                    />
                    <ButtonUI className={styles.sendButton} onClick={confirmText} children={"검색"}/>
                </div>

                <div className={styles.description}>
                    <small>컬럼 명 (을) , 로 구분 해 주세요.</small>
                </div>

                {columnsResponseData && <DataContainerLayout columnsData={columnsResponseData} />}

                <div className={styles.closeButtonContainer}>
                    <button onClick={() => closeModal(false)} className={styles.closeButton}>닫기</button>
                </div>
            </div>

            <ErrorModal
                error={errorMessage}
                onClose={()=>setIsErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
            <SendModalLayOut
                data={sendMessage}
                isOpen={isSendModal}
                onClose={() => setSendModal(false)}
                onClickEvent={fetchData}
            />

        </div>

    )
}