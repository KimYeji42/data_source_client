import React from 'react';
import styles from '../styles.module.css';
import {Link} from "react-router-dom"; // 스타일 파일 import

const Modal = ({ isOpen, onClose, data ,onClick , clickLink}) => {
    const handleCreate = () => {
        onClose(); // 모달을 닫음
        onClick();
    };

    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{data}</h2>
                {/* 프로젝트 정보 표시 */}
                {data && (
                    <div className={styles.commentBox}>
                        {data}
                    </div>
                )}

                <div className={styles.modalBtnBox}>
                    <Link to={clickLink}> <button onClick={handleCreate} className={styles.modalConfirmBtn}> 확인 </button> </Link>
                </div>
            </div>
        </div>
    );
};

export default Modal;
