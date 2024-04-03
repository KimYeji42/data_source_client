import styles from "../../styleModule/sidebarStyle.module.css";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import { useState } from "react";


export default function CardDataContainerUI({ columnData, setSelectedValues , dataChangeHandler }) {
    const [selectData, setSelectData] = useState({});

    const handleChange = (title, value) => {
        setSelectData({ ...selectData, [title]: value });
    };

    const buttonClickAction = () => {
        dataChangeHandler();
        setSelectedValues(selectData);
    };
    let items = [ "Title" , "description"]; // items 변수명 변경

    return (
        <div>
            <div className={styles.CardControlBox}>
                {items.map((item, index) => ( // items로 변경
                    <div key={index} className={styles.columnSelect}>
                        <h6 className={styles.selectionTitle}>{item}:</h6>
                        <select className={styles.option}
                                onChange={(e) => handleChange(item, e.target.value)}> {/* handleChange 함수에 매개변수 전달 */}
                            {columnData.map((columnItem , index) =>
                                <option key={index}>{columnItem.name}</option>
                            )}
                        </select>
                    </div>
                ))}
                <ButtonUI className={styles.button} children={"실행"} onClick={buttonClickAction} />
            </div>
        </div>
    );
}
