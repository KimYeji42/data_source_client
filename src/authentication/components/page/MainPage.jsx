import MainBottomLayout from "../layout/MainBottomLayout";
import MainTopLayout from "../layout/MainTopLayout";
import styles from "../styleModule/mainStyles.module.css";

export default function MainPage(){
    return(
        <div className={styles.mainPage}>
            <div className={styles.mainPageBackground}>
                <MainTopLayout/>
                <MainBottomLayout/>
            </div>
        </div>
    )
}