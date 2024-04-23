import React from "react";
import styles from "../../styles/styles.module.css";
import {useState, useEffect} from "react";

const MergeCrashModalLayout =({crashData, isOpen, onClose, setCrashRequest}) => {
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        setSelectedValues([]);
        console.log("충돌 해결:" + crashData)
    }, [crashData]);

    if (!isOpen) return null;

    const handleCreate = () => {
        onClose(); // 모달을 닫음
    };

    // 라디오 버튼 선택 상태를 업데이트하는 함수
    const handleRadioChange = async(event, index) => {
        const { name, value } = event.target;

        const intIndex = parseInt(index)
        console.log("intIndex : " + intIndex)

        // 선택된 값들을 업데이트
        await setSelectedValues(prevSelectedValues => {
            const updatedValues = [...prevSelectedValues];
            updatedValues[intIndex] = value;
            console.log("updatedValues : " + updatedValues)
            return updatedValues;
        });
    };

    // 모든 선택된 값들을 가져오는 함수
    const getAllSelectedValues = () => {
        let count = 0;
        const selectedVal = selectedValues.filter(value => value !== undefined)

        crashData.forEach(mergeCrashResponse => {
            mergeCrashResponse.data.forEach(mergeCrashColumn => {
                mergeCrashColumn.data.forEach(mergeCrashData => {
                    if (mergeCrashData) {
                        count++;
                    }
                });
            });
        });

        if (selectedVal.length !== count/2) {
            alert("사용할 행을 모두 선택해주세요.")
        } else {
            setCrashRequest(selectedVal);
        }
    };

    return (
        <div>
            <div className={styles.modalOverlay}>
                <div className={styles.mergemodal}>
                    <p className={styles.mergeGuideTxt}>병합하려는 커밋과 현재 커밋의 테이블에 <span className={styles.mergeGuideTxtBold}>충돌하는 PK</span>가 존재합니다.<br/>충돌 해결 후 다시 시도해 주세요.</p>
                    <p>※ 사용할 행을 선택해주세요.</p>
                    <div className={styles.madalLayout}>

                        {crashData && crashData.map((mergeCrashResponse, index) => (
                            <div key={index}>
                                <h2>{mergeCrashResponse.tableName}</h2>
                                <table key={index} className={styles.mergeTable}>
                                    <thead>
                                        <tr className={styles.columnNames}>
                                            {mergeCrashResponse.data.map((mergeCrashColumn, columnIndex) => (
                                                <th className={styles.changeColumnName}>
                                                    {mergeCrashColumn.columnName}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mergeCrashResponse.data.map((mergeCrashColumn, columnIndex) => (
                                            <td key={columnIndex} className={styles.td}>
                                                {mergeCrashColumn.data.map((mergeCrashData, dataIndex) => (
                                                    <div key={dataIndex} className={styles.mergeData}>
                                                        <label htmlFor={`check${index}${dataIndex}`} className={styles.dataBox} style={{cursor: 'pointer'}}>
                                                            {columnIndex === 0 && <input type="radio"
                                                                                         name={`first${index}${dataIndex}`}
                                                                                         className={styles.mergeRadio}
                                                                                         id={`check${index}${dataIndex}`}
                                                                                         value={mergeCrashData.target.id}
                                                                                         onChange={(event) => handleRadioChange(event, `${index}${columnIndex}${dataIndex}`)}/>}
                                                            {mergeCrashData.check.data}
                                                        </label>
                                                        <label htmlFor={`target${index}${dataIndex}`} className={styles.dataBox} style={{cursor: 'pointer'}}>
                                                            {columnIndex === 0 && <input type="radio"
                                                                                         name={`first${index}${dataIndex}`}
                                                                                         className={styles.mergeRadio}
                                                                                         id={`target${index}${dataIndex}`}
                                                                                         value={mergeCrashData.check.id}
                                                                                         onChange={(event) => handleRadioChange(event, `${index}${columnIndex}${dataIndex}`)}/>}
                                                            {mergeCrashData.target.data}
                                                        </label>
                                                    </div>
                                                ))}
                                            </td>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}

                    </div>
                    <div className={styles.mergemodalBtnBox}>
                        <button className={styles.modalCancelBtn} onClick={getAllSelectedValues}>병합하기</button>
                        <button className={styles.modalCloseBtn} onClick={handleCreate}>작업 취소</button>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default MergeCrashModalLayout;