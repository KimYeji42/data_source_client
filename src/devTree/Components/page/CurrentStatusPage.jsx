import styles from "../../styles/styles.module.css";
import HistorySideBar2UI from "../ui/HistorySideBar2UI";
import React, {useState, useEffect, useRef} from "react";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import CurrentStatusTableLayOut from "../layout/CurrentStatusTableLayOut";

export default function CurrentStatusPage() {
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [commitSuccessVisible, setCommitSuccessVisible] = useState(false); // 커밋 성공 메시지 표시 여부 상태

    const commitMessageRef = useRef(null);
    const [commit, setCommit] = useState(null)

    const handleSelectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleCommit = async () => {
        await commitData();
        if (commit != null) {
            // 커밋 성공 메시지 표시
            setCommitSuccessVisible(true);
            // 5초 후에 커밋 성공 메시지 숨기기
            setTimeout(() => {
                setCommitSuccessVisible(false);
            }, 5000);
        } else {
            alert("변경 사항이 없습니다.")
        }
    };

    const commitData = async () => {
        try {
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
            setCommit(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className={styles.CurrentPage}>
            <div className={styles.HistoryCanverLayOut}>
                <HistoryCanvasLayOut/>
            </div>

            <div className={styles.HistoryCanverBack}>
                <div className={styles.HistoryCanver}>
                    <CurrentStatusTableLayOut projectId={selectedProjectId}/>
                    <div className={styles.commitBox}>
                        <textarea placeholder={"커밋 메시지를 입력하세요."} className={styles.CommitMs} ref={commitMessageRef}></textarea>
                        {commitSuccessVisible && (
                            <span className={styles.commitSuccess}>커밋완료 ✓ </span>
                        )}
                        <button className={styles.CommitBtn} onClick={handleCommit}>커밋</button>
                    </div>
                </div>
            </div>

            <HistorySideBar2UI
                onSelect={handleSelectProject}
                defaultSelectedIndex={0}
            />

        </div>
    )
}