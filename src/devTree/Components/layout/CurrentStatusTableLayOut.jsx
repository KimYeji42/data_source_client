import SmallSizeTitleUI from "../ui/SmallSizeTitleUI";
import styles from "../../styles/styles.module.css"
import {useEffect, useState} from "react";
import CommitInformationProjectIdUI from "../ui/CommitInformationProjectIdUI"
import SelectionChangeTableUI from "../ui/SelectionChangeTableUI";
import ChangeDataUI from "../ui/ChageDataUI";

export default function CurrentStatusTableLayOut({ projectId, handleChangData }){
    const [changeData, setChangeData] = useState([]); // 초기값을 일반 객체로 설정
    const [selectedTableId, setSelectedTableId] = useState(null);

    const handleSelectTable = (tableId) => {
        setSelectedTableId(tableId);
    };

    const changes = async () => {
        try {
            if (!projectId) return
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/commit/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            await setChangeData(responseData);
            // console.log(responseData)
            await handleChangData(responseData)
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
        <div className={styles.CurrentStatusTableLayOut}>
            <div className={styles.currentSelectBox}>
                <SelectionChangeTableUI
                    title={"커밋되지 않은 변경사항"}
                    data={changeData}
                    onSelect={handleSelectTable}
                    Status={true}
                />
            </div>
            <div className={styles.changeCommitBoxUnder}>
                <CommitInformationProjectIdUI
                    projectId={projectId}
                    Status={true}
                />
            </div>
            <div className={styles.changeTableBoxBig}>
                <ChangeDataUI data={changeData} index={selectedTableId}/>
            </div>
        </div>
    )
}