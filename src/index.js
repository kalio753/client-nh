import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import { BrowserRouter } from "react-router-dom"
import { MyContextProvider } from "./hooks/myContext.js"
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import customParseFormat from "dayjs/plugin/customParseFormat"
import localeData from "dayjs/plugin/localeData"
import weekday from "dayjs/plugin/weekday"
import weekOfYear from "dayjs/plugin/weekOfYear"
import weekYear from "dayjs/plugin/weekYear"

const root = ReactDOM.createRoot(document.getElementById("root"))

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
root.render(
    <BrowserRouter>
        <MyContextProvider>
            <App />
        </MyContextProvider>
    </BrowserRouter>,
)
