import React, {useEffect, useState} from "react";
import TitleUI from "../../../project/components/uI/TitleUI";
import styles from "../../styleModule/BlobCloud.module.css";
import stylesRest from "../../styleModule/restAPIBuilder.module.css";
import BlobCloudURLLayout from "../layout/BlobCloudURLLayout";
import BlobCloudImageLayout from "../layout/BlobCloudImageLayout";
import ErrorModal from "../../../project/components/layout/ErrorModalLayOut";

export default function BlobCloudPage() {
    // 이미지 목록을 관리하는 상태
    const [images, setImages] = useState([]);
    const [profileID , setProfileID] = useState()
    const [url , setUrl] = useState()
    const [isErrorModal , setIsErrorModal] = useState(false)
    const [errorMessage , setErrorMessage] = useState("")

    const fetchProfileData = async () => {
        const token = localStorage.getItem("token")

        if (token == null){
            setErrorMessage("로그인을 진행 해주세요.")
            setIsErrorModal(true)
            return
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/profile/current`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            setProfileID(data.id)
            fetchCloudAllData(data.id)
        } catch (error) {
            console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
            throw error;
        }
    };

    const fetchCloudAllData = async (profileID) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/blob/files/${profileID}`);
            if (!response.ok) {
                throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            setImages(data)
            return data;
        } catch (error) {
            console.error("데이터를 불러오는 중에 오류가 발생했습니다:", error);
            setIsErrorModal(true)
            setErrorMessage(error)
            throw error;
        }
    };

    useEffect(() => {
        fetchProfileData()
    }, []);

    // 파일을 업로드하는 함수
    const fileUpload = (event) => {
        const file = event.target.files[0]; // 첫 번째 파일만 선택
        const maxFileSize = 50 * 1024 * 1024; // 50MB 제한
        if (file.size > maxFileSize) {
            alert("파일 크기가 너무 큽니다. 50MB 이하의 파일을 업로드해주세요.");
            return;
        }
        const allowedExtensions = [".jpg", ".jpeg", ".png", ".mp4"];
        const fileExtension = file.name.slice(file.name.lastIndexOf(".")); // 파일의 확장자 추출
        // 확장자 검사
        if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
            alert("지원되지 않는 파일 형식입니다. .jpg, .jpeg, .png, .mp4 파일만 업로드 가능합니다.");
            return;
        }

        const formData = new FormData();
        const apiUrl = process.env.REACT_APP_API_URL;

        // 선택된 파일을 FormData에 추가
        formData.append("file", file); // "file"은 서버에서 파일을 처리하는 데 사용될 키 이름
        formData.append("profileID",profileID)
        // 서버로 FormData 전송
        fetch(`${apiUrl}/api/blob/upload`, {
            method: "POST",
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    // 응답이 성공하지 않으면 에러를 발생시킴
                    return response.json().then(errorResponse => {
                        throw new Error(errorResponse.message || "파일 업로드에 실패하였습니다.");
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log("파일 업로드 성공:", data);
                setImages(prevImages => [...prevImages, data]); // 이전 데이터를 유지한 채로 새로운 데이터 추가
            })
            .catch(error => {
                console.error("파일 업로드 실패:", error);
                setIsErrorModal(true);
                setErrorMessage(error.message);
            });
    };



    const handleDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className={styles.centerContainer}>
                <div className={stylesRest.toggleContainer}>
                    <label htmlFor="fileUpload">내 파일 선택하기</label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".jpg,.jpeg,.png,.mp4"
                        onChange={fileUpload}
                        multiple
                        className={styles.fileUploadForm}
                    />
                </div>
                <TitleUI title={"[ Media Files ]"} />
            </div>
            {/* 이미지 목록을 전달하여 이미지 레이아웃 컴포넌트 호출 */}
            {images.length > 0 && <BlobCloudImageLayout images={images} onDelete={handleDelete} setUrl={setUrl}/>}
            <BlobCloudURLLayout url={url}/>

            <ErrorModal
                isOpen={isErrorModal}
                error={errorMessage}
                onClose={()=>setIsErrorModal(false)}
            />
        </div>
    );
}
