import styles from "../../styleModule/style.module.css";
import ContentsMeunBar from "../ui/ContentsMeunBar";

export default function Contentslayout(){
    return(
        <div className={styles.contentslayout}>
            <ContentsMeunBar/>
        </div>
    )
}