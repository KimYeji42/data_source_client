import styles from "../../styles/styles.module.css";
import CommitChartUI from "../ui/CommitChartUI";
import HistoryButtonLayOut from "../layout/HistoryButtonLayOut";
import ChangeCommitLayOut from "../layout/ChangeCommitLayOut";
import React, {useState, useEffect} from "react";
import HistorySideBarUI from "../ui/HistorySideBarUI";
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
        <div className={styles.HistoryViewPage}>
            <div className={styles.HistoryPage}>
                <HistoryButtonLayOut
                    onSelect={handleSelectProject}
                    selectedCommitId={selectedCommitId}
                    token={token}
                />

                <HistorySideBarUI selected={1}/>

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
            </div>

            <ErrorModal
                error={error}
                onClose={() => setErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
        </div>
    )
}