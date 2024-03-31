import React, { useState } from "react";
import styles from "../../styleModule/ColumnStyle.module.css";

export default function NewDataUI({ column, createData, setCreateData, newDataCount, dataLine }) {
    const [newDataValues, setNewDataValues] = useState(new Array(newDataCount).fill("")); // 새로운 배열

    // 각 컬럼의 새로운 데이터 입력값
    const handleNewDataInputChange = (event, columnIndex) => {
        const updatedValues = [...newDataValues];
        updatedValues[columnIndex] = event.target.value;
        setNewDataValues(updatedValues);
    };

    const handleInputBlur = (event, index, value) => {
        const updatedCreateData = [...createData]; // createData 배열의 복사본 생성

        // 기존 값이 있는 경우 해당 아이템을 배열에서 제거
        const existingIndex = updatedCreateData.findIndex(item => item.columnLine === dataLine && item.columnName === column);

        if (existingIndex !== -1) {
            updatedCreateData.splice(existingIndex, 1);
        }

        const obj = {
            data: value,
            columnName: column,
            columnLine: dataLine
        };

        updatedCreateData.push(obj); // 새로운 아이템을 추가
        setCreateData(updatedCreateData); // 업데이트된 데이터를 설정
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
