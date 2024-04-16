import styles from '../../styleModule/createTableStyle.module.css';
import searchIcon from '../..//Image/glass.png';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


export default function TableSearchLayout({ handleJoinTableSelect, setShowSearch }) {
    const {dataBaseID} = useParams()
    const [joinTableData , setJoinTableData] = useState(null)
    const fetchJoinData = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/table/join/${dataBaseID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData)
            setJoinTableData(responseData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchJoinData()
    }, [dataBaseID]);

    const handleRowClick = (item) => {
        handleJoinTableSelect(item);
        setShowSearch(false);
    };

    const handleCancelClick = () => {
        handleRowClick(null); // 빈 값(null)으로 설정
    };

    return (
        <div>
            <div className={styles.searchContainer}>
                <div className={styles.searchTitle}>
                    조인할 테이블 PK 검색
                </div>
                <div className={styles.searchName}>
                    <img src={searchIcon} alt="Search Icon" style={{ width: '25px', height: '25px' }} />
                    <input type="text" placeholder="테이블명 또는 컬럼명을 검색하세요." className={styles.sn} />
                </div>
                <div className={styles.attribute}>

                    <div className={styles.listBox}>
                        <div onClick={handleCancelClick}>
                            <p className={styles.cancelBtn}>Cancel</p>
                        </div>
                        {joinTableData && joinTableData.map((item, index) => (
                            <div key={item.id} onClick={() => handleRowClick(item)}>
                                <div>
                                    <p className={styles.joinData}>{item.tableName}/{item.pkColumnName}/{item.joinColumnDataType}</p>
                                </div>
                                {index !== joinTableData.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

