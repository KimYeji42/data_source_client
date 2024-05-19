import styles from "../../styles/styles.module.css"

export default function SelectionChangeTableUI({title , data, onSelect, Status}){

    const handleSelectTable = (tableId) => {
        onSelect(tableId)
        console.log(tableId)
    };

    return(
        <>
            <div className={Status ? styles.smailSelectBoxStatus : styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>{title}</h5>
                <ul className={`${styles.smallselectData} ${styles.scrollbar}`} >
                    {data && Object.entries(data).map(([key, value], index) => (
                        <li key={index}
                            className={styles.DataList}
                            onClick={() => handleSelectTable(index)}
                        >
                            {key}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}