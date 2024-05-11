import React from "react";
import styles from "../../styles/styles.module.css";

const ResetGuidePopupUI = ({ isOpen, onClose, onErrorOpen, selectedCommitId, handleRefresh}) => {

    if (!isOpen) return null;

    const reset = async () => {
        try {
            if (!selectedCommitId) {
                onErrorOpen("선택한 커밋이 없습니다.")
                return
            }
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/reset/${selectedCommitId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.text();
            console.log(responseData)
            handleRefresh()

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.commentBox}>
                    <p className={styles.madalCommet}>현재 커밋 상태를 선택한 분기로</p>
                    <p className={styles.madalCommet}>되돌리시겠습니까?</p>
                    <p>(작업 공간도 변경되며, 실행하면 되돌아갈 수 없습니다.)</p>
                </div>
                <div className={styles.modalBtnBox}>
                    <button onClick={reset} className={styles.modalConfirmBtn}> reset </button>
                    <button onClick={onClose} className={styles.modalCloseBtn}> 취소 </button>
                </div>
            </div>
        </div>
    );
};

export default ResetGuidePopupUI;

