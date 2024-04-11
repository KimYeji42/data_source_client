import React, { useEffect, useState } from "react";
import styles from "../../styleModule/ColumnStyle.module.css";

export default function NewDataUI({ column, createData, setCreateData, newDataCount, dataLine, tableID, setBlobData}) {
    const [newDataValues, setNewDataValues] = useState(new Array(newDataCount).fill(""));
    const [type, setType] = useState("");

    const handleNewDataInputChange = (event, columnIndex) => {
        const updatedValues = [...newDataValues];
        updatedValues[columnIndex] = event.target.value;
        setNewDataValues(updatedValues);
    };

    const handleFileInputChange = (event, index) => {
        const file = event.target.files[0];
        const updatedValues = [...newDataValues];
        // 새로운 데이터베이스의 원본 파일 이름이랑 비교하여 값을 저장!
        updatedValues[index] = file ? file.name : ""; // 파일 이름만 저장
        setNewDataValues(updatedValues);

        // Blob 데이터 업데이트
        setBlobData(prevBlobData => {
            const updatedBlobData = [...prevBlobData];
            updatedBlobData[index] =
                {   columnLine: index ,
                    columnName: column,
                    file: file
                }; // 컬럼 이름과 파일을 객체로 저장
            return updatedBlobData;
        });
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

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/column/type/${column}/${tableID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const dataType = await response.text();
            setType(dataType);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <tr>
            {type === 'BLOB' ? (
                newDataValues.map((value, index) => (
                    <td key={index} className={styles.newDataClass}>
                        <input
                            className={styles.newDataInput}
                            type="file"
                            onBlur={(event) => handleInputBlur(event, index, value)}
                            onChange={(event) => handleFileInputChange(event, index)} // 파일 선택 시 호출
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
