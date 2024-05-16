import styles from "../../styles/styles.module.css";
import HistoryButtonLayOut from "../layout/HistoryButtonLayOut";
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
            <HistoryButtonLayOut
                onSelect={handleSelectProject}
                selectedCommitId={selectedCommitId}
                token={token}
            />

            <HistorySideBarUI selected={2}/>

            <div className={styles.HistoryCanverBack}>
                <div className={styles.HistoryCanver}>
                    {/*커밋 검색 컴포넌트*/}
                    <CommitSearchUI/>
                    <CommitChartUI
                        projectId={selectedProjectId}
                        onSelect={handleSelectCommit}
                        Search={true}
                    />
                    <ChangeCommitLayOut
                        commitId={selectedCommitId}
                    />
                </div>
            </div>
        </div>
    );
}