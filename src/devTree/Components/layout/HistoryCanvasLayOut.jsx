import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import React, {useState} from "react";
import MergeGuidePopupUI from "../ui/MergeGuidePopupUI";
import MergeCrashModalLayout from "./MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import ResetGuidePopupUI from "../ui/ResetGuidePopupUI";

export default function HistoryCanvasLayOut({ selectedCommitId, selectedProjectId }){
    const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [isSendModalOpen , setIsSendModalOpen] = useState(false);
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false);
    const [errorMessage , setErrorMessage] = useState("");
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

    const openErrorModal = (message) => {
        setErrorMessage(message)
        setIsSendModalOpen(false);
        setIsMergeModalOpen(false);
        setIsResetModalOpen(false);
        setIsErrorModalOpen(true);
    };

    const setCrashRequest = async (target, check) => {
        await mergeData(target, check)
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
                <HistoryButtonUI title={"Reset"} clickLink={'/history'} onClick={() => setIsResetModalOpen(true)}/>
                <HistoryButtonUI title={"Merge"} clickLink={'/history'} onClick={() => setIsSendModalOpen(true)}/>

                <MergeGuidePopupUI
                    isOpen={isSendModalOpen}
                    onClose={() => setIsSendModalOpen(false)}
                    onCrashOpen={openCrashModal} // 충돌 모달 열기 함수
                    onSuccessOpen={openSuccessModal} // 성공 모달 열기 함수
                    onErrorOpen={openErrorModal} // 오류 모달 열기
                    selectedCommitId={selectedCommitId}
                    selectedProjectId={selectedProjectId}
                />
                <ResetGuidePopupUI
                    isOpen={isResetModalOpen}
                    onClose={() => setIsResetModalOpen(false)}
                    onErrorOpen={openErrorModal} // 오류 모달 열기
                    selectedCommitId={selectedCommitId}
                    handleRefresh={handleRefresh}
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
                    error={errorMessage}
                />
            </div>

        </>
    )
}