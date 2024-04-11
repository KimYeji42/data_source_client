import styles from "../../styleModule/BlobCloud.module.css";

export default function BlobCloudImageLayout({images , onDelete}){

    const handleDelete = (index) => {
        onDelete(index); // 부모 컴포넌트에서 전달한 삭제 함수 호출
    };

    return(
        <div>
            <div className={styles.imageBoxList}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageBox}>
                        <img src={image.url} alt={image.alt} className={styles.image} />
                        <div className={styles.caption}>{image.caption}</div>
                        <button onClick={() => handleDelete(index)} className={styles.deleteBtn}>DELETE</button>
                    </div>
                ))}
            </div>
        </div>
    )
}