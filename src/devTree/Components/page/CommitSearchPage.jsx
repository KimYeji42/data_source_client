import styles from "../../styles/styles.module.css";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import HistorySideBar2UI from "../ui/HistorySideBar2UI";
import React, {useState} from "react";
import CommitChartUI from "../ui/CommitChartUI";
import ChangeCommitLayOut from "../layout/ChangeCommitLayOut";
import CommitSearchUI from "../ui/CommitSearchUI";

export default function CommitSearchPage(){
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedCommitId, setSelectedCommitId] = useState(null);

    const handleSelectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleSelectCommit = (commitId) => {
        setSelectedCommitId(commitId);
    };

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
            <HistorySideBar2UI
                onSelect={handleSelectProject}
                defaultSelectedIndex={2}
            />
        </div>
    );
}