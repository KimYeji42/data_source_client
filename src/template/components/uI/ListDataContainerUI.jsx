import { useState } from 'react';
import styles from "../../styleModule/sidebarStyle.module.css";
import ButtonUI from "../../../project/components/uI/ButtonUI";

export default function ListDataContainerUI({ columnList , setMenuList}) {
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (columnName) => {
        if (checkedItems.includes(columnName)) {
            setCheckedItems(prevState => prevState.filter(item => item !== columnName));
        } else {
            setCheckedItems(prevState => [...prevState, columnName]);
        }
    };

    const buttonClickAction = () => {
        setMenuList(checkedItems)
    };

    return (
        <div>
            <div className={styles.CardControlBox}>
                <div className={styles.checkBox}>
                    {columnList.map((column, index) => (
                        <div key={index}>
                            <p className={styles.checkBoxTitle}>{column.name}</p>
                            <input
                                type={"checkbox"}
                                value={column.name}
                                checked={checkedItems.includes(column.name)}
                                onChange={() => handleCheckboxChange(column.name)}
                            />
                        </div>
                    ))}
                </div>
                <ButtonUI className={styles.button} children={"실행"} onClick={buttonClickAction}/>
            </div>
        </div>
    );
}
