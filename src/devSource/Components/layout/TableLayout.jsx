import React, {useEffect, useState} from "react";
import ColumnUI from "../ui/ColumnUI";
import styles from '../../styleModule/ColumnStyle.module.css';

export default function TableLayout({tableID}){
    const [tableData, setTable] = useState(new Map());
    const [createData , setCreateData] = useState([]) //추가 부분 리스트
    const [updateData , setUpDateData] = useState([]) //수정 부분 리스트
    const [blobData , setBlobData] = useState([])

    const fetchColumData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/column/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            const tableMap = new Map(Object.entries(responseData.tableInfo));
            //받은 데이터를 자바스크립트 Map객체로 변환
            setTable(tableMap)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchColumData(); // 컴포넌트가 처음 렌더링될 때 열 데이터를 가져오도록 호출
    }, [tableID]); // tableID가 변경될 때마다 호출되도록 설정

    return (
        <div className={styles.tableBox}>
            <ColumnUI   
                columns={tableData}
                reloadData={fetchColumData}
                updateData={updateData}
                setUpdateData={setUpDateData}
                createData = {createData}
                setCreateData = {setCreateData}
                blobData = {blobData}
                setBlobData = {setBlobData}
                tableID={tableID}
            />

        </div>
    );
}