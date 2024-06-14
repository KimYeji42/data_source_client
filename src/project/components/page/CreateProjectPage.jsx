import TitleUI from "../uI/TitleUI";
import CreateProjectFormLayout from "../layout/CreateProjectFormLayout";
import styles from "../styles.module.css";

export default function CreateProjectPage(){
    return(
        <div className={styles.CreateProjectPage}>
            <div className={styles.middleBox}>
                <TitleUI title={"새로운 프로젝트 생성"}/>
                <CreateProjectFormLayout/>
            </div>
        </div>

    )
}