import Guide from "./Guide";
import GuideOnOffButton from "./GuideOnOffButton";
import {useState} from "react";
import styles from '../styles/ndsGuide.module.css';

export default function GuideLayout(){
    const [isGuideOpen, setIsGuideOpen] = useState(false)

    return(
        <div className={styles.GuideLayout}>
            <div className={isGuideOpen ? '' : styles.hidden}>
                 <Guide closeButtonClick={() => (setIsGuideOpen(false))}/>
            </div>
            <GuideOnOffButton
                onClick={() => setIsGuideOpen(true)}
            />
        </div>
    )
}