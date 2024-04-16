import styles from "../../styles/styles.module.css";
import React from "react";


export default function MergeCrashTableUI({ data, onSelect }){

    const handleSelectTable = (index) => {
        onSelect(index)
        console.log(index)
    };


    return(
        <>
            <div className={styles.modalSelectBox}>
                <h5 className={styles.modalselectTitleBox}>충돌된 테이블 목록</h5>
                <ul className={styles.madalselectData}>
                    {data && data.length > 0 && data.map((data, index) => (
                        <li key={index}
                            className={styles.DataList}
                            onClick={() => handleSelectTable(index)}
                        >
                            {data.tableName}
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
}