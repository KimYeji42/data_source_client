import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import ViewCardIcon from "../uI/ViewCardIcon";
import ViewCardTitle from "../uI/ViewCardTitle";

export default function ProjectCollaborativeLayOut ({project}){

    return(
        <>
            <div className={styles.InformationInput}>
                {/*상단*/}
                <ViewCardTitle link={`/project/teamProfile/${project.dataBaseID}`} title={"협업 관리하기"}/>
                {/*아이콘*/}
                <ViewCardIcon src={"../image/Team_Icon.png"} />
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