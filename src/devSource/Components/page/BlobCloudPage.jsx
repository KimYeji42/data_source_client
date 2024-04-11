import React, { useState } from "react";
import TitleUI from "../../../project/components/uI/TitleUI";
import styles from "../../styleModule/BlobCloud.module.css";
import stylesRest from "../../styleModule/restAPIBuilder.module.css";
import BlobCloudURLLayout from "../layout/BlobCloudURLLayout";
import BlobCloudImageLayout from "../layout/BlobCloudImageLayout";

export default function BlobCloudPage() {
    // 이미지 목록을 관리하는 상태
    const [images, setImages] = useState([]);

    // 파일을 업로드하는 함수
    const fileUpload = (event) => {
        const file = event.target.files[0]; // 첫 번째 파일만 선택
        const formData = new FormData();

        // 선택된 파일을 FormData에 추가
        formData.append("file", file); // "file"은 서버에서 파일을 처리하는 데 사용될 키 이름

        // 서버로 FormData 전송
        fetch("http://localhost:8080/api/blob/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("파일 업로드 성공:", data);
                setImages(data); //업로드 성공시 반환해준 이미지 업로드
            })
            .catch((error) => {
                console.error("파일 업로드 실패:", error);
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
                        accept="image/*"
                        onChange={fileUpload}
                        multiple
                        className={styles.fileUploadForm}
                    />
                </div>
                <TitleUI title={"[ Photo Cloud ]"} />
            </div>
            {/* 이미지 목록을 전달하여 이미지 레이아웃 컴포넌트 호출 */}
            <BlobCloudImageLayout images={images} onDelete={handleDelete}/>
            <BlobCloudURLLayout />
        </div>
    );
}
