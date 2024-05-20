import styles from "../styles.module.css";
import { Image } from "react-bootstrap";

export default function ProjectTeamUI({ membersData, deleteUserHandler, createEmail }) {

    return (
        membersData.map((user, index) => (
            <div key={index} className={styles.member}>
                {user.email === createEmail ? (
                    <button disabled className={styles.customButton}> </button>
                ) : (
                    <button onClick={() => deleteUserHandler(index)} className={styles.customButton}> </button>
                )}
                <Image className={styles.ProjectTeamUiImg} src={"image/user.png"} />
                <div className={styles.memberInformation}>
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                </div>
            </div>
        ))
    )
}
