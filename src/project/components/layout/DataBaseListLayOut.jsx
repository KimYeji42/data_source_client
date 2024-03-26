import styles from "../styles.module.css";
import CenterTitleUI from "../uI/CenterTitleUI";
import LinkUI from "../uI/LinkUI";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";

export default function DataBaseListLayOut(){
    return(
        <div className={styles.dataBaseMenuBox}>
            <CenterTitleUI text={"[ 프로젝트 이름 ]"}/>
            <LinkUI text={"테이블 추가하기"}/>
            <DataBaseBoxLayOut/>
        </div>
    )
}