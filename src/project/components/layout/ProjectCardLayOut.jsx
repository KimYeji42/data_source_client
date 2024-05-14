import CardUI from "../uI/CardUI";
import styles from "../styles.module.css";
import React, {useEffect, useState} from "react";
import ModalLayOut from "./SendModalLayOut";
export default function ProjectCardLayOut({data} ) {
    const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
    const [isFavoriteOpen , setIsFavoriteOpen] = useState(false);
    const [modalMessage , setModalMessage] = useState("")
    const [item , setItem] = useState({})
    useEffect(() => {

    }, [data]);
    const handleProjectStateUpdate = async (state) =>{
        let obj = {
            state : state,
            project : item
        }
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/project/state`, {
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
                window.location.reload()
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    return (
        <div className={styles.cardLayOutBox}>
            {data && data.length > 0 && data.map((item) => (
                <CardUI
                    item={item}
                    key={item.id}
                    name={item.name}
                    comment={item.comment}
                    projectID={item.id}
                    dataBaseName={item.dataBaseName}
                    setModalMessage = {setModalMessage}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setIsFavoriteOpen={setIsFavoriteOpen}
                    setItem = {setItem}
                />
            ))}

            <ModalLayOut
                data={item.name + `${modalMessage}`}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onClickEvent={() => handleProjectStateUpdate("DELETE")} // 수정된 부분
            />

            <ModalLayOut
                data={item.name + `${modalMessage}` }
                isOpen={isFavoriteOpen}
                onClose={() => setIsFavoriteOpen(false)}
                onClickEvent={() => handleProjectStateUpdate("FAVORITE")} // 수정된 부분
            />

        </div>
    );
}
