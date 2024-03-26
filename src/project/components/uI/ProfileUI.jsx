import styles from '../memberManagementStyle.module.css';
import profileImg from '../../image/profileImage.png';


export default function ProfileUI({img,name,email , onClick}){
    return(
        <div>
            <div className={styles.profile} onClick={onClick}>
                <div className={styles.profileImage}>
                    <img src={img} style={{marginRight:"30px", paddingLeft:"10px"}}/>
                    <img src={profileImg}/>
                </div>
                <div className={styles.text}>
                    <div>{name}</div>
                    <div >{email}</div>
                </div>

            </div>
        </div>
    )

}