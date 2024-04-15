import React from "react";
import styles from "../../styles/styles.module.css";
import MergeCrashTableUI from "../ui/MergeCrashTableUI";
import MargeCrashChartUI from "../ui/MargeCrashChartUI";

const MergeCrashModalLayout =({isOpen, onClose}) => {
    const handleCreate = () => {
        onClose(); // 모달을 닫음

    };

    // isOpen이 false이면 모달을 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div>
            <div className={styles.modalOverlay}>
                <div className={styles.mergemodal}>
                    <p className={styles.mergeGuideTxt}>병합하려는 커밋과 현재 커밋의 테이블에 <span className={styles.mergeGuideTxtBold}>충돌하는 PK</span>가 존재합니다.<br/>충돌 해결 후 다시 시도해 주세요.</p>
                    <div className={styles.madalLayout}>
                        <MergeCrashTableUI/>
                        <MargeCrashChartUI/>
                    </div>
                    <div className={styles.mergemodalBtnBox}>
                        <button className={styles.modalCancelBtn} onClick={handleCreate}>병합하기</button>
                        <button className={styles.modalCloseBtn} onClick={handleCreate}>작업 취소</button>
                    </div>
                </div>

            </div>

        </div>

    );

}

export default MergeCrashModalLayout;