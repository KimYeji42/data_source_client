import styles from '../../styleModule/canvas.module.css';
import TreeComponent from "./TreeLayOut";
import TreeExampleData from "../data/TreeExampleData";
import { useState } from "react";
import TreeDataContainerUI from "../uI/TreeDataContainerUI";
import ListMenuComponent from "./ListMenuLayOut";
import listMenuExampleData from "../data/ListMenuExampleData";

export default function TreeCanvasLayOut({ columnData }) {
    const [tableID, setTableID] = useState(1);
    const [loading, setLoading] = useState(false);
    const [treeData, setTreeData] = useState(null);

    const fetchTreeTemplatedData = async (menuList) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/template/tree`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tableID: tableID, menuColumns: menuList })
            });
            const responseData = await response.json();
            setTreeData(responseData);
            console.log(responseData);
        } catch (error) {
            console.error('Error fetching tree data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.all}>
            <TreeDataContainerUI columnList={columnData} fetchTreeData={fetchTreeTemplatedData} />

            <div className={styles.treeGrid}>
                {loading && <p>Loading...</p>}

                {!loading && treeData && (
                    <TreeComponent title="DataBase" tables={treeData} />
                )}
                {!loading && !treeData && (
                    <TreeComponent title="DataBase" tables={TreeExampleData} />
                )}

            </div>
        </div>
    );
}
