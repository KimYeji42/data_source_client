import TableLayout from "../layout/TableLayout";
import TableTitleUI from "../ui/TableTitleUI";
import SideBarComponent from "../../../Layout/SideBar/SideBarComponent";
import styles from '../../styleModule/ColumnStyle.module.css';
import DownloadUI from "../ui/DownloadUI";
import React from "react";
import LinkUI from "../../../project/components/uI/LinkUI";
import {useParams} from "react-router-dom";
import ButtonUI from "../../../project/components/uI/ButtonUI";

export default function TablePage() {
    const {tableID} = useParams()
    return(
        <div>
            <div className={styles.tablePage}>
                <SideBarComponent/>
                <div style={{width: '60%', margin: "3% auto",}}>
                    <TableTitleUI title={"[ 프로젝트명 ]"} subTitle={"-[테이블명] Table"}/>
               </div>
                <div>
                    <LinkUI text={"REST API 활용하기"} redirect={"/apiBuilder"}/>
                    <LinkUI text={"템플릿 보기"} redirect={`/template/${tableID}`}/>
                </div>
                <TableLayout tableID={tableID}/>
                <DownloadUI/>
            </div>
        </div>

    )
}
