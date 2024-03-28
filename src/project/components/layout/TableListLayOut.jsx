import styles from "../styles.module.css";
import CenterTitleUI from "../uI/CenterTitleUI";
import LinkUI from "../uI/LinkUI";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";


export default function TableListLayout({data}){

    return(
        <div className={styles.dataBaseMenuBox}>
            <CenterTitleUI text={data.projectName}/>
            <LinkUI text={"테이블 추가하기"} redirect={`/createTable/${data.id}`}/>
            <DataBaseBoxLayOut/>
        </div>
    )
}