import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import React, {useState} from "react";
import GuidePopupUI from "../ui/GuidePopupUI";
import MergeCrashModalLayout from "./MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

export default function HistoryCanvasLayOut({ selectedCommitId, selectedProjectId }){
    const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
    const [isSendModalOpen , setIsSendModalOpen] = useState(false);
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false);
    const [crashData, setCrashData] = useState(null);
    const [selectedCrashData, setSelectedCrashData] = useState([]);

    const handleRefresh = () => {
        window.location.reload();
    };

    const openCrashModal = (crash) => {
        setCrashData(crash)
        setIsMergeModalOpen(true);
        setIsSendModalOpen(false);
    };

    const openSuccessModal = () => {
        setIsSendModalOpen(false);
        setIsMergeModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const setCrashRequest = async (crash) => {
        await setSelectedCrashData(crash)
        mergeData()
    }

    const mergeData = async () => {
        try {
            if (!selectedCrashData) return
            const response = await fetch(`http://localhost:8080/api/merge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetCommitId: selectedCommitId,
                    projectId: selectedProjectId,
                    crashList: selectedCrashData
                }),
            });
            const responseData = await response.json();

            if (typeof responseData.message === 'string') {
                console.log(responseData.message);
                openSuccessModal()
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
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
                    title1={"선택된 커밋의 변경사항을"} title2={"현재 분기와 병합하시겠습니까?"}
                    btnTitle={"merge"}
                    onCrashOpen={openCrashModal} // 충돌 모달 열기 함수
                    onSuccessOpen={openSuccessModal} // 성공 모달 열기 함수
                    selectedCommitId={selectedCommitId}
                    selectedProjectId={selectedProjectId}
                />

                <MergeCrashModalLayout
                    crashData={crashData}
                    isOpen={isMergeModalOpen}
                    onClose={() => setIsMergeModalOpen(false)}
                    setCrashRequest={setCrashRequest}
                />

                <SuccessModalLayout
                    isOpen={isSuccessModalOpen}
                    onClose={()=>setIsSuccessModalOpen(false)}
                    data={"병합에 성공하셨습니다."}
                    clickLink={'/History'}
                    onClickEvent={handleRefresh}
                />
            </div>

        </>
    )
}