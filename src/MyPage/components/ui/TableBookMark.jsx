import styles from "../../styleModule/MypageStyle.module.css";

export default function TableBookMark() {
    return (
        <div className={styles.ContextBox}>
            <ul className={styles.ContextBoxProject}>
                <li className={styles.liStyle}>
                    <div className={styles.TableIcon}></div>
                    테이블 저장
                </li>
            </ul>

        </div>
    );
}
