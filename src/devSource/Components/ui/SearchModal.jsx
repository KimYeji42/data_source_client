import styles from '../../styleModule/serach.module.css'
import {Image} from "react-bootstrap";
import {Button} from "./ButtonUI";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import { useState } from "react";
export default function SearchModal({isOpen , closeModal , columns}){
    const [isSendModal , setSendModal] = useState(false)
    const [sendMessage , setSendMessage] = useState("")
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)

    const [searchColumnText , setSearchColumnText] = useState("")
    function confirmText(){
        let columnList = columns.keys()
        const columnSet = new Set(columnList)
        let find = searchColumnText.search("/")

        if (find !== -1){
            let userSearchTextColumns = searchColumnText.split("/")
            let result = true
            let userSearchText = ""
            for (let column in userSearchTextColumns){
                let userSearchColumn = userSearchTextColumns[column]
                if (!columnSet.has(userSearchColumn))
                    result = false
                userSearchText += userSearchColumn
            }
            if (result){
                setSendModal(true)
                return
            }
        }
        setIsErrorModalOpen(true)
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/data/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const dataType = await response.text();
            console.log(dataType)
        } catch (error) {
            console.log(error);
        }
    };

    if (!isOpen) return null;

    return(
        <div>
            <div className={styles.searchModalBox}>

                <div className={styles.inputContainer}>
                    <Image src={Button[4].image} className={styles.searchIcon}/>
                    <input type={"text"} placeholder={"ex) person_name/person_age"}
                           onChange={(event) => setSearchColumnText(event.target.value)}
                    />
                    <ButtonUI className={styles.sendButton} onClick={confirmText} children={"검색"}/>
                </div>

                <div className={styles.description}>
                    <small>컬럼 명 (을) / 로 구분 해 주세요.</small>
                </div>

                <div className={styles.dataContainer}>
                    <h6 className={styles.column}>Column</h6>
                    <p className={styles.columnData}>Example</p>
                    <p>Example</p>
                    <p>Example</p>
                    <p>Example</p>
                    <p>Example</p>
                </div>

                <div className={styles.closeButtonContainer}>
                    <button onClick={() => closeModal(false)} className={styles.closeButton}>닫기</button>
                </div>

            </div>
        </div>

    )
}