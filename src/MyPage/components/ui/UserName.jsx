import styles from "../../styleModule/MypageStyle.module.css";


export default function UserName({Name}){
    return (
        <>
            <h4 className={styles.UserName}>{Name} 님</h4>
        </>

    )
}