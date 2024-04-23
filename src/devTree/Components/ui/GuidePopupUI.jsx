import React, {useState} from "react";
import styles from "../../styles/styles.module.css";
import MergeCrashModalLayout from "../layout/MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

const GuidePopupUI = ({ isOpen, onClose, title1, title2, btnTitle, onCrashOpen, onSuccessOpen, onErrorOpen, selectedCommitId, selectedProjectId }) => {

    if (!isOpen) return null;

    const mergeData = async () => {
        try {
            if (!selectedCommitId) return
            const response = await fetch(`http://localhost:8080/api/merge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetCommitId: selectedCommitId,
                    projectId: selectedProjectId,
                    crashList: []
                }),
            });
            const responseData = await response.json();

            if (responseData.number === 1) {
                console.log('병합 성공:', responseData);
                onSuccessOpen() // 성공 모달창 열기
            } else if(responseData.number === 0) {
                console.log('병합 실패:', responseData);
                onErrorOpen() // 실패 모달창 열기
            } else {
                console.log('응답 데이터가 JSON입니다:', responseData);
                await onCrashOpen(responseData) // 충돌 모달창 열기
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                    <div className={styles.commentBox}>
                        <p className={styles.madalCommet}>{title1}</p>
                        <p className={styles.madalCommet}>{title2}</p>
                    </div>
                {/*버튼 footer*/}
                <div className={styles.modalBtnBox}>
                    <button onClick={mergeData} className={styles.modalConfirmBtn}> {btnTitle} </button>
                    <button onClick={onClose} className={styles.modalCloseBtn}> 취소 </button>
                </div>
            </div>
        </div>
    );
};

export default GuidePopupUI;

