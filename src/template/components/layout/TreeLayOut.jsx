import ImageComponent from "../uI/TreeImageUI";
import graph from '../../image/graph.png';
import glass from '../../image/glass.png';
import styles from '../../styleModule/treeStyle.module.css';
import before from '../../image/clickBefore.png';
import after from '../../image/click.png';

import {useState} from "react";

function TreeComponent({ title, tables }) {
    const [expandedTables, setExpandedTables] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const toggleColumns = (tableId) => {
        setExpandedTables((prevExpandedTables) => {
            if (prevExpandedTables.includes(tableId)) {
                return prevExpandedTables.filter((id) => id !== tableId);
            } else {
                return [...prevExpandedTables, tableId];
            }
        });
    };
    const isTableExpanded = (tableId) => {
        return expandedTables.includes(tableId);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        // 검색 기능 구현
    };

    return (
        <div className={styles.treeContainer}>
            <h5 className={styles.treeTitle}>{title}</h5>
            <div className={styles.imageAndText}>
                <div className={styles.inputContainer}>
                    <img className={styles.imagePlaceholder} src={glass} alt="Image Placeholder"/>
                    <input type="text" placeholder="Search" value={searchValue} onChange={handleSearchChange}/>
                    <hr/>
                </div>

            </div>



            {tables.map((table) => (
                <div key={table.id} className="table">
                    <div className="table-header">
                        <div className={styles.tableName}>
                            <ImageComponent/> {/* 공통 이미지 컴포넌트 */}
                            {table.columnName}
                            <button className={styles.button} onClick={() => toggleColumns(table.id)}>
                                {isTableExpanded(table.id) ? <img src={after}/>: <img src={before}/>}
                            </button>
                        </div>
                    </div>

                    {isTableExpanded(table.id) && (
                        <ul className={styles.tableList}>
                            {table.data.map((data, index) => (
                                <li key={index} className={styles.column}>
                                    {data}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            <div className={styles.foot}>
                <div className={styles.progress}>
                    <img src={graph} style={{width: '30px', height: 'auto'}}/>
                    <span>Progress</span>
                </div>
            </div>
        </div>
    );
}

TreeComponent.defaultProps = {
    tables: [], // 기본값으로 빈 배열 설정
};

export default TreeComponent;