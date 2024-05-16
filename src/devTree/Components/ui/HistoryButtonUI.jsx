import styles from "../../styles/styles.module.css";
import {Link} from "react-router-dom";

export default function HistoryButtonUI({title, imgLink, onClick, clickLink}){
    return(
        <div className={styles.HistoryBtns}>
            <Link to={clickLink}>
                <button className={styles.HistoryBtn} onClick={onClick}>
                    <img src={imgLink} className={styles.HistoryBtnImg}/>
                    &nbsp;{title}
                </button>
            </Link>
        </div>
    )
}