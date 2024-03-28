import {Image} from "react-bootstrap";
import styles from "../styles.module.css";
import {Link} from "react-router-dom";
import ModalLayOut from "../layout/SendModalLayOut";
import React, {useState} from "react";
import Profile from "../../../Profile";

export default function CardUI({ name , comment , projectID ,dataBaseName , item}){
    const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
    const [isFavoriteOpen , setIsFavoriteOpen] = useState(false);

    const deleteIconClickHandler = () =>{
        setIsDeleteModalOpen(true)
    }
    const favoriteIconClickHandler = () => {
        setIsFavoriteOpen(true)
    }

    const handleProjectStateUpdate = async (state) =>{
        let obj = {
            state : state,
            project : item
        }
        try {
            const response = await fetch('http://localhost:8080/api/project/state', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            console.log(obj);

            const responseData = await response.json();
            if (response.ok) {
                console.log('Data sent successfully:', responseData);
                console.log(responseData.message);
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    return(
        <div className={styles.cardBox}>
            <div className={styles.cardLogo}>
                <Image src={"image/webSite.png"}/>
                <div className={styles.cardIcon}>
                    {item.isFavorite === 1 ? (
                        <Image src={"image/starOn.png"} onClick={favoriteIconClickHandler}/>
                    ) : (
                        <Image src={"image/star.png"} onClick={favoriteIconClickHandler}/>
                    )}
                    <Image src={"image/trash.png"} onClick={deleteIconClickHandler}/>
                </div>
            </div>
            <h3 className={styles.cardTitle}>{name}</h3>
            <p className={styles.cardComment}>{comment}</p>
            <p className={styles.creatDBName}><Image src={"/image/dataBase.png"} width={'30px'}/> {dataBaseName}</p>
            <Link to={`/project/${projectID}`} className={styles.cardLink}>이동하기</Link>

            <ModalLayOut
                data={name + "을 삭제하시겠습니까?"}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onClickEvent={() => handleProjectStateUpdate("DELETE")} // 수정된 부분
                clickLink={"/projects"}
            />

            <ModalLayOut
                data={name + "을 즐겨찾기 하시겠습니까?"}
                isOpen={isFavoriteOpen}
                onClose={() => setIsFavoriteOpen(false)}
                onClickEvent={() => handleProjectStateUpdate("FAVORITE")} // 수정된 부분
                clickLink={"/projects"}
            />

        </div>
    )
}