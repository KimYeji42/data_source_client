import styles from "../styles.module.css";
import React from "react";
import {Link} from "react-router-dom";

export default function SuccessModalLayout({ isOpen, onClose, data  , clickLink , onClickEvent}){
    const successHandler = () =>{
        onClickEvent?.();
        onClose();
    }
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
                    <Link to={clickLink}>
                        <button onClick={successHandler} className={styles.modalConfirmBtn}> 확인 </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}