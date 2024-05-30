import styles from '../memberManagementStyle.module.css';
import profileImg from '../../image/profileImage.png';


export default function ProfileUI({img, name, email, onClick}){
    return(
        <>
            <div className={styles.profile} onClick={onClick}>
                <img src={img} />
                <img src={profileImg} style={{width: "5rem", height: "5rem"}}/>
                <div className={styles.text}>
                    <div>{name}</div>
                    <div>{email}</div>
                </div>

            </div>
        </>
    )

}