import {Image} from "react-bootstrap";
import styles from "../styles.module.css";
import {Link} from "react-router-dom";

export default function CardUI({ name , comment , projectID ,dataBaseName , item , setModalMessage , setIsDeleteModalOpen , setIsFavoriteOpen , setItem}){

    const deleteIconClickHandler = () =>{
        setItem(item)
        setModalMessage("을 삭제 하시겠습니까?")
        setIsDeleteModalOpen(true)
    }

    const favoriteIconClickHandler = (status) => {
        setItem(item)
        const message = status === 1
            ? "을 즐겨찾기를 취소하시겠습니까?"
            : "을 즐겨 찾기 하시겠습니까?";
        setModalMessage(message);

        setIsFavoriteOpen(true);
    }

    return(
        <div className={styles.cardBox}>
            <div className={styles.cardLogo}>
                <div className={styles.projectInfoContainer}>
                    <h3 className={styles.cardTitle}>[ {name} ]</h3>
                    <p className={styles.cardComment}><small className={styles.strong}>Comment:</small> {comment}</p>
                    <p className={styles.creatDBName}><small className={styles.strong}>DB Name:</small> {dataBaseName}</p>
                </div>
                <div className={styles.cardIcon}>
                    <div>
                        {/* 즐겨찾기 아이콘 */}
                        <Image
                            src={item.isFavorite === 1 ? "image/starOn.png" : "image/star.png"}
                            onClick={() => favoriteIconClickHandler(item.isFavorite)}
                        /> <nbsp/>
                        {/* 삭제 아이콘 */}
                        <Image src="image/trash.png" onClick={deleteIconClickHandler} />
                    </div>
                    <div className={styles.linkContainer}>
                        <Link to={`/project/${projectID}`} className={styles.cardLink}>이동하기</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}