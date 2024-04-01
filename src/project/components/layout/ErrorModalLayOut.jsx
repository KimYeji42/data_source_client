import React from 'react';
import styles from '../styles.module.css';
import {Link} from "react-router-dom"; // 스타일 파일 import

const ErrorModal = ({ isOpen, onClose, error ,clickLink}) => {
    const handleConfirm = () => {
        onClose(); // 모달을 닫음
    };

    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Error</h2>
                <div className={styles.commentBox}>
                    <p className={styles.error}>{error}</p>
                </div>
                <div className={styles.modalBtnBox}>
                    <button onClick={handleConfirm} className={styles.modalCloseBtn}> 확인 </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
