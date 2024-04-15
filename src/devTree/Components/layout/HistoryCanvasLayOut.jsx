import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import React, {useState} from "react";
import HistoryButtonWhitever from "../ui/HistoryButtonWhitever";
import GuidePopupUI from "../ui/GuidePopupUI";
import MergeCrashModalLayout from "./MergeCrashModalLayout";

export default function HistoryCanvasLayOut(){
    const [isSendModalOpen , setIsSendModalOpen] = useState(false);
    const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
    const openModal = () => {
        console.log("안 되냐?");
    }
    const openMergeModal = () => {
        setIsMergeModalOpen(true);
        setIsSendModalOpen(false);
    };
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
                    title1={"선택된 커밋의 변경사항을"}title2={"현재 분기와 병합하시겠습니까?"}
                    btnTitle={"merge"}
                    onModalOpen={openMergeModal} // Merge 모달 열기 함수 전달
                />
                {/*<MergeCrashModalLayout isOpen={isSendModalOpen} onClose={()=>setIsSendModalOpen(false)}/>*/}
            </div>
            <MergeCrashModalLayout isOpen={isMergeModalOpen} onClose={() => setIsMergeModalOpen(false)} />


        </>
    )
}