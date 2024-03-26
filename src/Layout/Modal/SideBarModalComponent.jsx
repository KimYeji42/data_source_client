import React from 'react';
import styles from '../../project/components/styles.module.css'; // 스타일 파일 import


const SideBarModal = ({ isOpen, onClose, header, data ,onClick}) => {
    const handleCreate = () => {
        onClose(); // 모달을 닫음
        onClick();
    };

    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{header}</h2>
                {/* 프로젝트 정보 표시 */}
                {data && (
                    <div className={styles.commentBox}>
                        <p>테이블 이름 : {data.name}</p>
                        <p>테이블 설명 : {data.comment}</p>
                    </div>
                )}

                <div className={styles.modalBtnBox}>
                    <button onClick={handleCreate} className={styles.modalConfirmBtn}> 확인 </button>
                </div>
            </div>
        </div>
    );
};

export default SideBarModal;
