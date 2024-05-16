import styles from "../../styles/styles.module.css";
import HistorySideBarUI from "../ui/HistorySideBarUI";
import React, {useEffect, useRef, useState} from "react";
import HistoryButtonLayOut from "../layout/HistoryButtonLayOut";
import CurrentStatusTableLayOut from "../layout/CurrentStatusTableLayOut";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";
import SuccessModalLayout from "../../../project/components/layout/SuccessModalLayout";

export default function CurrentStatusPage() {
    const [token, setToken] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const commitMessageRef = useRef(null);
    const [isErrorModalOpen , setIsErrorModalOpen] = useState(false)
    const [isSuccessModalOpen , setIsSuccessModalOpen] = useState(false)

    const [changeData, setChangeData] = useState([]);

    const handleSelectProject = (projectId) => {
        setSelectedProjectId(projectId);
    };

    const handleChangData = (changeData) => {
        // console.log("커밋되지 않은 변경사항:", changeData); // 함수가 호출되는지 확인
        setChangeData(changeData)
    }

    const commitData = async (token) => {
        try {
            console.log(changeData)
            if (!commitMessageRef.current.value) {
                commitMessageRef.current.focus()
                return
            } else if(Object.keys(changeData).length === 0) {
                setIsErrorModalOpen(true)
                return
            } else if (token == null) return

            const apiUrl = process.env.REACT_APP_API_URL;
            await fetch(`${apiUrl}/api/commit/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token을 Header에 포함
                },
                body: JSON.stringify({
                    projectId: selectedProjectId,
                    comment: commitMessageRef.current.value,
                }),
            });
            setIsSuccessModalOpen(true)
        } catch (error) {
            console.error('Error fetching data:', error.message);
            console.log(error.message)
            setIsErrorModalOpen(true)
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token !== null) {
            setToken(token);
        }
    }, []);

    return (
        <div className={styles.HistoryViewPage}>
            <div className={styles.HistoryPage}>
                <HistoryButtonLayOut
                    onSelect={handleSelectProject}
                    token={token}
                />

                <HistorySideBarUI selected={0}/>

                <div className={styles.HistoryCanverBack}>
                    <div className={styles.HistoryCanver}>
                        {/*변경 사항, 정보*/}
                        <CurrentStatusTableLayOut projectId={selectedProjectId} handleChangData={handleChangData}/>
                        {/*커밋 메세지*/}
                        <div className={styles.commitBox}>
                            <textarea placeholder={"커밋 메시지를 입력해주세요."} className={styles.CommitMs} ref={commitMessageRef}></textarea>
                            <button className={styles.CommitBtn} onClick={() => commitData(token)}>커 밋</button>
                        </div>
                    </div>
                </div>
            </div>

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