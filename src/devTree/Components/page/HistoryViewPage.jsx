import styles from "../../styles/styles.module.css";
import CommitChartUI from "../ui/CommitChartUI";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import ChangeCommitLayOut from "../layout/ChangeCommitLayOut";
import React, {useState, useEffect} from "react";
import HistorySideBar2UI from "../ui/HistorySideBar2UI";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function HistoryViewPage(){
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedCommitId, setSelectedCommitId] = useState(null);

    const [error, setError] = useState(null);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [token, setToken] = useState(null);

    const handleSelectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleSelectCommit = (commitId) => {
        setSelectedCommitId(commitId);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token !== null) {
            setToken(token);
            return;
        }
        setError("로그인 후 진행해주세요!");
        setErrorModalOpen(true);
    }, []);

    return(
        <div className={styles.HistoryPage}>
            <div className={styles.HistoryCanverLayOut}>
                <HistoryCanvasLayOut
                    selectedCommitId={selectedCommitId}
                    selectedProjectId={selectedProjectId}
                    token={token}
                />
            </div>

            <div className={styles.HistoryCanverBack} >
                <div className={styles.HistoryCanver}>
                    <CommitChartUI
                        projectId={selectedProjectId}
                        onSelect={handleSelectCommit}
                    />
                    <ChangeCommitLayOut
                        commitId={selectedCommitId}
                    />
                </div>
            </div>

            <HistorySideBar2UI
                onSelect={handleSelectProject}
                defaultSelectedIndex={1}
                token={token}
            />

            <ErrorModal
                error={error}
                onClose={() => setErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
        </div>
    )

}