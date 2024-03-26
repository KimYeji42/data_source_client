import styles from "../../styles/styles.module.css"

export default function SelectionUI({title , data}){
    return(
        <div>
            <div className={styles.smailSelectBox}>
                <h5 className={styles.selectTitleBox}>{title}</h5>
                <ul className={styles.selectData}>
                    {data.map((data , index) => (
                        <li key={index}>데이터 항목</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}