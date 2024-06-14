import styles from "../../styles/styles.module.css"

export default function SelectionUI({title , data, onSelect}){

    const handleSelectTable = (tableId) => {
        onSelect(tableId)
    };

    return(
        <>
            <div className={styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>{title}</h5>
                <ul className={`${styles.selectData} ${styles.scrollbar}`}>
                    {data && data.length > 0 && data.map((data, index) => (
                        <li key={index}
                            className={styles.DataList}
                            onClick={() => handleSelectTable(data.tableID)}
                        >
                            {data.tableName}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}