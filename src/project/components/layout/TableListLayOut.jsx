import styles from "../styles.module.css";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";
import TitleUI from "../uI/TitleUI";
import React from "react";

export default function TableListLayout({data}){
    return(
        <div className={styles.dataBaseMenuBox}>
            <div className={styles.tableTitleContainer}>
                <TitleUI title={data.name}/>
            </div>
            <div>
                <DataBaseBoxLayOut />
            </div>

        </div>
    )
}