import styles from "../styleModule/MypageStyle.module.css";

export default function ProjectBookMark() {
    return (
        <div className={styles.ContextBox}>
            <ul className={styles.ContextBoxProject}>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}></div>
                    첫번째 프로젝트 즐찾
                </li>
            </ul>
            <ul className={styles.ContextBoxProject}>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}></div>
                    두번째로 만든 프로젝트
                </li>
            </ul>
            <ul className={styles.ContextBoxProject}>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}></div>
                    세개쨰
                </li>
            </ul>
        </div>
    );
}
