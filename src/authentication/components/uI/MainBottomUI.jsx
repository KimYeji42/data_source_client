import styles from "../styleModule/mainStyles.module.css";
import {Link} from "react-router-dom";

export default function MainBottomUI({stepNum, bigText, smallText, buttonText, circleColor, link}){
    return(
        <div className={styles.mainBox}>
            <div className={styles.mainCircle} style={{background : circleColor}}>
                <h2 className={styles.mainStepText}>Step {stepNum}</h2>
                <h3 className={styles.mainBigText}>{bigText}</h3>
            </div>
            <h1 className={styles.mainSmallText}>
                <span className={styles.mainBlueText}>Step {stepNum}. </span>{smallText}
            </h1>
            <Link to={link}>
                <button className={styles.mainBottomButton}>{buttonText}</button>
            </Link>
        </div>
    )
}