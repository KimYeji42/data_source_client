import styles from "../styles.module.css";
import {Link} from "react-router-dom";

export default function({cardTitle, iconImage, buttonTitle , link}){
    return (
        <div className={styles.ProjectViewCard}>
            <div className={styles.ViewCardTitle}>
                {cardTitle}
                <div className={styles.ViewCardIcon}>{iconImage}</div>
            </div>
            <Link to={link}>
                <button className={styles.ViewCardBtn}>{buttonTitle}</button>
            </Link>
        </div>

    )
}