import styles from "../../styles/styles.module.css"

export default function SelectionChangeTableUI({title , data, onSelect}){

    const handleSelectTable = (tableId) => {
        onSelect(tableId)
        console.log(tableId)
    };

    return(
        <div>
            <div className={styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>{title}</h5>
                <ul className={styles.smallselectData}>
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
        </div>
    )
}