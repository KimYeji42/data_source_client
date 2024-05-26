import styles from "../../styleModule/style.module.css";

export default function UserName({Name}){
    return (
        <div className={styles.UserNameTool}>
            <h4 className={styles.UserName}>{Name} 님</h4>
        </div>

    )
}