import styles from "../styles.module.css";
import LinkUI from "../uI/LinkUI";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";
import TitleUI from "../uI/TitleUI";
import {Link, useParams} from "react-router-dom";
import stylesRest from "../../../devSource/styleModule/restAPIBuilder.module.css";
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