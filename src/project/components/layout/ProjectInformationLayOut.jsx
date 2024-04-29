import styles from "../styles.module.css";
import ProjectViewCardUI from "../uI/ProjectViewCardUI";
import {Image} from "react-bootstrap";
import {useEffect} from "react";

export default function ProjectInformationLayOut({project}) {

    return(
        <div>
            <div className={styles.InformationInput} style={{
                    position: `absolute`,
                    zIndex: 1
                }}
            >
                <label className={styles.InformationCardMaker}>만든 사람<input className={styles.InputMaker} type="text" readOnly value={project.createProfileName}/></label> <br/>
                <label className={styles.InformationCardEx}>설명<input className={styles.InputEx} type="text" readOnly value={project.comment}/></label><br/>
                <label className={styles.InformationCardDate}>생성 날짜<input className={styles.InputMaker} type="text" readOnly value={project.createTime ? String(project.createTime).slice(0, 10) : ''}/></label><br/>

            </div>

            <ProjectViewCardUI link={`/history`} cardTitle={"Project Information"} iconImage={<Image src="../image/Information.png"  className={styles.InformationIcon}/>} buttonTitle={"DevTree 접속하기"} style={{ position: 'relative' }}/>
        </div>
    )
}