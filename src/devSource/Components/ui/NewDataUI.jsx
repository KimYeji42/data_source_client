import React, { useState } from "react";
import styles from "../../styleModule/ColumnStyle.module.css";

export default function NewDataUI({ column, createData, setCreateData, newDataCount, dataLine , type , setJoinTableMapperModal}) {
    const [newDataValues, setNewDataValues] = useState(new Array(newDataCount).fill(""));

    const handleNewDataInputChange = (event, columnIndex) => {
        const updatedValues = [...newDataValues];
        updatedValues[columnIndex] = event.target.value;
        setNewDataValues(updatedValues);
    };

    const handleJoinTableChange = (event, index) => {
        setJoinTableMapperModal(true)
        console.log("Join 컬럼 클릭")
    };

    const handleInputBlur = (event, index, value) => {
        const updatedCreateData = [...createData];

        const existingIndex = updatedCreateData.findIndex(item => item.columnLine === dataLine && item.columnName === column);

        if (existingIndex !== -1) {
            updatedCreateData.splice(existingIndex, 1);
        }

        const obj = {
            data: value,
            columnName: column,
            columnLine: dataLine
        };
        updatedCreateData.push(obj);
        setCreateData(updatedCreateData);
        setJoinTableMapperModal(false)
    };



    return (
        <tr>
            {type === 'JOIN_Column' ? (
                newDataValues.map((value, index) => (
                    <td key={index} className={styles.newDataClass}>
                        <input
                            className={styles.newDataInput}
                            type="text"
                            value={value}
                            placeholder="NULL"
                            onBlur={(event) => handleInputBlur(event, index, value)}
                            onChange={(event) => handleNewDataInputChange(event, index)}
                            onFocus={(event) => handleJoinTableChange(event, index)}
                        />
                    </td>
                ))
            ) : (
                newDataValues.map((value, index) => (
                    <td key={index} className={styles.newDataClass}>
                        <input
                            className={styles.newDataInput}
                            type="text"
                            value={value}
                            onBlur={(event) => handleInputBlur(event, index, value)}
                            onChange={(event) => handleNewDataInputChange(event, index)}
                            placeholder="NULL"
                        />
                    </td>
                ))
            )}
        </tr>
    );
}
