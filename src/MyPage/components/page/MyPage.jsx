import styles from "../../styleModule/style.module.css";
import Profilelayout from "../layout/Profilelayout";
import Contentslayout from "../layout/Contentslayout";

export default function MyPage(){
    return(
        <div className={styles.mypage}>
            <Profilelayout/>
            <Contentslayout/>
        </div>
    )
}