import styles from "../../styles/styles.module.css"
import {useState, useEffect} from "react";

export default function SelectionSmallUI({title , data, onSelect}){

    const handleSelectTable = (tableId) => {
        onSelect(tableId)
    };

    return(
        <div>
            <div className={styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>{title}</h5>
                <ul className={styles.smallselectData}>
                    {data && data.length > 0 && data.map((data, index) => (
                        <li key={index}
                            className={styles.DataList}
                            onClick={() => handleSelectTable(data.tableId)}
                        >
                            {data.tableName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}