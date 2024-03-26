import React, { useState } from 'react';
import styles from '../styles.module.css';
import ProjectTeamLayOut from './ProjectTeamLayOut';
import MemberSearchLayOut from './MemberSearchLayOut';
import Profile from '../../../Profile';
import ModalLayOut from './ModalLayOut';
import ErrorModal from './ErrorModalLayOut';
import profile from "../../../Profile";
import TablePage from "../../../devSource/Components/page/TablePage";

export default function CreateProjectFormLayout() {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [dataBaseName , setDataBaseName] = useState(" ");

    const [teamList, setTeamList] = useState(new Set([profile])); // Set으로 초기화
    const [showMemberGroupSearchBar, setShowMemberGroupSearchBar] = useState(true);
    const [data, setData] = useState("");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const [error, setError] = useState("");

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

    const modalBtnOnClickHandler = () => {
        setIsSuccessModalOpen(false);
        setIsErrorModalOpen(false);
    };

    const createBtnOnClickHandler = async () => {
        let obj = {
            name: name,
            comment: comment,
            profileID: Profile.id,
            dataBaseName : dataBaseName,
            teamProfile: [...teamList] // Set을 배열로 변환하여 전달
        };

        try {
            const response = await fetch('http://localhost:8080/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });
            if (response.ok) {
                const responseData = await response.text();
                console.log('Data sent successfully:', responseData);
                console.log(responseData)
                setData(responseData);
                setIsSuccessModalOpen(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message);
                setIsErrorModalOpen(true);
            }
            console.log(obj)
        } catch (error) {
            console.error('Error sending data:', error);
            setError('네트워크 오류로 요청을 보낼 수 없습니다.');
            setIsErrorModalOpen(true);
        }
    };

    const handleCreate = () => {
        setIsSuccessModalOpen(false);
    };


    const redirectToProjects = () => {
        // history.push('/projects'); // projects 페이지로 이동
        console.log("클릭")
    };

    return (
        <div>
            <ModalLayOut
                data={data}
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                onCreate={handleCreate}
                onReset={modalBtnOnClickHandler}
                onClick = {redirectToProjects}
                clickLink={"/projects"}
            />

            <ErrorModal
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}
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

            <button type="button" onClick={createBtnOnClickHandler} className={`btn btn-primary ${styles.createButton}` }>프로젝트 생성</button>
        </div>
    );
}
