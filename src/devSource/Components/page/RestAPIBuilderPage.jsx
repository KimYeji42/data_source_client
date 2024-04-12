import TitleUI from "../../../project/components/uI/TitleUI";
import stylesRest from "../../styleModule/restAPIBuilder.module.css"
import React, { useState } from "react";
import RestApiUrlLayout from "../layout/RestApiUrlLayout";
import RestApiProjectInfoLayout from "../layout/RestApiProjectInfoLayout";
import {useParams} from "react-router-dom";

export default function RestAPIBuilderPage(){
    const { tableID } = useParams();
    const [tableApiData , setTableApiData] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false); // 토글 상태를 관리하는 state
    const handleToggle = () => {
        fetchData()
        setIsExpanded(!isExpanded); // 토글 상태 변경
    };

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


    return (
        <div>
            <div className={stylesRest.centerContainer}>
                <div className={stylesRest.toggleContainer}>
                    <p onClick={handleToggle}>{isExpanded ? 'URL 숨기기' : 'URL 보기'}</p>
                </div>
                <TitleUI title={"[REST API Builder]"} />
                {tableApiData && (
                    <>
                        <RestApiProjectInfoLayout data={tableApiData} />
                        <RestApiUrlLayout
                            isExpanded={isExpanded}
                            localPort={tableApiData.localPort}
                            endpoint={tableApiData.endpoint}
                        />
                    </>
                )}
            </div>
        </div>
    );

}
