import SmallSizeTitleUI from "../ui/SmallSizeTitleUI";
import styles from "../../styles/styles.module.css"
import ChangeTableLayout from "./ChangeTableLayout";
import {useEffect, useState} from "react";
import CommitInformationUI from "../ui/CommitInformationUI"
import SelectionChangeTableUI from "../ui/SelectionChangeTableUI";
import ChangeDataUI from "../ui/ChageDataUI";

export default function CurrentStatusTableLayOut({ projectId }){
    const [changeData, setChangeData] = useState([]); // 초기값을 일반 객체로 설정
    const [selectedTableId, setSelectedTableId] = useState(null);

    const handleSelectTable = (tableId) => {
        setSelectedTableId(tableId);
    };

    const changes = async () => {
        try {
            if (!projectId) return
            const response = await fetch(`http://localhost:8080/api/commit/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setChangeData(responseData);
            console.log(responseData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        changes()
    }, [projectId]);

    useEffect(() => {
        // 페이지 로드 시 초기화
        setChangeData([]);
        setSelectedTableId(null);
    }, []);

    return(
        <div>
            <div className={styles.changeCommitBox}>
                <SmallSizeTitleUI smailTitle={"커밋되지 않은 변경사항"}/>
                <div style={{display: "flex", justifyContent: "left"}}>
                    <div className={styles.selectBox}>
                        <SelectionChangeTableUI title={"Back Data"} data={changeData} onSelect={handleSelectTable}/>
                    </div>
                </div>
                <div className={styles.changeCommitBoxUnder}>
                    <SmallSizeTitleUI smailTitle={"현재 커밋 정보"}/>
                    <div style={{display: "flex", justifyContent: "left"}}>
                        <div className={styles.selectBox}>
                            <CommitInformationUI projectId={projectId}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.changeTableBoxBig}>
                <ChangeDataUI data={changeData} index={selectedTableId}/>
            </div>

        </div>
    )
}