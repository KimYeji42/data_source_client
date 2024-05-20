import styles from "../styles.module.css";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";

export default function ViewCardTitle ({ link, title }){
    return(
        <>
            <Link to={link} className={styles.ViewCardTitle}>
                <button className={styles.ViewCardBtn}>
                    {title} &nbsp;
                    <Image src="../image/arrow.png" className={styles.ViewCardBtnImg}/>
                </button>
            </Link>
        </>
    )
}