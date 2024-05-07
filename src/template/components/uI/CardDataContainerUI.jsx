import styles from "../../styleModule/sidebarStyle.module.css";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import { useState } from "react";


export default function CardDataContainerUI({ columnData, setSelectedValues , dataChangeHandler }) {
    const [selectData, setSelectData] = useState({});
    const [toggleOff , setToggleOff] = useState(false)
    const handleChange = (title, value) => {
        console.log(selectData)
        setSelectData({ ...selectData, [title]: value });
    };

    const buttonClickAction = async () => {
        await setSelectedValues(selectData); // 선택된 데이터를 부모 컴포넌트에 전달 후에 기다림
        await dataChangeHandler(); // 데이터 변환 함수 호출 후에 기다림
    };

    const toggleOffEvent = () =>{
        setToggleOff(!toggleOff); // 토글 상태를 반전시킴
    }
    let items = [ "Title" , "description"]; // items 변수명 변경

    return (
        <div>
            <div className={toggleOff ? styles.CardControlBoxOff : styles.CardControlBox}>
                {items.map((item, index) => (
                    <div key={index} className={styles.columnSelect}>
                        <h6 className={styles.selectionTitle}>{item}:</h6>
                        <select className={styles.option} onChange={(e) => handleChange(item, e.target.value)}>
                            {columnData.map((columnItem, index) =>
                                <option key={index}>{columnItem.name}</option>
                            )}
                        </select>
                    </div>
                ))}
                <ButtonUI className={styles.button} children={"실행"} onClick={buttonClickAction} />
                <button className={styles.toggleButton} onClick={() => setToggleOff(!toggleOff)}>
                    {toggleOff ? "<<" : " >> "}
                </button>
            </div>
        </div>
    );
}
