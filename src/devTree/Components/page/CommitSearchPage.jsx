import styles from "../../styles/styles.module.css";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import HistorySideBarUI from "../ui/HistorySideBarUI";
import React, {useState, useEffect} from "react";
import CommitChartUI from "../ui/CommitChartUI";
import ChangeCommitLayOut from "../layout/ChangeCommitLayOut";
import CommitSearchUI from "../ui/CommitSearchUI";

export default function CommitSearchPage(){
    const [token, setToken] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedCommitId, setSelectedCommitId] = useState(null);

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
        }
    }, []);

    return (
        <div className={styles.HistoryPage}>
            <div className={styles.HistoryCanverLayOut}>
                <HistoryCanvasLayOut/>
            </div>

            <div className={styles.HistoryCanverBack}>
                <div className={styles.HistoryCanver}>
                    <CommitSearchUI/>
                    <CommitChartUI
                        projectId={selectedProjectId}
                        onSelect={handleSelectCommit}
                    />
                    <ChangeCommitLayOut
                        commitId={selectedCommitId}
                    />
                </div>
            </div>
            <HistorySideBarUI
                onSelect={handleSelectProject}
                defaultSelectedIndex={2}
                token={token}
            />
        </div>
    );
}