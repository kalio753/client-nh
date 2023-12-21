import { Route, Routes, useRoutes } from "react-router-dom"
import "./App.scss"
import Sidebar from "./layout/sidebar.jsx"
import Home from "./Pages/Home/Home.js"
import Login from "./Pages/Login/Login.js"
import DocDetail from "./Pages/DocDetail/DocDetail.js"
import Document from "./Pages/Document/Document.js"
import IndexFragment from "./component/IndexFragment.jsx"
import DocCreate from "./Pages/DocCreate/DocCreate.js"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Sidebar />}>
                <Route index element={<Home />} />
                <Route path="docs" element={<IndexFragment />}>
                    <Route index element={<Document />} />
                    <Route path=":docId" element={<DocDetail />} />
                    <Route path="create" element={<DocCreate />} />
                </Route>
                {/* <Route path="*" element={<NoPage />} /> */}
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
