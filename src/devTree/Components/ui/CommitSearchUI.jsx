import styles from "../../styles/styles.module.css";

export default function CommitSearchUI(){
    return(
        <div className={styles.SearchUI}>
            {/*커밋 메세지 선택 박스*/}
            <select className={styles.CommitmsgSelectBox}>
                    <option>커밋 메세지</option>
                    <option>해시값</option>
                    <option>작성자</option>
            </select>
            <div className={styles.SearchBar}>
                <input type={"text"} placeholder={"검색할 커밋 메시지를 입력하세요."} className={styles.CommitMsgSearchBox}/>
                <button className={styles.CommitMsgSearchBtn}>검 색</button>

            </div>
        </div>
    )
}