import styles from "../../styles/styles.module.css";
import HistoryButtonUI from "../ui/HistoryButtonUI";
import HistorySideBarUI from "../ui/HistorySideBarUI";
import React from "react";

export default function HistoryCanvasLayOut(){
    return(
        <>
            <div className={styles.buttonContainerF}>
                <HistoryButtonUI title={"Commit"}/>
                <HistoryButtonUI title={"Merge reqeust"} />
            </div>
            <div className={styles.buttonContainerT}>
                <HistoryButtonUI title={"Reset"}/>
                <HistoryButtonUI title={"Merge"}/>
            </div>
            <HistorySideBarUI/>
        </>
    )
}