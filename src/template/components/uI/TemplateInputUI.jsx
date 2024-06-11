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
            <div className={styles.templateInput}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Title</label>
                        <select id="title" name="title" onChange={handleSelectChange} value={selectedOptions.title}>
                            <option value="">Select Title Column</option>
                            {optionBoxData.map((option, index) => (
                                <option key={index} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="description">Description</label>
                        <select id="description" name="description" onChange={handleSelectChange} value={selectedOptions.description}>
                            <option value="">Select Description Column</option>
                            {optionBoxData.map((option, index) => (
                                <option key={index} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="image">Image</label>
                        <select id="image" name="image" onChange={handleSelectChange} value={selectedOptions.image}>
                            <option value="">Select Image Column</option>
                            {optionBoxData.map((option, index) => (
                                <option key={index} value={option.name}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className={styles.buildButton} onClick={handleSaveButtonClick}>보기</button>
        </div>
    );
}
