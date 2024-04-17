import SmallSizeTitleUI from "../ui/SmallSizeTitleUI";
import styles from "../../styles/styles.module.css"
import SelectionUI from "../ui/SelectionUI";
import membersData from "../../../project/components/data/MembersData";
import ChangeTableLayout from "./ChangeTableLayout";
import {useEffect, useState} from "react";

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
            const response = await fetch(`http://localhost:8080/api/history/changeTable/${commitId}`, {
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
                <SmallSizeTitleUI smailTitle={"선택한 커밋의 변경사항"}/>
                <div style={{display : "flex" , justifyContent : "left"}}>
                    <div className={styles.selectBox}>
                        <SelectionUI title={"Back Data"} data={changeTables} onSelect={handleSelectTable}/>
                    </div>
                    <div className={styles.changeTableBox}>
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