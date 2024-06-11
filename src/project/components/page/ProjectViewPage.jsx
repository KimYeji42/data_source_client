import styles from "../styles.module.css";
import ProjectInformationLayOut from "../layout/ProjectInformationLayOut";
import ProjectCollaborativeLayOut from "../layout/ProjectCollaborativeLayOut";
import ProjectTablesLayOut from "../layout/ProjectTablesLayOut";
import TitleUI from "../uI/TitleUI";
import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

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
        <>
            <HeaderBottom title={"프로젝트"} titleList={["프로젝트 목록"]} linkList={["/projects"]}/>
            <div className={styles.ProjectViewCardPage}>
                <div className={styles.ProjectViewCardPageHeader}>
                    {/*<Image src={"../image/webSite.png"} className={styles.WebSiteIcon}/>*/}
                    <div className={styles.ProjectTitle}><TitleUI title={data.name}/></div>
                </div>

                <div className={styles.ProjectViewCards}>
                    <ProjectTablesLayOut project={data} />
                    <ProjectInformationLayOut project={data} />
                    <ProjectCollaborativeLayOut project={data} />
                </div>
            </div>
        </>
    )
}