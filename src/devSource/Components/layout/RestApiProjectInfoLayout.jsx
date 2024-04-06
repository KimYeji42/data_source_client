import styles from "../../styleModule/createTableStyle.module.css";
import TableNameUI from "../ui/TableNameUI";
import InsertDBNameUI from "../ui/InsertDBNameUI";
import React from "react";

export default function RestApiProjectInfoLayout({data}){
    return(
        <div>
            <div className={styles.namesContainer}>
                <div className={styles.nameTable}>
                    <TableNameUI name="데이터베이스 명"/>
                    <InsertDBNameUI data={data.dataBaseName}/>
                </div>
                <div className={styles.nameTable}>
                    <TableNameUI name="테이블 명"/>
                    <InsertDBNameUI data={data.tableName}/>
                </div>
            </div>
        </div>
    )
}