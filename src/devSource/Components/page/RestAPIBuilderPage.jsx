import TitleUI from "../../../project/components/uI/TitleUI";
import stylesRest from "../../styleModule/restAPIBuilder.module.css"
import React, { useState, useEffect } from "react";
import RestApiUrlLayout from "../layout/RestApiUrlLayout";
import RestApiProjectInfoLayout from "../layout/RestApiProjectInfoLayout";
import {Link, useParams} from "react-router-dom";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

export default function RestAPIBuilderPage(){
    const {dataBaseID, tableID} = useParams()
    const [tableApiData , setTableApiData] = useState(null)
    
    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/builder/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            setTableApiData(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <HeaderBottom title={"REST API"} titleList={["프로젝트 목록", "프로젝트", "데이터베이스", "테이블"]} linkList={["/projects", `/project/${dataBaseID}`, `/tables/${dataBaseID}`, `/table/${dataBaseID}/${tableID}`]}/>
            <div className={stylesRest.centerContainer}>
                {/*<Link to={`/table/${dataBaseID}/${tableID}`} className={stylesRest.toggleContainer}>*/}
                {/*    돌아가기*/}
                {/*</Link>*/}
                <TitleUI title={"[REST API Builder]"} />
                {tableApiData && (
                    <>
                        <RestApiProjectInfoLayout data={tableApiData} />
                        <RestApiUrlLayout
                            localPort={tableApiData.localPort}
                            endpoint={tableApiData.endpoint}
                        />
                    </>
                )}
            </div>
        </div>
    );

}
