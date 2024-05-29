import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import ViewCardIcon from "../uI/ViewCardIcon";
import ViewCardTitle from "../uI/ViewCardTitle";

export default function ProjectTablesLayOut({project}){

    if (project == null) return null

    return(
        <>
            <div className={styles.InformationInput}>
                {/*상단*/}
                <ViewCardTitle link={`/tables/${project.dataBaseID}`} title={"데이터베이스 접속하기"}/>
                {/*아이콘*/}
                <ViewCardIcon src={"../image/tables_icon.png"} />
                {/*내용*/}
                <div className={styles.ProjectViewCard} >
                    <ul className={`${styles.collaborateUl} ${styles.scrollbar}`} >
                        {project.tables && project.tables.map((member) => (
                            <li key={member.id} style={{ listStyleType: "none" }}>
                                <div className={styles.Table}>
                                    <Image src="../image/db_black_logo.png" className={styles.TableIcon} />
                                    <small className={styles.CollaborativeUserName}>{member.name}</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p className={styles.TablesTotal}> 총 테이블 수 : {project.tables && project.tables.length}</p>
                </div>
            </div>
        </>
    )
}