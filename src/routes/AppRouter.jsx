import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom'
import {useState, useEffect} from "react";
import MainPage from '../authentication/components/page/MainPage'
import CreateProjectPage from '../project/components/page/CreateProjectPage'
import DataBaseShowCasePage from '../project/components/page/DataBaseShowCasePage'
import ProjectShowCasePage from '../project/components/page/ProjectShowCasePage'
import TemplatePage from '../template/components/page/TemplatePage'
import ErrorPage from "./ErrorPage";
import ProjectViewPage from "../project/components/page/ProjectViewPage";
import TemplateShowCasePage from "../project/components/page/TemplateShowCasePage";
import TablePage from "../devSource/Components/page/TablePage";
import TeamProfilePage from "../project/components/page/TeamProfilePage";
import CommitSearchPage from "../devTree/Components/page/CommitSearchPage";
import HistoryViewPage from "../devTree/Components/page/HistoryViewPage";
import CurrentStatusPage from "../devTree/Components/page/CurrentStatusPage";
import CreateTablePage from "../devSource/Components/page/CreateTablePage";
import RestAPIBuilderPage from "../devSource/Components/page/RestAPIBuilderPage";
import JoinPage from "../authentication/components/page/JoinPage";
import BlobCloudPage from "../devSource/Components/page/BlobCloudPage";
import Header from "../Layout/Header/Header";
import LoginPage from "../authentication/components/page/LoginPage";
import ERDPage from "../ERD/components/page/ERDPage";
import MyPage from "../MyPage/components/page/MyPage";

export default function AppRouter() {
    const [currentUser, setCurrentUser] = useState("")
    const [isLoggedIn , setIsLoggedIn] = useState("")

    const clearLocalStorage = () => {
        localStorage.clear();
        setCurrentUser("")
        setIsLoggedIn("")
    };


    // const checkServerStatus = async () => {
    //     try {
    //         const apiUrl = process.env.REACT_APP_API_URL;
    //         const response = await fetch(`${apiUrl}/api/ping`, {
    //             method: 'GET', // 변경된 부분: GET 요청으로 변경
    //         });
    //         console.log(response);
    //         if (!response.ok) {
    //             clearLocalStorage();
    //             setIsLoggedIn(false)
    //         }
    //     } catch (error) {
    //         clearLocalStorage();
    //         setIsLoggedIn(false)
    //     }
    // };


    const getCurrentUser = () =>{
        const username = localStorage.getItem("username")
        setCurrentUser(username)
        // console.log(currentUser)
    }
    const getTokenUser = () =>{
        const token = localStorage.getItem("token")
        if (token !== null){
            setIsLoggedIn(true)
            getCurrentUser()
        }
    }
    const logoutHandler = () =>{
        setIsLoggedIn(false)
        setCurrentUser("")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("username")
        sessionStorage.removeItem("selectedProjectId")
    }
    useEffect(() => {
        //checkServerStatus()
        getTokenUser()
    }, []);


    return (
        <div className="AppRouter">
            <BrowserRouter>
                <Header
                        currentUser={currentUser}
                        isLoggedIn={isLoggedIn}
                        logoutHandler={logoutHandler}
                />  {/*/Router 사용응 위해 Header가지고오기*/}
                <Routes>
                    {/* 루트 경로에 대한 리디렉션 */}
                    <Route path='/' element={<Navigate to="/main" />} />
                    {/* 각 페이지에 대한 Route 정의 */}
                    <Route path='/main' element={<MainPage />} />
                    <Route path='/createProject' element={<CreateProjectPage />} />
                    <Route path='/tables/:dataBaseID' element={<DataBaseShowCasePage />} />
                    <Route path='/projects' element={<ProjectShowCasePage />} />
                    <Route path='/template/:tableID' element={<TemplatePage />} />
                    <Route path='/projects/ProjectView' element={<ProjectViewPage />} />
                    <Route path='/templates' element={<TemplateShowCasePage />} />
                    <Route path='/template' element={<TemplatePage />} />\
                    <Route path='/project/:projectId' element={<ProjectViewPage />} />
                    <Route path='/table/:tableID' element={<TablePage />} />
                    <Route path='/project/teamProfile/:projectId' element={<TeamProfilePage />} />
                    <Route path='/commit' element={<CommitSearchPage />} />
                    <Route path='/history' element={<HistoryViewPage />} />
                    <Route path='/status' element={<CurrentStatusPage />} />
                    <Route path='/createTable/:dataBaseID' element={<CreateTablePage/>}/>
                    <Route path='/apiBuilder/:tableID' element={<RestAPIBuilderPage/>}/>
                    <Route path='/blob/Cloud' element={<BlobCloudPage/>}/>
                    <Route path='/erd' element={<ERDPage/>}/>
                    <Route path='/auth/join' element={<JoinPage/>}/>
                    <Route path='/auth/login' element={<LoginPage/>}/>
                    <Route path='/mypage' element={<MyPage/>}/>

                    {/* 일치하는 경로가 없을 때의 에러 페이지 */}
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
