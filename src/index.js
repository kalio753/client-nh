import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import { BrowserRouter } from "react-router-dom"
import { MyContextProvider } from "./hooks/myContext.js"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <MyContextProvider>
            <App />
        </MyContextProvider>
    </BrowserRouter>,
)
