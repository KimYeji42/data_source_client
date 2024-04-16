import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import React, {useState} from "react";
import HistoryButtonWhitever from "../ui/HistoryButtonWhitever";
import GuidePopupUI from "../ui/GuidePopupUI";
import MergeCrashModalLayout from "./MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

export default function HistoryCanvasLayOut({ selectedCommitId, selectedProjectId }){
    const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
    const [isSendModalOpen , setIsSendModalOpen] = useState(false);
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false);
    const [crashData, setCrashData] = useState(null)

    const openCrashModal = () => {
        setIsMergeModalOpen(true);
        setIsSendModalOpen(false);
    };

    const openSuccessModal = () => {
        setIsSuccessModalOpen(true);
        setIsSendModalOpen(false);
    };

    const crashResponse = (crash) => {
        setCrashData(crash)
    }

    return(
        <>
            <div className={styles.buttonContainerF}>
                <HistoryButtonUI title={"Commit"}/>
                {/*<HistoryButtonWhitever title={"Merge reqeust"} icon={"↑"} number={"3"} />*/}
                {/*<HistoryButtonWhitever title={"Update branch"} icon={"↓"} number={""} />*/}
            </div>
            <div className={styles.buttonContainerT}>
                <HistoryButtonUI title={"Reset"}/>
                <HistoryButtonUI title={"Merge"} onClick={() => setIsSendModalOpen(true)}/>
                <GuidePopupUI
                    isOpen={isSendModalOpen}
                    onClose={() => setIsSendModalOpen(false)}
                    title1={"선택된 커밋의 변경사항을"} title2={"현재 분기와 병합하시겠습니까?"}
                    btnTitle={"merge"}
                    onCrashOpen={openCrashModal} // 충돌 모달 열기 함수
                    onSuccessOpen={openSuccessModal} // 성공 모달 열기 함수
                    crashResponse={crashResponse} // 충돌 데이터 저장
                    selectedCommitId={selectedCommitId}
                    selectedProjectId={selectedProjectId}
                />

                <MergeCrashModalLayout
                    isOpen={isMergeModalOpen}
                    onClose={() => setIsMergeModalOpen(false)}
                    crashData={crashData}
                />

                <SuccessModalLayout
                    isOpen={isSuccessModalOpen}
                    onClose={()=>setIsSuccessModalOpen(false)}
                    data={"병합에 성공하셨습니다."}
                    clickLink={'/History'}
                />
            </div>

        </>
    )
}