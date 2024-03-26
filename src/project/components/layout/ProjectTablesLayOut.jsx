import styles from "../styles.module.css";
import ProjectViewCardUI from "../uI/ProjectViewCardUI";
import {Image} from "react-bootstrap";
import TablesUI from "../uI/TablesUI";

export default function ProjectTablesLayOut({project}){
    return(
        <div>
            <div className={styles.Tables} style={{
                    position: `absolute`,
                    zIndex: 1
                }
                } >
                <TablesUI data={project.tables}/>
            </div>
            <ProjectViewCardUI link={'/tables'} cardTitle={"Tables"} iconImage={<Image src="../image/Tables.png"  className={styles.TablesIcon}/>} buttonTitle={"DevTool 접속하기"} style={{position: 'relative'}}/>
        </div>
    )
}