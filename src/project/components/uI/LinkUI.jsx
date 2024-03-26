import styles from "../styles.module.css";
import {Link} from "react-router-dom";

export default function LinkUI({text , redirect}){
    return(
        <div className={styles.linkUI}>
            <Link to={redirect} className={styles.link} >{text}</Link>
            {/*LinkTag 변경 필요*/}
        </div>
    )
}