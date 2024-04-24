import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import React, {useState} from "react";
import GuidePopupUI from "../ui/GuidePopupUI";
import MergeCrashModalLayout from "./MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function HistoryCanvasLayOut({ selectedCommitId, selectedProjectId }){
    const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
    const [isSendModalOpen , setIsSendModalOpen] = useState(false);
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false);
    const [isMergeComplete , setIsMergeComplete] = useState(false);

    const [crashData, setCrashData] = useState(null);

    const handleRefresh = () => { window.location.reload(); };

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

    const openErrorModal = () => {
        setIsSendModalOpen(false);
        setIsMergeModalOpen(false);
        setIsErrorModalOpen(true);
    };

    const setCrashRequest = async (target, check) => {
        mergeData(target, check)
    }

    const mergeData = async (target, check) => {
        try {
            if ((!target && !check) || isMergeComplete === true) return

            setIsMergeComplete(true)
            const response = await fetch(`http://localhost:8080/api/merge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    targetCommitId: selectedCommitId,
                    projectId: selectedProjectId,
                    crashTargetList: target,
                    crashCheckList: check,
                }),
            });
            const responseData = await response.json();

            if (responseData.number === 1) {
                console.log(responseData.number);
                setIsMergeComplete(false)
                openSuccessModal()
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return(
        <>
            <div className={styles.buttonContainerF}>
                <HistoryButtonUI title={"Commit"} clickLink={'/status'}/>
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
                    onErrorOpen={openErrorModal} // 오류 모달 열기
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

                <ErrorModal
                    isOpen={isErrorModalOpen}
                    onClose={()=>setIsErrorModalOpen(false)}
                    error={"같은 커밋끼리 병합할 수 없습니다."}
                />
            </div>

        </>
    )
}