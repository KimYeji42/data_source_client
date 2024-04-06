import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import CreateTablePage from "../devSource/Components/page/CreateTablePage";
import RestAPIBuilderPage from "../devSource/Components/page/RestAPIBuilderPage";


export default function AppRouter() {
    return (
        <div className="AppRouter">
            {/* 매핑 */}
            <BrowserRouter>
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
                    <Route path='/createTable/:dataBaseID' element={<CreateTablePage/>}/>
                    <Route path='/apiBuilder/:tableID' element={<RestAPIBuilderPage/>}/>
                    {/* 일치하는 경로가 없을 때의 에러 페이지 */}
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
