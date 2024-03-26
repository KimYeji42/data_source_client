import styles from "../styles.module.css";
import BoxUI from "../uI/BoxUI";
export default function TemplateBoxLayOut(){

    return(
        <div className={styles.dataBaseContentBox}>
            <BoxUI header={"MyPage"} date={"2023 - 10 - 26 일"} imageSrc ={"../image/template.png"} />
            <BoxUI header={"Post Page"} date={"2023 - 10 - 26 일"} imageSrc ={"../image/template.png"}/>
            <BoxUI header={"Writing Page"} date={"2023 - 10 - 26 일"} imageSrc ={"../image/template.png"}/>
            <BoxUI header={"Reading Page"} date={"2023 - 10 - 26 일"} imageSrc ={"../image/template.png"}/>
        </div>
    )
}