import styles from "../styles.module.css";
import {Image} from "react-bootstrap";


export default function BoxUI({ header, date, comment, imageSrc, item, setActiveTable, activeTable , starBtnClickHandler , deleteBtnClickHandler }) {

    const handleClick = (item) => {
        setActiveTable(item);
    };

    return(
        <div className={styles.BoxUI}>
            <div className={`${styles.dataBaseBox} ${activeTable === item ? styles.activeBox : ''}`} onClick={() => handleClick(item)}>
                <Image src={imageSrc} alt="Search Database" className={styles.dataBaseBoxImage}/>

                <h3 className={styles.dataBaseBoxTitle}>{header}</h3>

                <div className={`${styles.description} ${styles.scrollbar}`}>
                    <small>{comment}</small>
                </div>

                <div className={styles.dataBaseLogo}>
                    <div className={styles.tableIcon}>
                        {
                            item.isFavorite === 1 ?
                                <Image src={"/image/starOn.png"} onClick={() => starBtnClickHandler(item)}/> :
                                <Image src={"/image/star.png"} onClick={() => starBtnClickHandler(item)}/>
                        }

                        <Image src={"/image/trash.png"} onClick={() => deleteBtnClickHandler(item)}/>
                    </div>
                </div>
                <div className={styles.dataBaseBoxTime}>
                    <h6>{date} 접속</h6>
                </div>

            </div>


        </div>
    )

}