import { Route, Routes, useNavigate, useRoutes } from "react-router-dom"
import "./App.scss"
import Sidebar from "./layout/sidebar.jsx"
import Home from "./Pages/Home/Home.js"
import Login from "./Pages/Login/Login.js"
import DocDetail from "./Pages/DocDetail/DocDetail.js"
import Document from "./Pages/Document/Document.js"
import IndexFragment from "./component/IndexFragment.jsx"
import DocCreate from "./Pages/DocCreate/DocCreate.js"
import GradeDocList from "./Pages/GradeDocList/GradeDocList.js"
import GradeSelf from "./Pages/GradeSelf/GradeSelf.js"
import GradeSelfHistory from "./Pages/GradeSelfHistory/GradeSelfHistory.js"
import ProtectedRoute from "./layout/ProtectedRoute.jsx"
import getCookie from "./utils/getCookie.js"
import decodeJWT from "./utils/decodeJWTToken.js"
import tokenIsExpired from "./utils/checkJWTExpired.js"
import GradeSessionList from "./Pages/GradeSessionList/GradeSessionList.js"
import GradeSupervisor from "./Pages/GradeSupervisor/GradeSupervisor.js"
import GradeSessionHistoryList from "./Pages/GradeSessionHistoryList/GradeSessionHistoryList.js"
import GradeGeneralList from "./Pages/GradeGeneralList/GradeGeneralList.js"
import GradeGeneralDetail from "./Pages/GradeGeneralDetail/GradeGeneralDetail.js"
import UserList from "./Pages/UserList/UserList.js"
import UserDetail from "./Pages/UserDetail/UserDetail.js"
import UserCreate from "./Pages/UserCreate/UserCreate.js"
import ChangePassword from "./Pages/ChangePassword/ChangePassword.js"
import GeneralUser from "./Pages/GeneralUser/GeneralUser.js"

function App() {
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Sidebar />}>
                    <Route index element={<Home />} />
                    <Route path="general/:docId" element={<GeneralUser />} />
                    <Route path=":userId" element={<IndexFragment />}>
                        <Route index element={<GradeGeneralDetail />} />
                        {/* <Route index element={<GradeGeneralList />} />
                        <Route
                            path="detail/:gradeId"
                            element={<GradeGeneralDetail />}
                        /> */}
                    </Route>
                    <Route path="docs" element={<IndexFragment />}>
                        <Route index element={<Document />} />
                        <Route path=":docId" element={<DocDetail />} />
                        <Route path="create" element={<DocCreate />} />
                    </Route>
                    <Route path="grade" element={<IndexFragment />}>
                        <Route index element={<GradeDocList />} />
                        <Route path="self/:docId" element={<GradeSelf />} />
                        <Route path="history" element={<IndexFragment />}>
                            <Route index element={<GradeSelfHistory />} />
                            <Route path=":docId" element={<GradeSelf />} />
                        </Route>
                        <Route path="supervisor" element={<IndexFragment />}>
                            <Route index element={<GradeSessionList />} />
                            <Route
                                path=":id"
                                element={<GradeSupervisor isEditable={true} />}
                            />
                            <Route path="history" element={<IndexFragment />}>
                                <Route
                                    index
                                    element={<GradeSessionHistoryList />}
                                />
                                <Route
                                    path=":id"
                                    element={
                                        <GradeSupervisor isEditable={false} />
                                    }
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="user" element={<IndexFragment />}>
                        <Route index element={<UserList />}></Route>
                        <Route
                            path="detail/:userId"
                            element={<UserDetail />}
                        ></Route>
                        <Route path="create" element={<UserCreate />}></Route>
                    </Route>
                    <Route
                        path="change_password"
                        element={<ChangePassword />}
                    ></Route>
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    )
    // let element = useRoutes([
    //     // These are the same as the props you provide to <Route>
    //     { path: "/", element: <Home /> },
    //     {
    //         path: "/test",
    //         element: <Sidebar />,
    //     },
    // ])

    // // The returned element will render the entire element
    // // hierarchy with all the appropriate context it needs
    // return element
}

export default App
