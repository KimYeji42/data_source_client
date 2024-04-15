import styles from "../../styles/styles.module.css";
import CommitChartUI from "../ui/CommitChartUI";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import ChangeCommitLayOut from "../layout/ChangeCommitLayOut";
import React, {useState} from "react";
import HistorySideBar2UI from "../ui/HistorySideBar2UI";

export default function HistoryViewPage(){
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedCommitId, setSelectedCommitId] = useState(null);

    const handleSelectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleSelectCommit = (commitId) => {
        setSelectedCommitId(commitId);
    };

    return(
        <div className={styles.HistoryPage}>
            <div className={styles.HistoryCanverLayOut}>
                <HistoryCanvasLayOut />
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
            />
        </div>
    )

}