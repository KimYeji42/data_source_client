import styles from "../../styles/styles.module.css";
import HistorySideBar2UI from "../ui/HistorySideBar2UI";
import React, {useRef, useState} from "react";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import CurrentStatusTableLayOut from "../layout/CurrentStatusTableLayOut";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

export default function CurrentStatusPage() {
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const commitMessageRef = useRef(null);
    const [commit, setCommit] = useState(null);
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false)

    const [changeData, setChangeData] = useState([]);

    const handleSelectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleChangData = async (changeData) => { await setChangeData(changeData) }

    const commitData = async () => {
        try {
            if (!commitMessageRef.current.value) {
                commitMessageRef.current.focus()
                return
            } else if(changeData.length === 0) {
                setIsErrorModalOpen(true)
                return
            }

            const response = await fetch(`http://localhost:8080/api/commit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projectId: selectedProjectId,
                    comment: commitMessageRef.current.value,
                }),
            });
            const responseData = await response.json();
            // console.log(`결과값 ${responseData}`)
            setIsSuccessModalOpen(true)
            setCommit(responseData)
        } catch (error) {
            console.error('Error fetching data:', error.message);
            console.log(error.message)
            setIsErrorModalOpen(true)
        }
    };

    return (
        <div className={styles.CurrentPage}>
            <div className={styles.HistoryCanverLayOut}>
                <HistoryCanvasLayOut/>
            </div>

            <div className={styles.HistoryCanverBack}>
                <div className={styles.HistoryCanver}>
                    <CurrentStatusTableLayOut projectId={selectedProjectId} handleChangData={handleChangData}/>
                    <div className={styles.commitBox}>
                        <textarea placeholder={"커밋 메시지를 입력하세요."} className={styles.CommitMs} ref={commitMessageRef}></textarea>

                        <button className={styles.CommitBtn} onClick={commitData}>커밋</button>
                    </div>
                </div>
            </div>

            <HistorySideBar2UI
                onSelect={handleSelectProject}
                defaultSelectedIndex={0}
            />
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={()=>setIsErrorModalOpen(false)}
                error={"커밋할 변경 사항 내역이 없습니다."}
            />
            <SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={()=>setIsSuccessModalOpen(false)}
                data={"커밋에 성공하셨습니다."}
                clickLink={'/History'}
            />
        </div>
    )
}