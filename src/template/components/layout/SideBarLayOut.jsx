import React, {useEffect, useState} from 'react';
import sideBarCategoriesExampleData from '../data/SideBarCategoriesExampleData'; // 적절한 카테고리 정보를 가져오는 경로로 수정
import SideButtonUI from '../uI/SideButtonUI'; // SideButtonUI 컴포넌트의 경로에 따라 수정
import styles from '../../styleModule/sidebarStyle.module.css';
import TableCanvasLayOut from "./TableCanvasLayOut";
import TreeCanvasLayOut from "./TreeCanvasLayOut";
import CardCanvasLayOut from "./CardCanvasLayOut";
import cardExampleData from "../data/cardExampleData";
import ListMenuCanvas from "./ListMenuCanvasLayOut";
import cardObjectData from "../data/cardObjectData";

export default function SideBarLayOut() {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [columnData , setColumnData] = useState({})
    const [tableID , setTableID] = useState(1)
    const handleButtonClick = (category) => {
        console.log("Clicked category:", category); // 클릭된 카테고리를 콘솔에 출력
        setSelectedComponent(category); // 선택된 카테고리 설정
    };

    const fetchColumData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/column/${tableID}`, {
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
                <p>닫기</p>
            </div>

            {/* 선택된 카테고리에 따라 해당 컴포넌트 렌더링 */}
            {selectedComponent === 'Card' &&
                <CardCanvasLayOut
                    exampleData={cardExampleData}
                    cardObjectData={cardObjectData}
                    columnData={columnData}
                />}

            {selectedComponent === 'List' &&
                <ListMenuCanvas
                    columnData={columnData}
                />}

            {selectedComponent === 'Table' && <TableCanvasLayOut/> }

            {selectedComponent === 'Tree' && <TreeCanvasLayOut
                columnData = {columnData}
            />}

        </div>
    );
}
