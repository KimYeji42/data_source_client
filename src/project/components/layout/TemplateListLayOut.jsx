import styles from "../styles.module.css";
import CenterTitleUI from "../uI/CenterTitleUI";
import LinkUI from "../uI/LinkUI";
import ButtonUI from "../uI/ButtonUI";
import TemplateBoxLayOut from "./TemplateBoxLayOut";

export default function TemplateListLayOut(){
    const handleClick = () => {
        alert('버튼이 클릭되었습니다!');
    };

    return(
        <div className={styles.dataBaseMenuBox}>
            <CenterTitleUI text={"[ 프로젝트 이름 ]"}/>
            <LinkUI text={"템플릿 추가하기"}/>
            <TemplateBoxLayOut/>
            <div className={styles.dataBaseBoxButton}>
                <ButtonUI className={styles.blueButton} onClick={handleClick} children={"템플릿 관리"}/>
            </div>
        </div>
    )
}