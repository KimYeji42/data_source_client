import TableBoxLayout from "../layout/TableBoxLayout";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

export default function CreateTablePage(){
    const { dataBaseID } = useParams();
    const [dataBaseData , setDataBaseData] = useState(null)
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

    return(
        <div>
            <HeaderBottom title={"테이블 생성"} titleList={["프로젝트 목록", "프로젝트", "데이터베이스"]} linkList={["/projects", `/project/${dataBaseID}`, `/tables/${dataBaseID}`]}/>
            {dataBaseData &&  <TableBoxLayout data={dataBaseData}/>} {/* 데이터가 존재할 때만 렌더링 */}
        </div>
    )
}