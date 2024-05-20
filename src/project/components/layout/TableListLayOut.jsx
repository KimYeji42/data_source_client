import styles from "../styles.module.css";
import LinkUI from "../uI/LinkUI";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";
import TitleUI from "../uI/TitleUI";
import {Link} from "react-router-dom";

export default function TableListLayout({data}){
    return(
        <div className={styles.dataBaseMenuBox}>
            <div className={styles.tableTitleContainer}>
                <TitleUI title={data.projectName}/>
            </div>
            <div>
                <div className={styles.tableLinkUI}>
                    <Link to={`/createTable/${data.id}`} className={styles.link} >
                        <button className={styles.tableLinkBut}>테이블 추가하기</button>
                    </Link>
                </div>
                <DataBaseBoxLayOut/>
            </div>

        </div>
    )
}