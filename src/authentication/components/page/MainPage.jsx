import MainBottomLayout from "../layout/MainBottomLayout";
import MainTopLayout from "../layout/MainTopLayout";
import styles from "../styleModule/mainStyles.module.css";
import Header from "../../../Layout/Header/Header";

export default function MainPage(){
    return(
        <div className={styles.mainPage}>
            <div>
                <Header/>
                <MainTopLayout/>
                <MainBottomLayout/>
            </div>
        </div>
    )
}