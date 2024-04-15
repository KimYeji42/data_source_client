import styles from "../../styles/styles.module.css";
import React from "react";


export default function MergeCrashTableUI({ data, onSelect}){

    return(
        <>
            <div className={styles.modalSelectBox}>
                <h5 className={styles.modalselectTitleBox}>충돌된 테이블 목록</h5>
                <ul className={styles.madalselectData}>
                    {data && data.length > 0 && data.map((data, index) => (
                        <li key={index}
                            // className={styles.DataList}
                            // onClick={() => handleSelectTable(data.tableId)}
                        >
                            {data.tableName}
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}