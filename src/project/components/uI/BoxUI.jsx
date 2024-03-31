import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
export default function BoxUI({ header, date, comment, imageSrc, item, setActiveTable, activeTable }) {
    const handleClick = (item) => {
        setActiveTable(item);
    };

    return(
        <div>
            <div className={`${styles.dataBaseBox} ${activeTable === item ? styles.activeBox : ''}`} onClick={() => handleClick(item)}>
                <h3 className={styles.dataBaseBoxTitle}>{header}</h3>
                <Image src={imageSrc} alt="Search Database" className={styles.dataBaseBoxImage}/>

                <div className={styles.description}>
                    <small>{comment}</small>
                </div>

                <div className={styles.dataBaseLogo}>
                    <div className={styles.cardIcon}>
                        <Image src={"/image/Star.png"}/><Image src={"/image/trash.png"}/>
                    </div>
                </div>
            </div>
            <div className={styles.dataBaseBoxTime}>
                <h6>{date} 접속</h6>
            </div>
        </div>

    )
}