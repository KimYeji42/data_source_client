// ListMenuCanvas.js
import styles from '../../styleModule/canvas.module.css';
import ListMenuComponent from "./ListMenuLayOut";
import { useEffect, useState } from "react";
import ListDataContainerUI from "../uI/ListDataContainerUI";
import listMenuExampleData from "../data/ListMenuExampleData";

export default function ListMenuCanvas({ columnData }) {
    const [tableID, setTableID] = useState(1);
    const [listMenuData, setListMenuData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchFilteredData = async (menuList) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/template/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tableID: tableID, menuColumns: menuList })
            });
            const responseData = await response.json();
            setListMenuData(responseData);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };

    const setMenuListHandler = (menuList) => {
        fetchFilteredData(menuList);
    };

    return (
        <div className={styles.all}>
            <div>
                <ListDataContainerUI columnList={columnData} setMenuList={setMenuListHandler} />
            </div>

            <div className={styles.listGrid}>
                {loading && <p>Loading...</p>}
                {!loading && listMenuData && (
                    <ListMenuComponent title="Check Menu" menus={listMenuData} />
                )}
                {!loading && !listMenuData && (
                    <ListMenuComponent title="Check Menu" menus={listMenuExampleData} />
                )}
            </div>
        </div>
    );
}
