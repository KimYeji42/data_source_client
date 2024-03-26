import styles from "../styles.module.css";
import ProjectInformationLayOut from "../layout/ProjectInformationLayOut";
import ProjectCollaborativeLayOut from "../layout/ProjectCollaborativeLayOut";
import ProjectTablesLayOut from "../layout/ProjectTablesLayOut";
import TitleUI from "../uI/TitleUI";
import {Image} from "react-bootstrap";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

export default function ProjectViewPage(){
    const { projectId } = useParams();
    const [data, setData] = useState({});
    const [tables , setTables] = useState([])
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/project/detail/${projectId}`, {
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
                <Image src={"../image/webSite.png"} className={styles.WebSiteIcon}/>
                <div className={styles.ProjectTitle}><TitleUI title={data.name}/></div>
            </div>

            <div className={styles.ProjectViewCards}>
                <ProjectInformationLayOut project={data} />
                <ProjectCollaborativeLayOut project={data}/>
                <ProjectTablesLayOut project={data}/>
            </div>

            <div className={styles.PageFooterBtn}>
                <Image src="../image/star.png" className={styles.BottomStar}/>
                <Image src="../image/trash.png" className={styles.BottomTrash}/>
            </div>
        </div>
    )
}