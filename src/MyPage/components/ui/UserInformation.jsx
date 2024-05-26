import styles from "../../styleModule/style.module.css";

export default function UserInformation({title,value}){
    return(
        <div className={styles.UserInforTool}>
            <h6>{title}</h6>
            <input readOnly className={styles.UserInputBox} value={value}/>
        </div>
    )
}