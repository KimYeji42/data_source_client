import styles from '../../styleModule/serach.module.css'
export default function SearchModal({isOpen , closeModal}){

    if (!isOpen) return null;

    return(
        <div>
            <div className={styles.searchModalBox}>
                <h1>검색 모달입니다.</h1>
                <button onClick={() => closeModal(false)}>닫기</button>
            </div>
        </div>

    )
}