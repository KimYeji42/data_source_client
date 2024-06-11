import React from "react";
import styles from "../../styles/styles.module.css";
import {useState, useEffect} from "react";

// 충돌 해결 컴포넌트
const MergeCrashModalLayout =({crashData, isOpen, onClose, setCrashRequest}) => {
    const [targetValues, setTargetValues] = useState([]);
    const [checkValues, setCheckValues] = useState([]);

    useEffect(() => {
        setTargetValues([]);
        setCheckValues([]);
    }, [crashData]);

    if (!isOpen) return null;

    const handleCreate = () => {
        onClose(); // 모달을 닫음
    };

    // 라디오 버튼 선택 상태를 업데이트하는 함수
    const handleRadioChange = async(event, index) => {
        const { value } = event.target;
        const intIndex = parseInt(index)

        const isTargetValue = value.startsWith("target-");

        setCheckValues(prevCheckValues => {
            const updatedCheckValues = [...prevCheckValues];
            updatedCheckValues[intIndex] = isTargetValue ? undefined : value;
            return updatedCheckValues;
        });

        setTargetValues(prevTargetValues => {
            const updatedTargetValues = [...prevTargetValues];
            updatedTargetValues[intIndex] = isTargetValue ? value.substring(7) : undefined;
            return updatedTargetValues;
        });
    };

    // 모든 선택된 값들을 가져오는 함수
    const getAllSelectedValues = () => {
        let count = 0;
        const selectedTargetVal = targetValues.filter(value => value !== undefined)
        const selectedCheckVal = checkValues.filter(value => value !== undefined)

        const selectValLength = selectedTargetVal.length + selectedCheckVal.length

        crashData.forEach(mergeCrashResponse => {
            mergeCrashResponse.data.slice(0, 1).forEach(mergeCrashColumn => {
                mergeCrashColumn.data.forEach(mergeCrashData => {
                    if (mergeCrashData) {
                        count++;
                    }
                });
            });
        });
        if (selectValLength !== count) {
            alert("사용할 행을 모두 선택해주세요.")
        } else {
            setCrashRequest(selectedTargetVal, selectedCheckVal);
        }
    };

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.mergeModal}>
                    <p className={styles.mergeGuideTxt}>병합하려는 커밋과 현재 커밋의 테이블에 <span className={styles.mergeGuideTxtBold}>충돌하는 PK</span>가 존재합니다.<br/>사용할 데이터를 선택한 후 다시 시도해 주세요.</p>
                    <p className={styles.mergeGuideTxt2}>※ 사용할 데이터를 선택해주세요. (↑ 체크아웃 데이터, ↓ 선택분기 데이터)</p>
                    <div className={`${styles.madalLayout} ${styles.scrollbar}`}>
                        {crashData && crashData.map((mergeCrashResponse, index) => (
                            <div key={index}>
                                <h4 className={styles.tableName}>{mergeCrashResponse.tableName}</h4>
                                <table key={index} className={styles.mergeTable}>
                                    <thead>
                                        <tr className={styles.columnNames}>
                                            {mergeCrashResponse.data.map((mergeCrashColumn, columnIndex) => (
                                                <th key={columnIndex} className={styles.changeColumnName} style={{background:'#4EBFFF'}}>
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
                                                                                         value={`target-${mergeCrashData.target.id}`}
                                                                                         onChange={(event) => handleRadioChange(event, `${index}${columnIndex}${dataIndex}`)}/>
                                                            }
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
                        <button className={styles.modalCheckBtn} onClick={getAllSelectedValues}>병합하기</button>
                        <button className={styles.modalCloseBtn} onClick={handleCreate}>작업 취소</button>
                    </div>
                </div>

            </div>
        </>
    );

}

export default MergeCrashModalLayout;