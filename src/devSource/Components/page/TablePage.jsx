import TableLayout from "../layout/TableLayout";
import TableTitleUI from "../ui/TableTitleUI";
import styles from '../../styleModule/ColumnStyle.module.css';
import DownloadUI from "../ui/DownloadUI";
import React, {useEffect, useState} from "react";
import LinkUI from "../../../project/components/uI/LinkUI";
import {useParams} from "react-router-dom";

export default function TablePage() {
    const {tableID} = useParams()
    const [tableInfo , setTableInfo] = useState(null)
    const findTableInfo = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/database/dataBaseInfo/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            setTableInfo(responseData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        findTableInfo()
    }, []);
    return(
        <div>
            <div className={styles.tablePage}>
                <div className={styles.tableContainer}>
                    {tableInfo && <TableTitleUI title={"[ " + tableInfo.projectName + " ]"} subTitle={"-" +tableInfo.tableName}/>}
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
