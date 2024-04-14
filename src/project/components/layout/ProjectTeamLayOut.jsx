import styles from "../styles.module.css";
import ProjectTeamUI from "../uI/ProjectTeamUI";

export default function ProjectTeamLayOut ({membersData , deleteUserHandler , currentUser}){
    return(
        <div>
            <div className={`"form-group" ${styles.customFormGroup} `}>
                <label htmlFor="inputField2" ><h4 className={styles.formTitle} >협업자</h4></label>
                <div className={`"form-group" ${styles.memberGroupBox}`}>
                    <ProjectTeamUI membersData={membersData} deleteUserHandler={deleteUserHandler} createEmail={currentUser.email}/>
                </div>
            </div>
        </div>
    )
}