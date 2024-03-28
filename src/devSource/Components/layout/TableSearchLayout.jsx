import styles from '../../styleModule/createTableStyle.module.css';
import searchIcon from '../..//Image/glass.png';
import TableData from "../data/TableData";


export default function TableSearchLayout({ handleJoinTableSelect, setShowSearch }) {
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
                        {TableData.map((item, index) => (
                            <div key={item.id} onClick={() => handleRowClick(item)}>
                                <div>
                                    <p className={styles.joinData}>{item.tableName}/{item.pkName}/{item.type}</p>
                                </div>
                                {index !== TableData.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

