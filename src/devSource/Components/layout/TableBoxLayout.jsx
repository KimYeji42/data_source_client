import styles from '../../styleModule/createTableStyle.module.css';
import TableNameUI from "../ui/TableNameUI";
import InsertTableNameUI from "../ui/InsertTableNameUI";
import InsertDBNameUI from "../ui/InsertDBNameUI";
import InsertExplanationUI from "../ui/InsertExplanationUI";
import ExplanationTitleUI from "../ui/ExplanationTitleUI";
import SelectColumnLayout from "./SelectColumnLayout";
import React, { useState } from "react";
import TitleUI from "../../../project/components/uI/TitleUI";

export default function TableBoxLayout({data}) {
    const [tableName , setTableName] = useState(" "); //TableName을 저장할 변수
    const [tableComment , setTableComment] = useState(" ");
    const [columnData , setColumnData] = useState([{}])

    const sendTableData = () => {
        let obj = {
            tableName : tableName,
            comment : tableComment,
            columnList : columnData,
            dataBaseID : data.id,
        }
        console.log(obj)
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
                        <InsertDBNameUI data={data}/>
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
        </div>
    )
}