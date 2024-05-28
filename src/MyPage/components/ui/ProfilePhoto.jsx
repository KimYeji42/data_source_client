import styles from "../../styleModule/MypageStyle.module.css";
import {Image} from "react-bootstrap";

export default function ProfilePhoto(){
    return(
        <div className={styles.ProfilePhotoTool}>
            <Image src={"/image/pngwing.com.png"} className={styles.ProfilePhoto}/>
        </div>
    )
}