import React, {useState} from "react";
import styles from "../../styles/styles.module.css";
import MergeCrashModalLayout from "../layout/MergeCrashModalLayout";

const GuidePopupUI = ({ isOpen, onClose, title1, title2,btnTitle, onModalOpen }) => {
    const [isSendModalOpen , setIsSendModalOpen] = useState(false);

    const handleCreate = () => {
        onClose(); // 모달을 닫음

    };

    //충돌시 충돌해결 모달
    const newmodal = () => {
        onClose(); //기존 모달 닫기
    }

    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                    <div className={styles.commentBox}>
                        <p className={styles.madalCommet}>{title1}</p>
                        <p className={styles.madalCommet}>{title2}</p>
                    </div>
                {/*버튼 footer*/}
                <div className={styles.modalBtnBox}>
                    <button onClick={onModalOpen} className={styles.modalConfirmBtn}> {btnTitle} </button>
                    <button onClick={handleCreate} className={styles.modalCloseBtn}> 취소 </button>

                </div>
            </div>
        </div>
    );
};

export default GuidePopupUI;

