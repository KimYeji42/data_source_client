import React, {useEffect, useState} from "react";
import styles from "../../styles/styles.module.css";
import MergeGuidePopupUI from "./GuidePopupUI";

export default function CommitChartUI({ projectId, onSelect, Search }){
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1); // 초기 값으로 첫 번째 행 선택
    const [doubleClickRowIndex, setDoubleClickRowIndex] = useState(0); // 초기 값으로 첫 번째 행 선택
    const [commits, setCommits] = useState([]); // 초기값을 일반 객체로 설정
    const [isCheckoutModalOpen , setIsCheckoutModalOpen] = useState(false);
    const [nowCheckoutCommitId , setNowCheckoutCommitId] = useState(null);
    const [checkoutCommitId , setCheckoutCommitId] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRefresh = () => { window.location.reload(); };

    const handleRowClick = (commitId, index) => { // 커밋 선택
        setSelectedRowIndex(index);
        onSelect(commitId)
    };

    const handleCheckout = () => {
        setIsCheckoutModalOpen(false)
        checkout(checkoutCommitId)
    }

    const handleRowDoubleClick = (index) => { // 체크아웃
        setCheckoutCommitId(commits[index].commitID)
        if (commits[index].commitID !== nowCheckoutCommitId) {
            setIsCheckoutModalOpen(true)
        }
    };

    const handleCheckoutPositioning = (commits) => {
        commits.forEach((commit, index) => {
            if (commit.checkout === 1) {
                setDoubleClickRowIndex(index)
                setNowCheckoutCommitId(commit.commitID)
            }
        });
    }

    const commitData = async () => {
        try {
            if (!projectId) return;
            const response = await fetch(`${apiUrl}/api/history/commit/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setCommits(responseData);
            handleCheckoutPositioning(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const checkout = async (commitId) => {
        try {
            if (!commitId) return;
            const response = await fetch(`${apiUrl}/api/checkout/${commitId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseText = await response.text();

            console.log(responseText)
            handleRefresh();

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
            onSelect(defaultCommitId);
        }
    }, [commits]);

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} 오후 ${dateObject.getHours()}:${dateObject.getMinutes().toString().padStart(2, '0')}`;
    };

    return(
        <>
            <div className={`${Search ? styles.CommitChartUISearch : styles.CommitChartUI}`}>
                <div className={`${styles.CommitChartBack} ${styles.scrollbar}`}>
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
                                <td className={styles.CommitChartTitleNow}>{index === doubleClickRowIndex ? '●' : ''}</td>
                                <td className={styles.CommitChartTitleMsg}>{data.comment.length > 30 ? data.comment.slice(0, 30) + "..." : data.comment}</td>
                                <td className={styles.CommitChartTitleDate}>{formatDate(data.createTime)}</td>
                                <td className={styles.CommitChartTitleWriter}>{data.createUsername}</td>
                                <td className={styles.CommitChartTitleNum}>{data.commitHashCode}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <MergeGuidePopupUI
                isOpen={isCheckoutModalOpen}
                onClose={() => setIsCheckoutModalOpen(false)}
                onRequest={handleCheckout}
                message1={"선택한 분기로 체크아웃 하시겠습니까?"}
                message2={"작업 공간도 바뀌게 됩니다."}
                button={"checkout"}
            />
        </>
    )
}