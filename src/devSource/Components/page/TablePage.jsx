import TableLayout from "../layout/TableLayout";
import TableTitleUI from "../ui/TableTitleUI";
import styles from '../../styleModule/ColumnStyle.module.css';
import DownloadUI from "../ui/DownloadUI";
import React, { useEffect, useState } from "react";
import LinkUI from "../../../project/components/uI/LinkUI";
import {Link, useParams} from "react-router-dom";
import stylesRest from "../../styleModule/restAPIBuilder.module.css";
import HeaderBottom from "../../../Layout/HeaderBottom/HeaderBottom";

export default function TablePage() {
    const { dataBaseID, tableID } = useParams()
    const [tableInfo, setTableInfo] = useState(null)
    const [isOpen, setIsOpen] = useState(false); // 드롭다운 메뉴의 상태

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

    // 드롭다운 토글 함수
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <HeaderBottom title={"테이블"} titleList={["프로젝트 목록", "프로젝트", "데이터베이스"]} linkList={["/projects", `/project/${dataBaseID}`, `/tables/${dataBaseID}`]}/>
            <div className={styles.tablePage}>
                <div className={styles.tableContainer}>
                    {tableInfo && <TableTitleUI title={"[ " + tableInfo.projectName + " ]"} subTitle={"- " + tableInfo.tableName} />}
                </div>

                {/* 드롭다운 버튼 */}
                <div className={styles.dropdown}>
                    <button className={styles.dropbtn} onClick={toggleDropdown}>활용하기</button>
                    {/* 드롭다운 내용 */}
                    {isOpen && (
                        <ul className={styles.dropdownContent}>
                            <li>
                                <div className={styles.dropdownContainer}>
                                    <LinkUI text={"REST API 활용하기"} redirect={`/apiBuilder/${dataBaseID}/${tableID}`} />
                                </div>
                            </li>
                            <li>
                                <div className={styles.dropdownContainer}>
                                    <LinkUI text={"템플릿 보기"} redirect={`/template/${dataBaseID}/${tableID}`} />
                                </div>
                            </li>
                            <li>
                                <div className={styles.dropdownContainer}>
                                    <DownloadUI tableID={tableID}/>
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
                <TableLayout tableID={tableID} />
            </div>
        </>
    )
}
