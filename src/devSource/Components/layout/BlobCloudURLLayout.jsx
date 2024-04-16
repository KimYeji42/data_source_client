import styles from "../../styleModule/BlobCloud.module.css";
import stylesRest from "../../styleModule/restAPIBuilder.module.css";
import React, {useState} from "react";

export default function BlobCloudURLLayout({url}){

    const handleCopyClick = (url) => {
        navigator.clipboard.writeText(url); // 클립보드에 URL 복사
    };

    return(
        <div>
            <div className={styles.urlContainer}>
                <div>
                    <button className={stylesRest.copyButton} onClick={() => handleCopyClick(url)}>Copy</button>
                    <h5> This URL</h5>
                    <p>{url ? url : "이미지를 클릭해주세요"}</p>
                    <hr/>
                </div>
            </div>
        </div>
    )
}