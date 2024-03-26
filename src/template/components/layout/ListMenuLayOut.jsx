import React, { useState } from 'react';
import styles from '../../styleModule/listMenuStyle.module.css';

function ListMenuComponent({ title, menus }) {
    // 각 아이템의 체크 상태를 저장하는 2차원 배열
    const [checkedItems, setCheckedItems] = useState(menus.map(menu => menu.menu.map(() => false)));

    // 체크박스의 상태가 변경될 때 호출되는 함수
    const handleCheckboxChange = (menuIndex, itemIndex) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[menuIndex][itemIndex] = !checkedItems[menuIndex][itemIndex];
        setCheckedItems(newCheckedItems);
    };

    return (
        <div className={styles.menuContainer}>
            <h5 className={styles.menuTitle}>{title}</h5>
            {menus.map((menu, menuIndex) => (
                <div key={menuIndex} className={styles.menu}>
                    <ul className={styles.menuList}>
                        {menu.menu.map((item, itemIndex) => (
                            <li key={itemIndex} className={styles.menuItem}>
                                <input
                                    type="checkbox"
                                    id={`checkbox_${menuIndex}_${itemIndex}`}
                                    checked={checkedItems[menuIndex][itemIndex]} // 아이템 별 체크 상태를 반영
                                    onChange={() => handleCheckboxChange(menuIndex, itemIndex)} // 체크 상태 변경 시 함수 호출
                                />
                                <label htmlFor={`checkbox_${menuIndex}_${itemIndex}`}>{item}</label>
                            </li>
                        ))}
                    </ul>
                    {menuIndex !== menus.length - 1 && <hr className={styles.menuSeparator} />} {/* 마지막 메뉴 뒤에는 구분선을 표시하지 않음 */}
                </div>
            ))}
        </div>
    );
}

export default ListMenuComponent;