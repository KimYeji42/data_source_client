import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function ProjectTablesLayOut({project}){

    if (project == null) return null

    return(
        <>
            <div className={styles.InformationInput}>
                {/*상단*/}
                <Link to={`/tables/${project.dataBaseID}`} className={styles.ViewCardTitle}>
                    <button className={styles.ViewCardBtn}>
                        데이터베이스 접속하기 &nbsp;
                        <img src="../image/arrow.png" className={styles.ViewCardBtnImg}/>
                    </button>
                </Link>
                {/*아이콘*/}
                <div className={styles.ViewCardIconBox}>
                    <div className={styles.ViewCardIcon}>
                        <Image src="../image/Tables.png" className={styles.InformationIcon}/>
                    </div>
                </div>
                {/*내용*/}
                <div className={styles.ProjectViewCard} >
                    <ul className={`${styles.collaborateUl} ${styles.scrollbar}`} >
                        {project.tables && project.tables.map((member) => (
                            <li key={member.id} style={{ listStyleType: "none" }}>
                                <div className={styles.Table}>
                                    <Image src="../image/Database.png" className={styles.TableIcon} />
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