import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.css";

export default function CommitChartUI({ projectId, onSelect }){
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1); // 초기 값으로 첫 번째 행 선택
    const [doubleClickRowIndex, setDoubleClickRowIndex] = useState(0); // 초기 값으로 첫 번째 행 선택

    const [commits, setCommits] = useState([]); // 초기값을 일반 객체로 설정
    const [selectedCommitId, setSelectedCommitId] = useState(null);

    const handleRowClick = (commitId, index) => { // 커밋 선택
        setSelectedRowIndex(index);
        setSelectedCommitId(commitId)
        console.log(commitId)
        onSelect(commitId)
    };

    const handleRowDoubleClick = (index) => { // 체크아웃
        setDoubleClickRowIndex(index);
    };

    const commitData = async () => {
        try {
            if (!projectId) return;
            const response = await fetch(`http://localhost:8080/api/history/commit/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setCommits(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setSelectedRowIndex(-1);
        setDoubleClickRowIndex(0);
        setCommits([]);
        onSelect(null);
        commitData();
    }, [projectId]);

    useEffect(() => {
        if (commits.length > 0) {
            const defaultCommitId = commits[0].commitId;
            setSelectedCommitId(defaultCommitId);
            onSelect(defaultCommitId);
        }
    }, [commits]);

    return(
        <>
            <div className={styles.CommitChartBack}>
                <table className={styles.CommitChart}>
                    <thead>
                    <tr className={styles.CommitChartTitle}>
                        <th scope="col" className={styles.CommitChartTitleNow}>체크<br/>아웃</th>
                        <th scope="col" className={styles.CommitChartTitleMsg}>커밋 메세지</th>
                        <th scope="col" className={styles.CommitChartTitleDate}>날짜</th>
                        <th scope="col" className={styles.CommitChartTitleWriter}>작성자</th>
                        <th scope="col" className={styles.CommitChartTitleNum}>해시값</th>
                    </tr>
                    </thead>
                    <tbody>
                    {commits && commits.length > 0 && commits.map((data, index) => (
                        <tr key={index}
                            className={
                                index === selectedRowIndex
                                    ? styles.CommitChartContentActive
                                    : styles.CommitChartContent
                            }
                            onClick={() => handleRowClick(data.commitID, index)}
                            onDoubleClick={() => handleRowDoubleClick(index)}
                        >
                            <td>{index === doubleClickRowIndex ? '●' : ''}</td>
                            <td>{data.comment}</td>
                            <td>{data.createTime}</td>
                            <td>{data.createUsername}</td>
                            <td>{data.commitHashCode}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}