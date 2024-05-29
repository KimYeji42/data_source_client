import React, { useEffect, useRef } from 'react';
import styles from '../styles.module.css';

const ErrorModal = ({ isOpen, onClose, error, clickLink }) => {
    const btuRef = useRef(null);

    const handleConfirm = () => {
        onClose(); // 모달을 닫음
    };

    useEffect(() => {
        if (isOpen && btuRef.current) {
            setTimeout(() => {
                btuRef.current.focus();
            }, 0);
        }
    }, [isOpen]);

    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} >
            <div className={styles.errorModal}>
                <h2 className={styles.errorModalTitle}>Error</h2>
                <div className={styles.commentBox}>
                    <p className={styles.error}>{error}</p>
                </div>
                <div className={styles.modalBtnBox}>
                    <button onClick={handleConfirm} className={styles.modalCloseBtn} ref={btuRef}> 확인 </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
