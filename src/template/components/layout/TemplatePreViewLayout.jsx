import styles from '../../styleModule/cardDesignStyle.module.css'
import tableStyles from '../../styleModule/tableStyle.module.css';
import cardStyles from '../../styleModule/cardDesignStyle.module.css'
import barStyles from '../../styleModule/barDesignStyle.module.css'
import listStyles from '../../styleModule/listDesginStyle.module.css'
import treeStyles from '../../styleModule/treeDesginStyle.module.css'
import {Image} from "react-bootstrap";
import searchIcon from '../../image/glass.png'
import houseIcon from '../../image/house.png'
import downClickIcon from '../../image/click.png'
import upClickIcon from '../../image/clickBefore.png'

import {useState} from "react";
export default function TemplatePreViewLayout({ templateName  , selectInputData , checkBoxData }) {
    const [openColumns, setOpenColumns] = useState({}); // 각 컬럼의 토글 상태를 관리하기 위한 상태

    // 이미지 클릭 이벤트 핸들러
    const toggleOpen = (index) => {
        setOpenColumns(prevState => ({
            ...prevState,
            [index]: !prevState[index], // 해당 컬럼의 토글 상태를 반전
        }));
    };

    let templateDesign = null;


    switch (templateName.toUpperCase()) {
        case "CARD TEMPLATE": {
            templateDesign = (
                <div className={`${styles.cardContainer} ${styles.scrollbar}`}>
                    {selectInputData.map((card, index) => (
                        <div key={index} className={cardStyles.card}>
                            <div className={cardStyles.cardImageContainer}>
                                <img src={card.image} alt={card.title} />
                            </div>
                            <div className={cardStyles.cardContent}>
                                <h2 className={cardStyles.cardTitle}>{card.title}</h2>
                                <p className={cardStyles.cardDescription}>{card.description}</p>
                            </div>
                            <div className={cardStyles.cardButtonContainer}>
                                <button className={cardStyles.cardButton}>버튼</button>
                            </div>
                        </div>
                    ))}
                </div>
            );
            break;
        }
        case "BAR TEMPLATE": {
            // Bar Template에 대한 처리
            templateDesign = (
                <div>
                    {selectInputData.map((bar, index) => (
                        <div key={index} className={barStyles.bar}>
                            <div className={barStyles.barImage}>
                                <img src={bar.image} alt={bar.title} />
                            </div>
                            <div className={barStyles.barContainer}>
                                <h2 className={barStyles.barTitle}>{bar.title}</h2>
                                <p className={barStyles.barDescription}>{bar.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );
            break;
        }
        case "LIST TEMPLATE": {
            if (selectInputData === null) return null;

            // List Template에 대한 처리
            templateDesign = (
                <div style={{ padding: "20px" }}>
                    <div className={listStyles.menuContainer}>
                        <h6 className={listStyles.menuTitle}>List Template Design</h6>
                        <div className={listStyles.menuValues}>
                            {selectInputData.map((column, index) => (
                                <div key={index} className={listStyles.menuInbox}>
                                    {column.data.map((data, idx) => (
                                        <div key={idx} className={listStyles.menu}>
                                            <input type="checkbox" style={{ width: '17px', height: '17px' }} />
                                            <small>{data}</small>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
            break;
        }
        case "TREE TEMPLATE": {
            if (selectInputData === null) return null;
            // Tree Template에 대한 처리
            templateDesign = (
                <div style={{ padding: "20px" }}>
                    <div className={treeStyles.treeContainer}>
                        <h6 className={treeStyles.treeTitle}>List Template Design</h6>
                        <div className={treeStyles.inputBox}>
                            <Image src={searchIcon} style={{ width: "40px", height: "40px" }} />
                            <input className={treeStyles.searchBar} placeholder={"Search"} />
                        </div>
                        <hr/>

                        {selectInputData.map((column, index) => (
                            <div key={index}>
                                <div className={treeStyles.treeColumnsTitle}>
                                    <Image src={houseIcon} style={{ width: "40px", height: "40px" }} />
                                    <h6>{column.columnName}</h6>
                                    {
                                        openColumns[index] && (
                                            <Image
                                                className={treeStyles.clickIcon}
                                                src={downClickIcon}
                                                style={{ width: "20px", height: "10px", cursor: 'pointer' }}
                                                onClick={() => toggleOpen(index)} // 해당 컬럼의 토글 상태를 변경하는 함수 호출
                                            />
                                        )
                                    }
                                    {
                                        !openColumns[index] && (
                                            <Image
                                                className={treeStyles.clickIcon}
                                                src={upClickIcon}
                                                style={{ width: "10px", height: "20px", cursor: 'pointer' }}
                                                onClick={() => toggleOpen(index)} // 해당 컬럼의 토글 상태를 변경하는 함수 호출
                                            />
                                        )
                                    }
                                </div>
                                {openColumns[index] && column.data.map((data, idx) => (
                                    <li className={treeStyles.columnValues} key={idx}>
                                        <small>{data}</small>
                                    </li>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            );
            break;
        }
        case "TABLE TEMPLATE": {
            if (selectInputData === null) return null;
            const rowCount = Math.max(...selectInputData.map(column => column.data.length));
            templateDesign = (
                <div style={{padding : "20px"}}>
                    <table className={tableStyles.table}>
                        <thead>
                        <tr>
                            <th className={tableStyles.th}><input type="checkbox"/></th>
                            {selectInputData.map((column) => (
                                <th className={tableStyles.th} key={column.id}>
                                    {column.columnName}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from({ length: rowCount }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className={tableStyles.td}><input type="checkbox"/></td>
                                {selectInputData.map((column) => (
                                    <td className={tableStyles.td} key={`${column.id}-${rowIndex}`}>
                                        {column.data[rowIndex] || ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
            break;
        }
        default: {
            // 해당하는 템플릿이 없는 경우의 처리
            templateDesign = (
                <div>
                    <h2>Template Not Found</h2>
                    <p>해당하는 템플릿이 없습니다.</p>
                </div>
            );
            break;
        }
    }

    return (
        <div>
            {templateDesign}
        </div>
    );
}
