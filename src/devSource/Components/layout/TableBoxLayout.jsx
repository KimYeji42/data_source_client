import styles from '../../styleModule/createTableStyle.module.css';
import TableNameUI from "../ui/TableNameUI";
import InsertTableNameUI from "../ui/InsertTableNameUI";
import InsertDBNameUI from "../ui/InsertDBNameUI";
import InsertExplanationUI from "../ui/InsertExplanationUI";
import ExplanationTitleUI from "../ui/ExplanationTitleUI";
import SelectColumnLayout from "./SelectColumnLayout";
import React, { useState } from "react";
import TitleUI from "../../../project/components/uI/TitleUI";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SendModalLayOut from "../../../project/components/layout/SendModalLayOut";

export default function TableBoxLayout({data}) {
    const [tableName , setTableName] = useState(" "); //TableName을 저장할 변수
    const [tableComment , setTableComment] = useState(" ");
    const [columnData , setColumnData] = useState([{}])
    const [isSendModalOpen , setIsSendModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [success , setSuccess] = useState("")

    const sendTableData =  async () => {
        let obj = {
            tableName : tableName,
            comment : tableComment,
            columnList : columnData,
            dataBaseID : data.id,
        }
        console.log(obj)
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Data sent successfully:', responseData);
                console.log(responseData.message);
                setSuccess(responseData.message)
                setIsSuccessModalOpen(true)
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
            console.log(obj);
        } catch (error) {
            console.error('Error sending data:', error);
            setError(error.message);
            setIsErrorModalOpen(true);
        }
    }

    return(
        <div>
            <div className={styles.tableBox}>
                <div>
                    <TitleUI title={"새로운 테이블 생성"}/>
                </div>

                <div className={styles.namesContainer}>
                    <div className={styles.nameTable}>
                        <TableNameUI name="테이블명"/>
                        <InsertTableNameUI setTableName={setTableName}/>
                    </div>
                    <div className={styles.nameTable}>
                        <TableNameUI name="데이터베이스명"/>
                        <InsertDBNameUI data={data.name}/>
                    </div>
                </div>

                <div className={styles.explanationContainer}>
                    <ExplanationTitleUI title="설명"/>
                    <InsertExplanationUI setTableComment ={setTableComment}/>
                </div>

                <div className={styles.dictionary}>
                    <div className={styles.selectHeader}>
                        <SelectColumnLayout
                            setColumnList = {setColumnData}
                            sendColumnData={sendTableData}
                        />
                    </div>
                </div>
            </div>
            <
                SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={success}
                clickLink={`/tables/${data.id}`}
            />
            <
                ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}
            />
            <SendModalLayOut
                data={"테이블을 생성하시겠습니까?"}
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onClickEvent={sendTableData}
            />
        </div>
    )
}