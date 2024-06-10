import React, { useState } from "react";
import styles from "../../styleModule/templateStyles.module.css";

function Toggle({ setTemplateStatus }) {
    const [toggle, setToggle] = useState(false);
    const clickedToggle = () => {
        setToggle((prev) => !prev);
        setTemplateStatus(prev => !prev)
    };

    return (
        <div>
            <h6 className={styles.toggleStatus}> {!toggle ? "Component" : "WEB"}</h6>
            <button
                className={`${styles.toggleBtn} ${toggle ? styles.toggleBtnOn : styles.toggleBtnOff}`}
                onClick={clickedToggle}
            >
                <div className={`${styles.circle} ${toggle ? styles.circleOn : ""}`} />
            </button>
        </div>
    );
}

export default Toggle;
