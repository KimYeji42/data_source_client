import React, { useState } from 'react';
import styles from '../styles.module.css';
import ProjectTeamLayOut from './ProjectTeamLayOut';
import MemberSearchLayOut from './MemberSearchLayOut';
import Profile from '../../../Profile';
import ModalLayOut from './SendModalLayOut';
import ErrorModal from './ErrorModalLayOut';
import profile from "../../../Profile";
import SuccessModalLayout from "./SuccessModalLayout";

export default function CreateProjectFormLayout() {

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [dataBaseName , setDataBaseName] = useState(" ");

    const [teamList, setTeamList] = useState(new Set([profile])); // Set으로 초기화
    const [showMemberGroupSearchBar, setShowMemberGroupSearchBar] = useState(true);
    const [isSendModalOpen , setIsSendModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [error, setError] = useState("");
    const [success , setSuccess] = useState("")
    const toggleMemberGroupSearchBar = () => {
        setShowMemberGroupSearchBar(prevState => !prevState);
    };

    const onNameChange = event => {
        setName(event.target.value);
    };
    const onDataBaseNameChange = event =>{
        setDataBaseName(event.target.value)
    }
    const onCommentChange = event => {
        setComment(event.target.value);
    };

    const addTeamMembers = member => {
        setTeamList(prevTeamList => new Set([...prevTeamList, member])); // Set에 새로운 멤버 추가
    };

    const deleteUserHandler = index => {
        // 해당 인덱스의 멤버를 제외한 새로운 팀 멤버 리스트를 생성
        const newTeamList = new Set([...teamList].filter((_, i) => i !== index));
        setTeamList(newTeamList);
    };

    const modalOpenHandler = () =>{
        setIsSendModalOpen(true)
    }
    const createBtnOnClickHandler = async () => {
        let obj = {
            name: name,
            comment: comment,
            profileID: Profile.id,
            dataBaseName: dataBaseName,
            teamProfile: [...teamList] // Set을 배열로 변환하여 전달
        };

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Data sent successfully:', responseData);
                console.log(responseData.message);
                setSuccess(responseData.message)
                setIsSuccessModalOpen(true)
            } else {
                throw new Error(responseData.message); // 에러를 던져서 catch 블록에서 처리하도록 함
            }
            console.log(obj);
        } catch (error) {
            console.error('Error sending data:', error);
            setError(error.message);
            setIsErrorModalOpen(true);
        }
    };

    return (
        <div>
            <ModalLayOut
                data={"프로젝트를 생성하시겠습니까?"}
                isOpen={isSendModalOpen}
                onClose={() => setIsSendModalOpen(false)}
                onClickEvent={createBtnOnClickHandler}

            />

            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}

            />

            <SuccessModalLayout
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                data={success}
                clickLink={"/projects"}
            />

            {showMemberGroupSearchBar && <MemberSearchLayOut searchTitle={"협업자 검색"} teamMemberAddHandler={addTeamMembers}/>}

            <div>
                <div className={styles.titleGroup}>
                    <div className={`"form-group" ${styles.customFormGroup}`}>
                        <label htmlFor="projectNameForm"><h4 className={styles.formTitle}>프로젝트명</h4></label>
                        <input onChange={onNameChange} type="text" className={`form-control ${styles.inputForm} ${styles.projectNameForm}`} />
                    </div>

                    <div className={`"form-group" ${styles.customFormGroup} ${styles.dataBaseFormGroup}`}>
                        <label htmlFor="projectNameForm"><h4 className={styles.formTitle}>데이터베이스명</h4></label>
                        <input onChange={onDataBaseNameChange} type="text" className={`form-control ${styles.inputForm} ${styles.projectNameForm}`}  />
                    </div>
                </div>
            </div>


            <div className={`"form-group" ${styles.customFormGroup}`}>
                <label htmlFor="inputField2" ><h4 className={styles.formTitle} >설명<small>(선택 사항)</small></h4></label>
                <input onChange={onCommentChange} type="text" className={`form-control ${styles.inputForm}`}  id="inputField2" />
            </div>

            <button type="button" className={` ${styles.addButton}`} onClick={toggleMemberGroupSearchBar}>협업자 추가</button>

            <ProjectTeamLayOut membersData={[...teamList]} deleteUserHandler={deleteUserHandler}/>

            <button type="button" onClick={modalOpenHandler} className={`btn btn-primary ${styles.createButton}` }>프로젝트 생성</button>
        </div>
    );
}
