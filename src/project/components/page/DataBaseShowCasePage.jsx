import DataBaseListLayOut from "../layout/TableListLayOut";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

export default function DataBaseShowCasePage() {
    const { dataBaseID } = useParams();
    const [dataBaseData, setDataBaseData] = useState(null); // 초기값을 null로 설정하여 데이터가 없는 상태를 표시합니다
    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/database/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            setDataBaseData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <HeaderBottom title={"데이터베이스"} titleList={["프로젝트 목록", "프로젝트"]} linkList={["/projects", `/project/${dataBaseID}`]}/>
            <div className={styles.DataBaseShowCasePage}>
                {/*<SidebarLayout/>*/}
                {dataBaseData && <DataBaseListLayOut data={dataBaseData}/>} {/* 데이터가 존재할 때만 렌더링 */}
            </div>
        </>

    );
}
