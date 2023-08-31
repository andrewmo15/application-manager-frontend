import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './profiles/Login'
import Refresh from './applications/Refresh'
import Applications from './applications/Applications'
import EditApplicationForm from './applications/EditApplicationForm'
import AddApplicationForm from './applications/AddApplicationForm'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/refresh/" element={<Refresh/>} />
                <Route path="/applications/" element={<Applications/>} />
                <Route path="/editApplication/" element={<EditApplicationForm/>}/>
                <Route path="/addApplication/" element={<AddApplicationForm/>}/>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>
)