import {Image} from "react-bootstrap";
import styles from "../styles.module.css";
import {Link} from "react-router-dom";

export default function CardUI({ name , comment , projectID ,dataBaseName}){
    return(
        <div className={styles.cardBox}>
            <div className={styles.cardLogo}>
                <Image src={"image/webSite.png"}/>
                <div className={styles.cardIcon}>
                    <Image src={"image/star.png"}/><Image src={"image/trash.png"}/>
                </div>
            </div>
            <h3 className={styles.cardTitle}>{name}</h3>
            <p className={styles.cardComment}>{comment}</p>
            <p className={styles.creatDBName}><Image src={"/image/dataBase.png"} width={'30px'}/> {dataBaseName}</p>
            <Link to={`/project/${projectID}`} className={styles.cardLink}>이동하기</Link>
        </div>
    )
}