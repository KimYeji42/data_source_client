import styles from "../styles.module.css";
import SideBarMenuUI from "./SideBarMenuUI";
import ProjectExampleData from "../data/ProjectExampleData"
export default function SideBarContentUI(){
    return(
        <div>
            <div className={styles.dataBaseMenu}>
                    <SideBarMenuUI header={"테이블 목록"} data={ProjectExampleData}/>
                    <SideBarMenuUI header={"즐겨찾기 목록"} data={ProjectExampleData}/>
                    <SideBarMenuUI header={"삭제 목록"} data={ProjectExampleData}/>
            </div>
        </div>
    )
}