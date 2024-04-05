import TitleUI from "../../../project/components/uI/TitleUI";
import stylesRest from "../../styleModule/restAPIBuilder.module.css"
import LinkUI from "../../../project/components/uI/LinkUI";
import React, {useState} from "react";
import RestApiUrlLayout from "../layout/RestApiUrlLayout";
import RestApiProjectInfoLayout from "../layout/RestApiProjectInfoLayout";

export default function RestAPIBuilderPage(){
    const exampleData = {
        name : '데이터베이스'
    }
    const [isExpanded, setIsExpanded] = useState(false); // 토글 상태를 관리하는 state
    const handleToggle = () => {
        setIsExpanded(!isExpanded); // 토글 상태 변경
    };

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/api/database/${dataBaseID}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const responseData = await response.json();
    //         console.log(responseData);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };

    return(
        <div>
            <div className={stylesRest.centerContainer}>
                <div className={stylesRest.toggleContainer}>
                    <p onClick={handleToggle}>{isExpanded ? 'URL 숨기기' : 'URL 보기'}</p>
                </div>
                <TitleUI title={"[REST API Builder]"}/>
                <RestApiProjectInfoLayout exampleData={exampleData}/>
                <RestApiUrlLayout isExpanded={isExpanded}/>
            </div>
        </div>
    )
}
