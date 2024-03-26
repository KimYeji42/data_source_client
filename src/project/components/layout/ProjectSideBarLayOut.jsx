import styles from "../styles.module.css";
import {Image} from "react-bootstrap";

export default function ProjectSideBarLayOut(){
    return(
        <div className={styles.projectSideBar}>
            <h4><Image src="image/SearchDatabase.png" width={'35px'}/>프로젝트 목록</h4>
            <h4><Image src="image/star.png"/>즐겨찾기 목록</h4>
            <h4><Image src="image/trash.png"/>삭제 목록</h4>
        </div>
    )
}
