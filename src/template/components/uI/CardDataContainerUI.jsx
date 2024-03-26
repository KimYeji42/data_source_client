import styles from "../../styleModule/sidebarStyle.module.css";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import {useState} from "react";

export default function CardDataContainerUI({selectionTitleList , columnData  , setSelectedValues}){
    const [selectData , setSelectData] = useState({})

    const handleChange = async (title, value) => {
        try {
            const response = await fetch(`http://localhost:8080/api/column/${value}/${1}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            setSelectData((prevValues) => ({
                ...prevValues,
                [title]: responseData,
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const buttonClickAction = () =>{
        setSelectedValues(selectData)
    }

    return(
        <div>
            <div className={styles.CardControlBox}>
                {selectionTitleList.map((title , index) => (
                    <div className={styles.columnSelect}>
                        <strong className={styles.selectionTitle}>{title}:</strong>
                        <select
                            className={styles.option}
                            onChange={(e) => handleChange(title, e.target.value)}
                        >
                            {columnData.map((item) => (
                                <option
                                    key={item} value={item.name}>{item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
                <ButtonUI className={styles.button} children={"실행"} onClick={buttonClickAction}/>
            </div>
        </div>
    )
}