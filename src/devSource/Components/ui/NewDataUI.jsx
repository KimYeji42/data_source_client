import React, { useState} from "react";
import styles from "../../styleModule/ColumnStyle.module.css";
import JoinTableModalUI from "./JoinTableModalUI";

export default function NewDataUI({ column, createData, setCreateData, newDataCount, dataLine, type, tableID }) {
    const [newDataValues, setNewDataValues] = useState(new Array(newDataCount).fill(""));
    const [selectedJoinValue, setSelectedJoinValue] = useState(null);
    const [isJoinTableMapperModal, setIsJoinTableMapperModal] = useState(false);

    const handleNewDataInputChange = (event, columnIndex) => {
        const updatedValues = [...newDataValues];
        updatedValues[columnIndex] = event.target.value;
        setNewDataValues(updatedValues);
    };

    const handleJoinTableChange = () => {
        setIsJoinTableMapperModal(true);
    };

    const handleJoinItemClick = (item) => {
        setSelectedJoinValue(item); // 선택한 값을 상태로 저장
        const updatedValues = [...newDataValues];
        updatedValues.forEach((value, index) => {
            updatedValues[index] = item.id || value;
        });
        setNewDataValues(updatedValues);//이 값이 들어가고 데이터가 닫혔으면 좋게씀..
        setIsJoinTableMapperModal(false);
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
                            onFocus={handleJoinTableChange}
                            readOnly={true}
                        />
                        {isJoinTableMapperModal &&
                            <JoinTableModalUI
                                tableID={tableID}
                                column={column}
                                setJoinData={handleJoinItemClick}
                            />
                        }
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
