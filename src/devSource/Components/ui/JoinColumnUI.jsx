import styles from '../../styleModule/createTableStyle.module.css';
import TableSearchLayout from "../layout/TableSearchLayout";
import React, { useState } from "react";

export default function JoinColumnUI({ row, index, handleSelectChange }) {
    const [showSearch, setShowSearch] = useState(false); // searchBox 렌더링
    const [joinTable, setJoinTable] = useState(row.joinTable);

    const renderSearch = () => {
        setShowSearch((prevState) => !prevState);
    };

    const handleJoinTableSelect = (selectedTable) => {
        setJoinTable(selectedTable);
        handleSelectChange({ target: { name: 'joinTable', value: selectedTable } }, index);
    };

    return (
        <div className={styles.joinRow}>
            <input value={joinTable?.tableName || ''} onChange={(e) => handleSelectChange(e, index)} readOnly />

            <div className={styles.searchButtonBox}>
                <button onClick={renderSearch} className={styles.searchButton}>
                    검색 ▼
                </button>
                <div className={styles.searchBox}>
                    {showSearch && (
                        <TableSearchLayout
                            handleJoinTableSelect={handleJoinTableSelect}
                            setShowSearch={setShowSearch}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
