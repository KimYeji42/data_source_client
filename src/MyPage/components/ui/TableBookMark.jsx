import styles from "../../styleModule/MypageStyle.module.css";
import {Image} from "react-bootstrap";

export default function TableBookMark() {
    return (
        <div className={styles.ContextBox}>
            <ul className={styles.ContextBoxProject}>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}>
                        <Image src={"image/database-table-icon.png"} className={styles.imageLogo}></Image>
                    </div>
                    <p className={styles.textContainer}>첫번째 프로젝트 즐찾</p>
                </li>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}>
                        <Image src={"image/database-table-icon.png"} className={styles.imageLogo}></Image>
                    </div>
                    <p className={styles.textContainer}>첫번째 프로젝트 즐찾</p>
                </li>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}>
                        <Image src={"image/database-table-icon.png"} className={styles.imageLogo}></Image>
                    </div>
                    <p className={styles.textContainer}>첫번째 프로젝트 즐찾</p>
                </li>
            </ul>

        </div>
    );
}
