import React, { useState } from 'react';
import styles from "../../styleModule/templateDisplay.module.css";

export default function TemplateCheckBoxUI({ checkboxData, onSaveButtonClick }) {
    const [checkedNames, setCheckedNames] = useState([]);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setCheckedNames(prevNames => [...prevNames, name]);
        } else {
            setCheckedNames(prevNames => prevNames.filter(item => item !== name));
        }
    };

    const handleSaveButtonClick = () => {
        onSaveButtonClick(checkedNames);
    };

    return (
        <div>
            <div className={styles.templateCheckBox}>
                {checkboxData.map((checkbox, index) => (
                    <div key={index} className={styles.checkBoxInputGroup}>
                        <label htmlFor={checkbox.id}>
                            <input
                                type="checkbox"
                                id={checkbox.id}
                                name={checkbox.name}
                                checked={checkedNames.includes(checkbox.name)}
                                onChange={handleCheckboxChange}
                            />
                            {checkbox.name}
                        </label>
                    </div>
                ))}
            </div>
            <button className={styles.buildButton} onClick={handleSaveButtonClick}>보기</button>
        </div>
    );
}
