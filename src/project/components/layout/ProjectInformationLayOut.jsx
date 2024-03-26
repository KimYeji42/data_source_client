import styles from "../styles.module.css";
import ProjectViewCardUI from "../uI/ProjectViewCardUI";
import {Image} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function ProjectInformationLayOut({project}) {
    const { projectId } = useParams();
    const [branch, setBranch] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/branch/${projectId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setBranch(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return(
        <div>
            <div className={styles.InformationInput} style={{
                    position: `absolute`,
                    zIndex: 1
                }}
            >
                <label className={styles.InformationCardMaker}>만든 사람<input className={styles.InputMaker} type="text" readOnly value={project?.profile?.username}/></label> <br/>
                <label className={styles.InformationCardEx}>설명<input className={styles.InputEx} type="text" readOnly value={project.comment}/></label><br/>
                <label className={styles.InformationCardDate}>생성 날짜<input className={styles.InputMaker} type="text" readOnly value={project.createTime ? String(project.createTime).slice(0, 10) : ''}/></label><br/>

                <div className={styles.InformationAction}>
                    <div className={styles.ActionNewPull}><span className={styles.ActionTxt}>New pull<br/>↓ {branch.pull}</span></div>
                    <div className={styles.ActionNewPush}><span className={styles.ActionTxt}>New push<br/>↑ {branch.push}</span></div>
                    <div className={styles.ActionCrash}><span className={styles.ActionTxt}>crash<br/><Image src="../image/crash.png" className={styles.CrashIcon}/>{branch.crash}</span></div>
                </div>
            </div>

            <ProjectViewCardUI cardTitle={"Project Information"} iconImage={<Image src="../image/Information.png"  className={styles.InformationIcon}/>} buttonTitle={"DevTree 접속하기"} style={{ position: 'relative' }}/>
        </div>
    )
}