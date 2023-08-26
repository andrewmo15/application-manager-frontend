import { useLocation, useNavigate } from 'react-router-dom'
import APIService from '../APIService'
import '../style.css'

export default function Confirmation() {
    const { state } = useLocation()
    const { username, token } = state
    let navigate = useNavigate()

    return (
        <div className="form confirmation">
            <div className="form-contents">
                <div className='logo'>Track</div>
                <div className="title">Are you sure?</div>
                <div className="subtitle">This action cannot be undone.</div>
                <p id="error" className="error"></p>
                <button type="text" className="form-button destroy" onClick={() => deleteProfile(navigate, username, token)}> Yes </button>
                <button type="text" className="form-button submit" onClick={() => navigate('/editProfile', {state: {username: username, token: token}})}> No </button>
            </div>
        </div>
    )
}

async function deleteProfile(navigate, username, token) {
    let applications = await APIService.getUserApplications(username, token)
    let promises = applications.map(application => APIService.deleteApplication(token, application.id))
    await Promise.all(promises)
    await APIService.deleteUserDetail(username, token)
    await APIService.deleteUser()
    let response = await APIService.getUserDetails(username, token)
    await APIService.deleteUser(response["user_id"])
    navigate('/')
}