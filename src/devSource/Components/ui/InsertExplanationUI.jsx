import styles from '../../styleModule/createTableStyle.module.css';

export default function InsertExplanationUI({setTableComment}){
    return(
        <div className={styles.insertBox}>
            <input className={styles.insertExplanation}
                   type={"text"}
                   onChange={(e) => setTableComment(e.target.value)} // 입력 값이 변경될 때마다 setTableName 함수를 호출하여 값을 업데이트합니다.
            />

        </div>
    )
}