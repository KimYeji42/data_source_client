import React, {useEffect, useState} from 'react';
import sideBarCategoriesExampleData from '../data/SideBarCategoriesExampleData'; // 적절한 카테고리 정보를 가져오는 경로로 수정
import SideButtonUI from '../uI/SideButtonUI'; // SideButtonUI 컴포넌트의 경로에 따라 수정
import styles from '../../styleModule/sidebarStyle.module.css';
import TableCanvasLayOut from "./TableCanvasLayOut";
import TreeCanvasLayOut from "./TreeCanvasLayOut";
import CardCanvasLayOut from "./CardCanvasLayOut";
import ListMenuCanvas from "./ListMenuCanvasLayOut";
import {useParams} from "react-router-dom";
import LinkUI from "../../../project/components/uI/LinkUI";
export default function SideBarLayOut() {
    const {tableID} = useParams()
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [columnData , setColumnData] = useState({})

    const handleButtonClick = (category) => {
        console.log("Clicked category:", category); // 클릭된 카테고리를 콘솔에 출력
        setSelectedComponent(category); // 선택된 카테고리 설정
    };

    const templateDownloadButtonClickHandler = () => {
        let templatePath = "";
        switch (selectedComponent) {
            case "Tree":
                templatePath = "/template/Tree.zip";
                break;
            case "Table":
                templatePath = "/template/Table.zip";
                break;
            case "List":
                templatePath = "/template/List.zip";
                break;
            case "Card":
                templatePath = "/template/Card.zip";
                break;
            default:
                alert("템플릿을 클릭한 후 다운로드 해주세요.");
        }

        const downloadLink = document.createElement("a");
        downloadLink.href = templatePath;
        downloadLink.download = selectedComponent + "_template.zip"; // ZIP 파일로 다운로드될 파일명 설정
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const fetchColumData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/column/list/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setColumnData(responseData)
            console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchColumData()
    }, []);
    return (
        <div>
            <div className={styles.sidebar}>
                {sideBarCategoriesExampleData.map(category => (
                    <SideButtonUI
                        key={category.id}
                        category={category.category}
                        onClick={handleButtonClick}
                    />
                ))}
            </div>
            <div className={styles.closeBox}>
                <div className={styles.templateDownBox}>
                    <LinkUI text={"테이블로 돌아가기"} redirect={`/table/${tableID}`}/>
                </div>
                <p onClick={templateDownloadButtonClickHandler}><LinkUI text={"템플릿 다운로드"} /></p>
            </div>

            {/* 선택된 카테고리에 따라 해당 컴포넌트 렌더링 */}
            {selectedComponent === 'Card' &&
                <CardCanvasLayOut
                    tableID={tableID}
                    columnData={columnData}
                />}
            {selectedComponent === 'List' &&
                <ListMenuCanvas
                    tableID={tableID}
                    columnData={columnData}
                />}

            {selectedComponent === 'Table'
                && <TableCanvasLayOut/>
            }

            {selectedComponent === 'Tree' &&
                <TreeCanvasLayOut
                columnData = {columnData}
                tableID={tableID}

                />}

        </div>
    );
}
