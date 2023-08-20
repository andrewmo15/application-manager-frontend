import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './profiles/Login'
import SignUp from './profiles/SignUp'
import Refresh from './applications/Refresh'
import Applications from './applications/Applications'
import EditApplicationForm from './applications/EditApplicationForm'
import EditProfileForm from './profiles/EditProfileForm'
import AddApplicationForm from './applications/AddApplicationForm'
import Confirmation from './profiles/Confirmation'
import Help from './profiles/Help'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/refresh/" element={<Refresh/>} />
                <Route path="/applications/" element={<Applications/>} />
                <Route path="/signup/" element={<SignUp/>}/>
                <Route path="/editApplication/" element={<EditApplicationForm/>}/>
                <Route path="/editProfile/" element={<EditProfileForm/>}/>
                <Route path="/addApplication/" element={<AddApplicationForm/>}/>
                <Route path="/confirmation/" element={<Confirmation/>}/>
                <Route path="/help/" element={<Help/>}/>
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