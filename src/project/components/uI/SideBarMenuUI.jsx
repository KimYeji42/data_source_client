import styles from "../styles.module.css";

export default function SideBarMenuUI({header , data}){
    return(
        <div>
            <h5 className={styles.dataBaseMenuHeader}>{header}</h5>
            <ul className={styles.dataBaseMenuList}>
                {data.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}