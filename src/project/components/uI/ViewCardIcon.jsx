import styles from "../styles.module.css";
import {Image} from "react-bootstrap";

export default function ViewCardIcon ({src}){
    return(
        <>
            <div className={styles.ViewCardIconBox}>
                <div className={styles.ViewCardIcon}>
                    <Image src={src} className={styles.InformationIcon}/>
                </div>
            </div>
        </>
    )
}