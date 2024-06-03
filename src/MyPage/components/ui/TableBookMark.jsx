import styles from "../../styleModule/MypageStyle.module.css";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function TableBookMark({favoriteTableResponses}) {
    return (
        <div className={styles.ContextBox}>
            <ul className={styles.ContextBoxProject}>
                {favoriteTableResponses && favoriteTableResponses.map((data, index) => (
                    <li className={styles.liStyle}>
                        <Link to={`/table/${data.id}`} className={styles.linkStyle}>
                            <div className={styles.ListItemIcon}>
                                <Image src={"image/database-table-icon.png"} className={styles.imageLogo}></Image>
                            </div>
                            <p className={styles.textContainer}>{data.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
