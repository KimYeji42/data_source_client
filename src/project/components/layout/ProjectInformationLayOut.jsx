import styles from "../styles.module.css";
import ProjectViewCardUI from "../uI/ProjectViewCardUI";
import {Image} from "react-bootstrap";
import {useEffect} from "react";
import {Link} from "react-router-dom";

export default function ProjectInformationLayOut({project}) {

    return(
        <>
            <div className={styles.InformationInput}>
                <Link to={`/history`} className={styles.ViewCardTitle}>
                    <button className={styles.ViewCardBtn}>
                        히스토리 접속하기 &nbsp;
                        <img src="../image/arrow.png" className={styles.ViewCardBtnImg}/>
                    </button>
                </Link>
                <div className={styles.ViewCardIconBox}>
                    <div className={styles.ViewCardIcon}>
                        <Image src="../image/Information.png" className={styles.InformationIcon}/>
                    </div>
                </div>
                <div className={styles.ProjectViewCard}>
                    <div className={styles.projectInformationBox}>
                        <label className={styles.ProjectViewCardLabel}>
                            <span className={styles.ProjectViewCardSpan}>만든 사람</span>
                            <input type="text" readOnly value={project.createProfileName} className={styles.ProjectViewCardInput}/>
                        </label> <br/>
                        <label className={styles.ProjectViewCardLabel}>
                            <span className={styles.ProjectViewCardSpan}>설 명</span>
                            <input type="text" readOnly value={project.comment} className={styles.ProjectViewCardInput}/>
                        </label><br/>
                        <label className={styles.ProjectViewCardLabel}>
                            <span className={styles.ProjectViewCardSpan}>생성 날짜</span>
                            <input type="text" readOnly value={project.createTime ? String(project.createTime).slice(0, 10) : ''} className={styles.ProjectViewCardInput}/>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}