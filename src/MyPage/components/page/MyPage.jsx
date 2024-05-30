import styles from "../../styleModule/MypageStyle.module.css";
import Profilelayout from "../layout/Profilelayout";
import Contentslayout from "../layout/Contentslayout";

export default function MyPage(){
    return(
        <div >
            <div className={styles.pageContainer}>
                <Profilelayout/>
                <Contentslayout/>
            </div>
        </div>
    )
}