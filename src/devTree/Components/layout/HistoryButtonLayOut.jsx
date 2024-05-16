import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import React, {useState, useEffect} from "react";
import MergeGuidePopupUI from "../ui/MergeGuidePopupUI";
import MergeCrashModalLayout from "./MergeCrashModalLayout";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import ResetGuidePopupUI from "../ui/ResetGuidePopupUI";

export default function HistoryButtonLayOut({ selectedCommitId, token, onSelect }){
    const [takeToken, setTakeToken] = useState(null);
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
            else if (takeToken == null) return

            const apiUrl = process.env.REACT_APP_API_URL;
            setIsMergeComplete(true)
            const response = await fetch(`${apiUrl}/api/merge/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${takeToken}` // Token을 Header에 포함
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
                // console.log(responseData.number);
                setIsMergeComplete(false)
                openSuccessModal()
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        setTakeToken(token)
    }, [token]);

    // 프로젝트 선택
    const [project, setProject] = useState([]); // 초기값을 일반 객체로 설정
    const [selectedProjectId, setSelectedProjectId] = useState(() => {
        return sessionStorage.getItem("selectedProjectId") || null;
    });

    const handleProjectChange = (e) => {
        const projectId = parseInt(e.target.value);
        setSelectedProjectId(projectId);
        sessionStorage.setItem("selectedProjectId", projectId);
        onSelect(projectId);
    };

    const projectData = async () => {
        try {
            if (token == null) return;

            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/history`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token을 Header에 포함
                }
            });
            const responseData = await response.json();
            setProject(responseData);
            // console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (project.length > 0 && sessionStorage.getItem("selectedProjectId") == null) {
            const defaultProjectId = project[0].id; // 첫 번째 프로젝트의 ID를 선택
            setSelectedProjectId(defaultProjectId); // 선택된 프로젝트 ID 설정
            sessionStorage.setItem("selectedProjectId", defaultProjectId);
            onSelect(defaultProjectId); // 선택된 프로젝트ID를 onSelect 콜백으로 전달
            return;
        }
        onSelect(selectedProjectId);
    }, [project]);

    useEffect(() => {
        projectData();
    }, [token]);

    return(
        <>
            <div className={styles.HistoryButtonLayOutBox}>
                <select className={styles.ProjectSelectBox} value={selectedProjectId} onChange={handleProjectChange}>
                    {project.map(project => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
                <div className={styles.buttonContainer}>
                    <HistoryButtonUI title={"커밋"} imgLink={"image/commit.png"} clickLink={'/status'}/>
                    <HistoryButtonUI title={"리셋"} imgLink={"image/reset.png"} clickLink={'/history'} onClick={() => setIsResetModalOpen(true)}/>
                    <HistoryButtonUI title={"병합"} imgLink={"image/merge.png"} clickLink={'/history'} onClick={() => setIsSendModalOpen(true)}/>
                </div>
            </div>
            <MergeGuidePopupUI
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onCrashOpen={openCrashModal} // 충돌 모달 열기 함수
                onSuccessOpen={openSuccessModal} // 성공 모달 열기 함수
                onErrorOpen={openErrorModal} // 오류 모달 열기
                selectedCommitId={selectedCommitId}
                selectedProjectId={selectedProjectId}
                token={takeToken}
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
        </>
    )
}