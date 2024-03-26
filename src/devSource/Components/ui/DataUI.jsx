import React, { useEffect, useState } from "react";
import styles from "../../styleModule/ColumnStyle.module.css";
import NewDataUI from "./NewDataUI";

export default function DataUI({
                                   column, newDataCount, selectedRowIndex, onRowClick, deleteRow ,
                                   tableMap , updateData , setUpdateData ,createData , setCreateData,
                                })
{
    const [data, setData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1); // 편집중인 데이터 인덱스

    function columnDataSet(){
        setData(tableMap.get(column))
        // console.log(data)
    }

    useEffect(() => {
        columnDataSet();
    }, []);


    // 행을 클릭할 때 실행되는 함수
    const handleClick = (index) => {
        setEditingIndex(index); // 행을 더블 클릭하여 입력창으로 변경
    };

    const handleInputBlur = (event, index, item) => {
        setEditingIndex(-1);
        const updatedChangeData = [...updateData]; // 기존의 updateData

        const dataIndex = updateData.findIndex(data => data.id === item.id);

        // 만약 해당 아이템이 updateData 배열에 존재하지 않는다면
        if (dataIndex === -1) {
            updatedChangeData.push(item); // 새로운 아이템을 추가
        }
        setUpdateData(updatedChangeData); // 업데이트된 데이터를 설정
    };

    const consoleAllData = () => {
        createData.forEach((item, index) => {
            console.log(item);
        });
    };


    const handleInputChange = (event, index,item) => {
        const newData = [...data];
        newData[index].data = event.target.value;
        setData(newData); // 변경된 데이터 업데이트
    };

    // 새로운 데이터 추가 시 호출되는 함수
    const handleAddData = (newData) => {
        setData([...data, { id: data.length + 1, data: newData }]);
    };

    return (
        <div>
            <table>
                <tbody>
                {/* 데이터 출력 */}
                {data.map((item, index) => (
                    <tr
                        key={index}
                        onDoubleClick={() => handleClick(index)} // 행 더블 클릭 시 핸들러 호출
                        onClick={() => onRowClick(index)}
                        style={{
                            backgroundColor: index === selectedRowIndex ? 'rgba(227, 233, 246, 0.7)' :
                            deleteRow.includes(index) ? ' rgba(255, 143, 143, 0.61)' : 'transparent'
                        }} // 선택된 행 또는 삭제된 행에 따라 색상 변경
                    >
                        <td>
                            {editingIndex === index ? (
                                <input
                                    className={styles.input}
                                    type="text"
                                    defaultValue={item.data || ''}
                                    onBlur={(event) => handleInputBlur(event, index, item)} // 입력창을 떠날 때 호출
                                    onChange={(event) => handleInputChange(event, index,item)} // 입력값이 변경되면 핸들러 호출
                                />
                            ) : (
                                <span>{item.data || " NULL "}</span>
                            )}
                        </td>
                    </tr>
                ))}

                {/* 새로운 데이터 입력 부분 */}
                {[...Array(newDataCount)].map((_, index) => (
                    <NewDataUI
                        key={index}
                        onAddData={handleAddData}
                        createData={createData}
                        setCreateData={setCreateData}
                        column={column}
                        dataLine={index} // 줄의 인덱스를 전달
                    />
                ))}

                </tbody>
            </table>
        </div>
    );
}
