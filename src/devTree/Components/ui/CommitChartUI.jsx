import React, { useState, useEffect } from "react";
import styles from "../../styles/styles.module.css";

export default function CommitChartUI(){
    const [selectedRowIndex, setSelectedRowIndex] = useState(0); // 초기 값으로 첫 번째 행 선택
    const [doubleClickRowIndex, setDoubleClickRowIndex] = useState(0); // 초기 값으로 첫 번째 행 선택

    // 임시 데이터
    const ExampleData = [
        {
            msg:'이것은 커밋 메세지 1 입니다.',
            date:'2024-03-02',
            name:'박정우'
        },
        {
            msg:'이것은 커밋 메세지 2 입니다.',
            date:'2024-03-06',
            name:'박지훈'
        },
        {
            msg:'이것은 커밋 메세지 3 입니다.',
            date:'2024-03-09',
            name:'김예지'
        },
        {
            msg:'이것은 커밋 메세지 4 입니다.',
            date:'2024-03-12',
            name:'윤재혁'
        },
        {
            msg:'이것은 커밋 메세지 5 입니다.',
            date:'2024-03-13',
            name:'윤재혁'
        },
        {
            msg:'이것은 커밋 메세지 6 입니다.',
            date:'2024-03-14',
            name:'윤재혁'
        },
        {
            msg:'이것은 커밋 메세지 7 입니다.',
            date:'2024-03-15',
            name:'김예지'
        },
        {
            msg:'이것은 커밋 메세지 8 입니다.',
            date:'2024-03-16',
            name:'박지훈'
        },
        {
            msg:'이것은 커밋 메세지 9 입니다.',
            date:'2024-03-17',
            name:'박지훈'
        },
        {
            msg:'이것은 커밋 메세지 10 입니다.',
            date:'2024-03-18',
            name:'윤재혁'
        },
        {
            msg:'이것은 커밋 메세지 11 입니다.',
            date:'2024-03-19',
            name:'김예지'
        },
        {
            msg:'이것은 커밋 메세지 12 입니다.',
            date:'2024-03-20',
            name:'김예지'
        },
        {
            msg:'이것은 커밋 메세지 13 입니다.',
            date:'2024-03-22',
            name:'박정우'
        },
        {
            msg:'이것은 커밋 메세지 14 입니다.',
            date:'2024-03-26',
            name:'박지훈'
        }

    ]
    const handleRowClick = (index) => {
        setSelectedRowIndex(index);
    };

    const handleRowDoubleClick = (index) => {
        setDoubleClickRowIndex(index);
    };

    return(
        <>
            <div className={styles.CommitChartBack}>
                <table className={styles.CommitChart}>
                    <thead>
                    <tr className={styles.CommitChartTitle}>
                        <th scope="col" className={styles.CommitChartTitleNow}>현재<br/>커밋</th>
                        <th scope="col" className={styles.CommitChartTitleMsg}>커밋 메세지</th>
                        <th scope="col" className={styles.CommitChartTitleDate}>날짜</th>
                        <th scope="col" className={styles.CommitChartTitleWriter}>작성자</th>
                        <th scope="col" className={styles.CommitChartTitleNum}>해시값</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ExampleData.map((data, index) => (
                        <tr key={index}
                            className={
                                index == selectedRowIndex
                                    ? styles.CommitChartContentActive
                                    : styles.CommitChartContent
                            }
                            onClick={() => handleRowClick(index)}
                            onDoubleClick={() => handleRowDoubleClick(index)}
                        >
                            <td>{index === doubleClickRowIndex ? '●' : ''}</td>
                            <td>{data.msg}</td>
                            <td>{data.date}</td>
                            <td>{data.name}</td>
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}