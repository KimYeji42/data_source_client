import SmallSizeTitleUI from "../ui/SmallSizeTitleUI";
import styles from "../../styles/styles.module.css"
import SelectionUI from "../ui/SelectionUI";
import membersData from "../../../project/components/data/MembersData";
import ChangeTableLayout from "./ChangeTableLayout";
import {useEffect, useState} from "react";
import CommitInformationProjectIdUI from "../ui/CommitInformationCommitIdUI";

export default function ChangeCommitLayOut({ commitId }){
    const [changeTables, setChangeTables] = useState([]); // 초기값을 일반 객체로 설정
    const [selectedTableId, setSelectedTableId] = useState(null);
    const [selectedCommitId, setSelectedCommitId] = useState(null);

    const handleSelectTable = (tableId) => {
        setSelectedTableId(tableId);
        setSelectedCommitId(commitId);
    };

    const ChangeTablesData = async () => {
        try {
            if (!commitId) return;
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/history/changeTable/${commitId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setChangeTables(responseData);
            // console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setChangeTables([])
        setSelectedTableId(null)
        setSelectedCommitId(null)
        ChangeTablesData();
    }, [commitId]);

    return(
        <div>
            <div className={styles.changeCommitBox}>
                <div style={{display : "flex" , justifyContent : "left"}}>
                    <div className={styles.selectBox}>
                        <CommitInformationProjectIdUI commitId={commitId}/>
                        <SelectionUI title={"변경된 테이블"} data={changeTables} onSelect={handleSelectTable}/>
                    </div>
                    <div className={styles.changeTableBox}>
                        {/*변경 사항 테이블 클릭 시*/}
                        <ChangeTableLayout
                            tableId={selectedTableId}
                            commitId={selectedCommitId}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}