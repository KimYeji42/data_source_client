import styles from "../styles.module.css";
import LinkUI from "../uI/LinkUI";
import DataBaseBoxLayOut from "./DataBaseBoxLayOut";
import TitleUI from "../uI/TitleUI";
import {Link, useParams} from "react-router-dom";
import stylesRest from "../../../devSource/styleModule/restAPIBuilder.module.css";
import React from "react";

export default function TableListLayout({data}){
    const { dataBaseID } = useParams();

    return(
        <div className={styles.dataBaseMenuBox}>
            <div className={styles.tableTitleContainer}>
                <TitleUI title={data.projectName}/>
            </div>
            <div>

                <div className={styles.tableLinkUI}>
                    <Link to={`/createTable/${data.id}`} className={styles.link} >
                        <button className={styles.tableLinkBut}>테이블 추가하기</button>
                    </Link>
                </div>
                <DataBaseBoxLayOut/>
            </div>

        </div>
    )
}