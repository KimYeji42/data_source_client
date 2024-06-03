import styles from "../../styleModule/MypageStyle.module.css";
import ProfilePhoto from "../ui/ProfilePhoto";
import UserName from "../ui/UserName";
import UserInformation from "../ui/UserInformation";

export default function ProfileLayout({ profileInfo }){

    if (!profileInfo) return null;

    return(
        <div className={styles.profileContainer}>
            <ProfilePhoto/>
            <UserName Name={profileInfo.name}/>
            <UserInformation title="이름" value={profileInfo.name}/>
            <UserInformation title="이메일" value={profileInfo.email}/>
            <UserInformation title="전화번호" value={profileInfo.phoneNumber}/>
        </div>
    )
}