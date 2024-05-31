import TableLayout from "../layout/TableLayout";
import TableTitleUI from "../ui/TableTitleUI";
import styles from '../../styleModule/ColumnStyle.module.css';
import DownloadUI from "../ui/DownloadUI";
import React, { useEffect, useState } from "react";
import LinkUI from "../../../project/components/uI/LinkUI";
import { useParams } from "react-router-dom";

export default function TablePage() {
    const { tableID } = useParams()
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
                                    <LinkUI text={"REST API 활용하기"} redirect={`/apiBuilder/${tableID}`} />
                                </div>
                            </li>
                            <li>
                                <div className={styles.dropdownContainer}>
                                    <LinkUI text={"템플릿 보기"} redirect={`/template/${tableID}`} />
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
