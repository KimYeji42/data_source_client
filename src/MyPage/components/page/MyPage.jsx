import styles from "../../styleModule/MypageStyle.module.css";
import Profilelayout from "../layout/Profilelayout";
import Contentslayout from "../layout/Contentslayout";
import {useEffect, useState} from "react";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function MyPage(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    const fetchProjectData = async (token,endpoint) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Token을 Header에 포함
                }
            });
            if (response.ok) {
                const responseData = await response.json();
                const dataArray = Array.isArray(responseData) ? responseData : [responseData];
                setData(dataArray);
                console.log(dataArray);
            } else {
                throw new Error('마이페이지 데이터를 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('마이페이지 가져오는 중 에러 발생:', error);
            setError('마이페이지 데이터를 가져오는데 실패했습니다.');
            setErrorModalOpen(true);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        const endpoint = '/api/auth/collections';
        if (token !== null) {
            fetchProjectData(token, endpoint);
            return;
        }
        setError("로그인 후 진행해주세요!");
        setErrorModalOpen(true);
    }, []);
    return(
        <div>
            <div className={styles.pageContainer}>
                {data && data[0].profileInfo && <Profilelayout profileInfo={data[0].profileInfo} />}
                {data && <Contentslayout data={data}/>}
            </div>
            <ErrorModal
                error={error}
                onClose={() => setErrorModalOpen(false)}
                isOpen={isErrorModalOpen}
            />
        </div>
    )
}