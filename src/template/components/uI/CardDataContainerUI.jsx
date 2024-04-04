import styles from "../../styleModule/sidebarStyle.module.css";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import { useState } from "react";


export default function CardDataContainerUI({ columnData, setSelectedValues , dataChangeHandler }) {
    const [selectData, setSelectData] = useState({});

    const handleChange = (title, value) => {
        console.log(selectData)
        setSelectData({ ...selectData, [title]: value });
    };

    const buttonClickAction = async () => {
        await setSelectedValues(selectData); // 선택된 데이터를 부모 컴포넌트에 전달 후에 기다림
        await dataChangeHandler(); // 데이터 변환 함수 호출 후에 기다림
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
