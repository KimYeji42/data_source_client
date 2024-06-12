import React from 'react';
import styles from '../styles.module.css';
const Modal = ({ isOpen, onClose, data , onClickEvent}) => {
    const cancelHandler = () => {
        onClose();
    }
    const successHandler = () =>{
        onClickEvent()
        onClose(); // 모달을 닫음
    }
    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Submit Data</h2>
                {/* 프로젝트 정보 표시 */}

                {data && (
                    <div className={styles.commentBox}>
                        {data}
                    </div>
                )}

                <div className={styles.modalBtnBox}>
                    <button onClick={successHandler} className={styles.modalConfirmBtn}> 확인 </button>
                    <button onClick={cancelHandler} className={styles.modalCloseBtn}> 취소 </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
