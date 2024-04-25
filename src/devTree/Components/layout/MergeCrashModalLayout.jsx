import React from "react";
import styles from "../../styles/styles.module.css";
import {useState, useEffect} from "react";

const MergeCrashModalLayout =({crashData, isOpen, onClose, setCrashRequest}) => {
    const [targetValues, setTargetValues] = useState([]);
    const [checkValues, setCheckValues] = useState([]);

    useEffect(() => {
        setTargetValues([]);
        setCheckValues([]);
        console.log("충돌 해결 시작:" + crashData)
    }, [crashData]);

    useEffect(() => {
        console.log("targetValues:", targetValues.filter(value => value !== undefined));
        console.log("checkValues:", checkValues.filter(value => value !== undefined));
    }, [targetValues, checkValues]);

    if (!isOpen) return null;

    const handleCreate = () => {
        onClose(); // 모달을 닫음
    };

    // 라디오 버튼 선택 상태를 업데이트하는 함수
    const handleRadioChange = async(event, index) => {
        const { value } = event.target;
        const intIndex = parseInt(index)

        const isTargetValue = value.startsWith("target-");
        console.log(isTargetValue)

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

        console.log("selectedTargetVal" + selectedTargetVal)
        console.log("selectedCheckVal" + selectedCheckVal)

        crashData.forEach(mergeCrashResponse => {
            mergeCrashResponse.data.slice(0, 1).forEach(mergeCrashColumn => {
                mergeCrashColumn.data.forEach(mergeCrashData => {
                    if (mergeCrashData) {
                        count++;
                    }
                });
            });
        });

        console.log("선택 라디오, 리스트 값" + selectValLength, count)
        if (selectValLength !== count) {
            alert("사용할 행을 모두 선택해주세요.")
        } else {
            setCrashRequest(selectedTargetVal, selectedCheckVal);
        }
    };

    return (
        <div>
            <div className={styles.modalOverlay}>
                <div className={styles.mergemodal}>
                    <p className={styles.mergeGuideTxt}>병합하려는 커밋과 현재 커밋의 테이블에 <span className={styles.mergeGuideTxtBold}>충돌하는 PK</span>가 존재합니다.<br/>사용할 데이터를 선택한 후 다시 시도해 주세요.</p>
                    <p>※ 기존 데이터를 그대로 사용할지, 선택한 분기의 변경 사항 데이터를 사용할지 선택해주세요.</p>
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
                        <button className={styles.modalCancelBtn} onClick={getAllSelectedValues}>병합하기</button>
                        <button className={styles.modalCloseBtn} onClick={handleCreate}>작업 취소</button>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default MergeCrashModalLayout;