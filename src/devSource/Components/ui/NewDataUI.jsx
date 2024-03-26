import React, { useState } from "react";
import styles from "../../styleModule/ColumnStyle.module.css";

export default function NewDataUI({ key, column  , createData , setCreateData , newDataCount  , dataLine }) {

    const [newDataValues, setNewDataValues] = useState(new Array(newDataCount).fill("")); //새로운 배열
    // 각 컬럼의 새로운 데이터 입력값
    const handleNewDataInputChange = (event, columnIndex) => {
        const updatedValues = [...newDataValues];
        updatedValues[columnIndex] = event.target.value;
        setNewDataValues(updatedValues);
    };

    const handleInputBlur = (event, index, value) => {
        const newCreateData = [...createData]; // 기존의 updateData

        const existingIndex = newCreateData.findIndex(item => item.columnLine === dataLine && item.column === column);

        // 기존 값이 있다면 제거
        if (existingIndex !== -1) {
            newCreateData.splice(existingIndex, 1);
        }

        let obj = {
            data: value,
            column: column,
            columnLine: dataLine
        };

        newCreateData.push(obj); // 새로운 아이템을 추가
        setCreateData(newCreateData); // 업데이트된 데이터를 설정
    };

    return (
        <tr>
            {/* 각 컬럼에 대한 입력란 생성 */}
            {newDataValues.map((value, index) => (
                <td key={index} className={styles.newDataClass}>
                    <input
                        className={styles.newDataInput}
                        type="text"
                        value={value}
                        onBlur={(event) => handleInputBlur(event, index, value)} // 입력창을 떠날 때 호출
                        onChange={(event) => handleNewDataInputChange(event, index)}
                        placeholder="NULL"
                    />
                </td>
            ))}
        </tr>
    );
}

