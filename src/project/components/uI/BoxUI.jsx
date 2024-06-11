import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
import {useEffect, useState} from "react";


export default function BoxUI({ header, date, comment, imageSrc, item, setActiveTable, activeTable , starBtnClickHandler , deleteBtnClickHandler }) {
    const [isActiveItem , setIsActiveItem] = useState(false)

    const handleClick = (item) => {
        setActiveTable(item);
    };

    useEffect(() => {
        if (activeTable === item) {
            setIsActiveItem(true)
            sessionStorage.removeItem("newTableAction");
        } else {
            setIsActiveItem(false)
        }
    }, [activeTable]);

    return(
        <div className={styles.BoxUI}>
            <div className={`${styles.dataBaseBox} ${isActiveItem ? styles.activeBox : ''}`} onClick={() => handleClick(item)}>
                <Image src={imageSrc} alt="Search Database" className={styles.dataBaseBoxImage}/>

                <h3 className={styles.dataBaseBoxTitle}>{header}</h3>

                <div className={`${styles.description} ${styles.scrollbar}`}>
                    <small>{comment}</small>
                </div>

                <div className={styles.dataBaseLogo}>
                    <div className={styles.tableIcon}>
                        {
                            item.isFavorite === 1 ?
                                <Image height={20} width={20} src={"/image/starOn.png"} onClick={() => starBtnClickHandler(item)}/> :
                                <Image height={20} width={20} src={"/image/star.png"} onClick={() => starBtnClickHandler(item)}/>
                        } &nbsp;
                        <Image height={20} width={20} src={"/image/trash.png"} onClick={() => deleteBtnClickHandler(item)}/>
                    </div>
                </div>
                <div className={styles.dataBaseBoxTime}>
                    <h6>{date} 접속</h6>
                </div>

            </div>


        </div>
    )

}