import MainBottomLayout from "../layout/MainBottomLayout";
import MainTopLayout from "../layout/MainTopLayout";
import styles from "../styleModule/mainStyles.module.css";
import {useEffect} from "react";

export default function MainPage({onIsMain}){

    useEffect(() => {
        onIsMain()
    }, []);

    return(
        <div className={styles.mainPage}>
            <div className={styles.mainPageBackground}>
                <MainTopLayout/>
                <MainBottomLayout/>
            </div>
        </div>
    )
}