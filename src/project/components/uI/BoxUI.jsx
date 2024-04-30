import styles from "../styles.module.css";
import {Image} from "react-bootstrap";
import {useState} from "react";
import SendModalLayOut from "../layout/SendModalLayOut";
import SuccessModalLayout from "../layout/SuccessModalLayout";

export default function BoxUI({ header, date, comment, imageSrc, item, setActiveTable, activeTable }) {
    const [deleteMessage , setDeleteMessage] = useState()
    const [isSendModalOpen , setSendModalOpen] = useState(false)
    const [deleteItem , setDeleteItem] = useState()
    const [successMessage , setSuccessMessage] = useState(false)
    const [successModalOpen , setSuccessModalOpen] = useState()
    const handleClick = (item) => {
        setActiveTable(item);
    };
    const reloadPage = () =>{
        window.location.reload()
    }
    const deleteBtnClickHandler = (item) =>{
        setDeleteItem(item)
        setDeleteMessage(`${item.name} 테이블을 삭제 하시겠습니까?`)
        setSendModalOpen(true)
    }
    const deleteDataSend =  async () => {
        let obj = {
            deleteTableID : deleteItem.id,
            deleteTableName:deleteItem.name
        }
        console.log(obj)
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/api/table/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Data sent successfully:', responseData);
                console.log(responseData.message);
                setSuccessMessage(responseData.message)
                setSuccessModalOpen(true)
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }

    }

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
                        <Image src={"/image/Star.png"}/>
                        <Image src={"/image/trash.png"} onClick={() => deleteBtnClickHandler(item)}/>
                    </div>
                </div>
            </div>
            <div className={styles.dataBaseBoxTime}>
                <h6>{date} 접속</h6>
            </div>

            <SendModalLayOut
                data={deleteMessage}
                onClose={() => setSendModalOpen(false)}
                isOpen={isSendModalOpen}
                onClickEvent={deleteDataSend}
            />
            <SuccessModalLayout
                data={successMessage}
                onClose={() => setSuccessMessage(false)}
                isOpen={successModalOpen}
                onClickEvent={reloadPage}
            />
        </div>
    )

}