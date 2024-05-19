import styles from "../styles.module.css";

export default function TitleUI ({title}){
    return(
        <>
            <h1 className={styles.title}>{title}</h1>
            <hr className={styles.textLine}/>
        </>
    )
}