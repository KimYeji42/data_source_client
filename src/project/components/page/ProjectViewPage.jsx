import styles from "../styles.module.css";
import ProjectInformationLayOut from "../layout/ProjectInformationLayOut";
import ProjectCollaborativeLayOut from "../layout/ProjectCollaborativeLayOut";
import ProjectTablesLayOut from "../layout/ProjectTablesLayOut";
import TitleUI from "../uI/TitleUI";
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import stylesRest from "../../../devSource/styleModule/restAPIBuilder.module.css";

export default function ProjectViewPage(){
    const { projectId } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetchData();
        sessionStorage.setItem("selectedProjectId", projectId);
    }, []);

    const fetchData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/project/detail/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            setData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return(
        <div className={styles.ProjectViewCardPage}>
            <div className={styles.ProjectViewCardPageHeader}>
                {/*<Image src={"../image/webSite.png"} className={styles.WebSiteIcon}/>*/}
                <div className={styles.ProjectTitle}><TitleUI title={data.name}/></div>
                <Link to={`/projects`} className={stylesRest.backArrowIcon}>
                    돌아가기
                    {/*<img src="/image/backArrow.png" alt="돌아가기" />*/}
                </Link>
            </div>

            <div className={styles.ProjectViewCards}>
                <ProjectInformationLayOut project={data} />
                <ProjectCollaborativeLayOut project={data} />
                <ProjectTablesLayOut project={data} />
            </div>
        </div>
    )
}