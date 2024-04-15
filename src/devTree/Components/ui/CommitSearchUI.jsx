import styles from "../../styles/styles.module.css";

export default function CommitSearchUI(){
    return(
        <div className={styles.SearchUI}>
            {/*커밋 메세지 선택 박스*/}
            <select className={styles.CommitmsgSelectBox}>
                    <option>커밋 메세지</option>
                    <option>오렌지</option>
                    <option>보나보나</option>
                    <option>고마워</option>
                    <option>멍청이</option>
            </select>
            <div className={styles.SearchBar}>
                <input type={"text"} placeholder={"검색할 커밋 메시지를 입력하세요."} className={styles.CommitMsgSearchBox}/>
                <button className={styles.CommitMsgSearchBtn}>검 색</button>

            </div>
        </div>
    )
}