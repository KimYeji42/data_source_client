import styles from '../memberManagementStyle.module.css';
import img from '../../image/memberSearch.png';

export default function SearchUserNameUI() {
    return(
        <>
            <div className={styles.searchBox}>
                <div className={styles.box}>
                    <input className={styles.search} type="text" placeholder="검색할 사용자 이름을 입력하세요."/>
                    <div className={styles.glass}>
                        <img src={img} style={{width:"2rem"}}/>
                    </div>
                </div>
            </div>
        </>
    )
}