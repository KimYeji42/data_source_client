import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function ProjectCollaborativeLayOut ({project}){

    return(
        <>
            <div className={styles.InformationInput}>
                {/*상단*/}
                <Link to={`/project/teamProfile/${project.dataBaseID}`} className={styles.ViewCardTitle}>
                    <button className={styles.ViewCardBtn}>
                        협업 관리하기 &nbsp;
                        <img src="../image/arrow.png" className={styles.ViewCardBtnImg}/>
                    </button>
                </Link>
                {/*아이콘*/}
                <div className={styles.ViewCardIconBox}>
                    <div className={styles.ViewCardIcon}>
                        <Image src="../image/Collaborative.png" className={styles.InformationIcon}/>
                    </div>
                </div>
                {/*내용*/}
                <div className={styles.ProjectViewCard} >
                    <ul className={`${styles.collaborateUl} ${styles.scrollbar}`}>
                        {project.teamProfile && project.teamProfile.map(member => (
                            <li key={member.id} style={{listStyleType: "none"}}>
                                <div className={styles.CollaborativeUser}>
                                    <Image src={"../image/user.png"} className={styles.CollaborativeUserProfile}/>
                                    <small className={styles.CollaborativeUserName}>{member.username}</small>
                                </div>
                            </li>
                            ))}
                    </ul>
                    <p className={styles.CollaborativeUserTotal}>총 협업자 수 : {project.teamProfile && project.teamProfile.length}</p>
                </div>
            </div>
        </>
    )
}