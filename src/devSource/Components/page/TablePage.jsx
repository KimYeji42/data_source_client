import TableLayout from "../layout/TableLayout";
import TableTitleUI from "../ui/TableTitleUI";
import styles from '../../styleModule/ColumnStyle.module.css';
import DownloadUI from "../ui/DownloadUI";
import React from "react";
import LinkUI from "../../../project/components/uI/LinkUI";
import {useParams} from "react-router-dom";

export default function TablePage() {
    const {tableID} = useParams()
    return(
        <div>
            <div className={styles.tablePage}>
                <div className={styles.tableContainer}>
                    <TableTitleUI title={"[ 프로젝트명 ]"} subTitle={"-[테이블명] Table"}/>
               </div>
                <div className={styles.linkContainer}>
                    <LinkUI text={"REST API 활용하기"} redirect={`/apiBuilder/${tableID}`}/>
                    <LinkUI text={"템플릿 보기"} redirect={`/template/${tableID}`}/>
                </div>
                <DownloadUI tableID={tableID}/>

                <TableLayout tableID={tableID}/>
            </div>
        </div>

    )
}
