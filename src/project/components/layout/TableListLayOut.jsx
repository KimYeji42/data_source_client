import styles from "../styles.module.css";
import LinkUI from "../uI/LinkUI";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";
import TitleUI from "../uI/TitleUI";


export default function TableListLayout({data}){

    return(
        <div className={styles.dataBaseMenuBox}>
            <div className={styles.tableTitleContainer}>
                <TitleUI title={data.projectName}/>
            </div>
            <div>
                <LinkUI text={"테이블 추가하기"} redirect={`/createTable/${data.id}`}/>
                <DataBaseBoxLayOut/>
            </div>

        </div>
    )
}