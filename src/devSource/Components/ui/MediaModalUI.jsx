import {Image} from "react-bootstrap";
import styles from "../../styleModule/Media.module.css"
import {useEffect, useState} from "react";
export default function MediaModalUI({setMediaOpen , handleMediaSelect}){
    const [userMediaFiles , setUserMediaFiles] = useState(null)
    const fetchUserMediaFiles = async (token) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/blob/medias`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token을 Header에 포함
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                setUserMediaFiles(responseData)
                console.log(userMediaFiles)
            } else {
                throw new Error('이미지 데이터를 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('이미지 가져오는 중 에러 발생:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchUserMediaFiles(token)
    }, []);


    return(
            <div>
                <div className={styles.mediaContainer}>
                        <button className={styles.cancelBtn} onClick={() => setMediaOpen(false)}>닫기</button>
                    {userMediaFiles && userMediaFiles.map((media, index) => (
                        <div key={index} className={styles.mediaInfo} onClick={() =>handleMediaSelect(media)}>
                            <Image className={styles.mediaImage} src={media.url} width={100} />
                            <div className={styles.mediaComment}>{media.url}</div>
                        </div>
                    ))}
                </div>
            </div>
    )
}