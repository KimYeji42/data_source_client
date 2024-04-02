import styles from '../../styleModule/createTableStyle.module.css';
import React, { useState, useEffect } from "react";
import JoinColumnUI from "../ui/JoinColumnUI";
import ButtonUI from "../../../project/components/uI/ButtonUI";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

const initialRowState = {
    id: 1,
    columnName: '',
    dataType: 'VARCHAR',
    pk: false,
    fk: false,
    uk: false,
    isNotNull : false,
    joinTable: {}
};

export default function SelectColumnLayout({ sendColumnData, setColumnList }) {
    const [rows, setRows] = useState([initialRowState]);
    const [creationTimes, setCreationTimes] = useState([Date.now()]);
    const [error, setError] = useState("");
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    function handleSelectChange(event, index) {
        const { name, value, type, checked } = event.target;
        const updatedRows = [...rows];

        if (type === 'checkbox') {
            updatedRows[index][name] = checked;
        } else if (name === "dataType") {
            updatedRows[index][name] = value;
        } else {
            const isDuplicateName = updatedRows.some((row, i) => {
                const existingValue = row[name].toLowerCase();
                const newValue = value.toLowerCase(); // 새 값 소문자 변환
                return i !== index && existingValue === newValue;
            });

            if (isDuplicateName) {
                setError("컬럼값이 중복되었습니다.");
                setIsErrorModalOpen(true);
                return;
            }

            updatedRows[index][name] = value;
        }

        setRows(updatedRows);
    }


    useEffect(() => {
        setColumnList(rows);
    }, [rows, setColumnList]);

    const handleAddRow = () => {
        const newRow = {
            id: rows.length + 1,
            columnName: '',
            dataType: 'VARCHAR',
            pk: false,
            fk: false,
            uk: false,
            isNotNull : false,
            joinTable: {}
        };
        setRows([...rows, newRow]);
        setCreationTimes([...creationTimes, Date.now()]);
    };

    const handleDeleteRow = () => {
        if (rows.length > 1) {
            const updatedRows = [...rows.slice(1)];
            setRows(updatedRows);
            const updatedCreationTimes = [...creationTimes.slice(1)];
            setCreationTimes(updatedCreationTimes);
        }
    };

    return (
        <div>
            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}

            />
            <div className={styles.buttonBig}>
                <button onClick={handleAddRow} style={{marginRight: '2px'}}>+</button>
                <button onClick={handleDeleteRow}>-</button>
            </div>

            <table className={styles.selectHeaderTable}>
                <thead>
                <tr>
                    <th>컬럼이름</th>
                    <th>데이터타입</th>
                    <th>PK</th>
                    <th>FK</th>
                    <th>UK</th>
                    <th>NOT NULL</th>
                    <th>조인</th>
                </tr>
                </thead>
                <tbody id="tableBody">
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td><input type="text" name="columnName" value={row.columnName}
                                   onChange={(e) => handleSelectChange(e, index)} className={styles.inputColumnName}/>
                        </td>
                        <td style={{width: '300px'}}>
                            <select name="dataType" value={row.dataType} onChange={(e) => handleSelectChange(e, index)}
                                    className={styles.inputDataType}>
                                <option value="VARCHAR">VARCHAR</option>
                                <option value="INTEGER">INTEGER</option>
                                <option value="DATE">DATE</option>
                                <option value="BOOLEAN">BOOLEAN</option>
                            </select>
                        </td>
                        <td style={{width: '50px'}}>
                            <input type="checkbox" name="pk" checked={row.pk}
                                   onChange={(e) => handleSelectChange(e, index)} className={styles.checkBox}/>
                        </td>
                        <td style={{width: '50px'}}>
                            <input type="checkbox" name="fk" checked={row.fk}
                                   onChange={(e) => handleSelectChange(e, index)} className={styles.checkBox}
                            />
                        </td>
                        <td style={{width: '50px'}}>
                            <input type="checkbox" name="uk" checked={row.uk}
                                   onChange={(e) => handleSelectChange(e, index)} className={styles.checkBox}/>
                        </td>
                        <td style={{width: '50px'}}>
                            <input type="checkbox" name="isNotNull" checked={row.isNotNull}
                                   onChange={(e) => handleSelectChange(e, index)} className={styles.checkBox}/>
                        </td>
                        <td style={{width: '400px'}}>
                            <JoinColumnUI row={row} index={index} handleSelectChange={handleSelectChange}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ButtonUI children={"테이블 생성하기"} className={styles.buttonBox} onClick={sendColumnData}/>
        </div>
    );
}