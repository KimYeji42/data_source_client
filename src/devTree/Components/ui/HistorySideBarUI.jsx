import styles from "../../styles/styles.module.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


export default function HistorySideBarUI({ selected }) {

    const [selectedIndex, setSelectedIndex] = useState(selected);

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <div className={styles.HistorySideBar}>
                    <div className={styles.HistorySideBarMenu}>
                        <Link className={selected === 0 ? `${styles.SideMenu} ${styles.selectedMenuItem}` : styles.SideMenu}
                              onClick={() => handleClick(0)} to="/status" >현재 상태</Link>
                        <Link className={selected === 1 ? `${styles.SideMenu} ${styles.selectedMenuItem}` : styles.SideMenu}
                              onClick={() => handleClick(1)} to="/history" >히스토리</Link>
                        <Link className={selected === 2 ? `${styles.SideMenu} ${styles.selectedMenuItem}` : styles.SideMenu}
                              onClick={() => handleClick(2)} to="/commit">커밋 검색</Link>
                    </div>
            </div>
        </>

    );
}