import React, { useEffect, useState } from "react";
import styles from '../../styles/styles.module.css'

export default function ChangeDataUI({ data, index }) {
    const [tableData, setTableData] = useState({}); // 초기값을 일반 객체로 설정

    // 첫 번째 맵의 값인 MutableMap<String, List<ChangeData>> 추출하는 함수
    function extractFirstMapValue(data, index) {
        if (!data || typeof data !== 'object') {
            return {};
        }
        const keys = Object.keys(data);
        if (keys.length > 0) {
            return data[keys[index]];
        }
        return {}; // 데이터가 없을 경우 빈 객체 반환
    }

    useEffect(() => {
        const firstMapValue = extractFirstMapValue(data, index);
        setTableData(firstMapValue);
    }, [index]);

    return (
        <div>
            <table>
                <thead>
                <tr className={styles.columnNames}>
                    {tableData && Object.entries(tableData).map(([key, value], index) => (
                        <th className={styles.changeColumnName} key={index}>
                            {key}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {tableData && Object.entries(tableData).map(([key, value], index) => (
                    <td key={index} className={styles.td}>
                        {value.map((item, i) => (
                            <div key={i} className={`${styles.dataBox} ${item.isAddAction == 1 ?  styles.greenBox : styles.redBox}`}>
                                {item.data}
                            </div>
                        ))}
                    </td>
                ))}
                </tbody>
            </table>
        </div>

    );
}
