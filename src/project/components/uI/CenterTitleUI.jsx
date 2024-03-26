import {Image} from "react-bootstrap";
import styles from "../styles.module.css";

export default function CenterTitleUI({text}){
    return(
        <div className={styles.dataBaseTitle}>
            <h1>
                <Image src="../image/searchDataBase.png" alt="Search Database" className={styles.dataBaseTitleImage}/>
                {text}
            </h1>
        </div>
    )
}