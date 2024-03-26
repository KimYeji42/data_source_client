import styles from "../styles.module.css";
import React from "react";
import ProjectTeamUI from "../uI/ProjectTeamUI";

export default function ProjectTeamLayOut ({membersData , deleteUserHandler}){
    return(
        <div>
            <div className={`"form-group" ${styles.customFormGroup} `}>
                <label htmlFor="inputField2" ><h4 className={styles.formTitle} >협업자</h4></label>
                <div className={`"form-group" ${styles.memberGroupBox}`}>
                    <ProjectTeamUI membersData={membersData} deleteUserHandler={deleteUserHandler}/>
                </div>
            </div>
        </div>
    )
}