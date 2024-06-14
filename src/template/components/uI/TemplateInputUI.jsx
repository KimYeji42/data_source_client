import React from 'react';
import styles from "../../styleModule/templateDisplay.module.css";

export default function TemplateInputUI({ optionBoxData, selectedOptions, setSelectedOptions, setSelectedColumns }) {

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setSelectedOptions(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveButtonClick = () => {
        setSelectedColumns(selectedOptions);
    };

    return (
        <div className={styles.templateBoxUI}>
            <div className={`${styles.templateInput} ${styles.scrollbar}`}>
                <div className={styles.inputGroup}>
                    <label htmlFor="title">Title</label>
                    <select id="title" name="title" onChange={handleSelectChange} value={selectedOptions.title}>
                        <option value="">행을 선택해주세요.</option>
                        {optionBoxData.map((option, index) => (
                            <option key={index} value={option.name}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="description">Description</label>
                    <select id="description" name="description" onChange={handleSelectChange} value={selectedOptions.description}>
                        <option value="">행을 선택해주세요.</option>
                        {optionBoxData.map((option, index) => (
                            <option key={index} value={option.name}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="image">Image</label>
                    <select id="image" name="image" onChange={handleSelectChange} value={selectedOptions.image}>
                        <option value="">행을 선택해주세요.</option>
                        {optionBoxData.map((option, index) => (
                            <option key={index} value={option.name}>{option.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className={styles.buildButton} onClick={handleSaveButtonClick}>데이터 적용하기</button>
        </div>
    );
}
