import styles from "../styles.module.css";
import { Image } from "react-bootstrap";

export default function TablesUI({data}) {

    return (
        <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: '230px', width: '380px' }}>
            <ul>
                {data && data.map((member) => (
                    <li key={member.id} style={{ listStyleType: "none" }}>
                        <div className={styles.Table}>
                            <Image src="../image/Database.png" className={styles.TableIcon} />
                            <small className={styles.TableName}>{member.name}</small>
                        </div>
                        <p className={styles.TablesTotal}> 총 테이블 수 : {data.length}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
