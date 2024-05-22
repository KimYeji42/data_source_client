import styles from "../../styleModule/BlobCloud.module.css";

export default function BlobCloudImageLayout({ images, onDelete, setUrl }) {

    const deleteCloudData = async (item, index) => {
        const apiUrl = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${apiUrl}/api/blob/files/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });
            if (!response.ok) {
                throw new Error("서버에서 데이터를 삭제하는 데 실패했습니다.");
            }
            onDelete(index); // 부모 컴포넌트에서 전달한 삭제 함수 호출
            return response.json();
        } catch (error) {
            console.error("데이터를 삭제하는 중에 오류가 발생했습니다:", error);
            throw error;
        }
    };

    const handleDelete = async (item, index) => {
        await deleteCloudData(item, index);
    };

    const handleSetUrl = (item) => {
        setUrl(item.url);
    };

    return (
        <div>
            <div className={styles.imageBoxList}>
                {images.map((item, index) => (
                    <div key={index} className={styles.imageBox} onClick={() => handleSetUrl(item)}>
                        {item.url.endsWith('.mp4') ? (
                            <video width="320" height="240" controls>
                                <source src={item.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={item.url} alt={item.alt} className={styles.image} />
                        )}
                        <div className={styles.caption}>{item.caption}</div>
                        <button onClick={() => handleDelete(item, index)} className={styles.deleteBtn}>DELETE</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
