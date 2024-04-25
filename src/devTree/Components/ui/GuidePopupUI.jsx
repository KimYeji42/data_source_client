import React, {useState} from "react";
import styles from "../../styles/styles.module.css";
import MergeCrashModalLayout from "../layout/MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

const MergeGuidePopupUI = ({ isOpen, onClose, onRequest, message1, message2, button}) => {

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                    <div className={styles.commentBox}>
                        <p className={styles.madalCommet}>{message1}</p>
                        <p className={styles.madalCommet}>{message2}</p>
                    </div>
                {/*버튼 footer*/}
                <div className={styles.modalBtnBox}>
                    <button onClick={onRequest} className={styles.modalConfirmBtn}> {button} </button>
                    <button onClick={onClose} className={styles.modalCloseBtn}> 취소 </button>
                </div>
            </div>
        </div>
    );
};

export default MergeGuidePopupUI;

