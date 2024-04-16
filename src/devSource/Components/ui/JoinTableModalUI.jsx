import styles from '../../styleModule/joinTableModal.module.css';
import { useEffect, useState } from "react";

export default function JoinTableModalUI({ tableID, column, setJoinData }) {
    const [data, setData] = useState([]);

    const handleClick = (item) => {
        setJoinData(item);
    };

    const fetchJoinTable = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/table/joinData/${column}/${tableID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setData(responseData);
            } else {
                throw new Error('프로젝트 데이터를 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('데이터 가져오는 중 에러 발생:', error);
        }
    };

    useEffect( () => {
        fetchJoinTable()
    }, [column]); // tableID가 변경될 때마다 실행

    return (
        <div className={styles.listContainer}>
            {data && data.map((item, index) => (
                <div key={index} className={styles.listItem} onClick={() => handleClick(item)}>
                    <small> ( {item.id} ) </small>
                    <small>{item.customString}</small>
                </div>
            ))}
        </div>
    );
}
