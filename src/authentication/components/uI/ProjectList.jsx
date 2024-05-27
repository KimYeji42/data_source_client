import styles from "../styleModule/MypageStyle.module.css";

export default function ProjectList() {
    return (
        <div className={styles.ContextBox}>
            <ul className={styles.ContextBoxProject}>
                <li className={styles.liStyle}>
                    <div className={styles.ListItemIcon}></div>
                    첫번째 프로젝트 생성 완
                </li>
            </ul>
        </div>
    );
}
