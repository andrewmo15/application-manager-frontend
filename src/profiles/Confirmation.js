import { useLocation, useNavigate } from 'react-router-dom'
import APIService from '../APIService'
import '../style.css'

export default function Confirmation() {
    const { state } = useLocation()
    const { username, token } = state
    let navigate = useNavigate()

    return (
        <div className="form-container small">
            <div className="form">
                <div className="title">Are you sure?</div>
                <p id="error" className="error"></p>
                <div className="input-container ic2">
                    <button type="text" className="destroy" onClick={() => deleteProfile(navigate, username, token)}> Yes </button>
                </div>
                <div className="input-container ic2">
                    <button type="text" className="submit" onClick={() => navigate('/editProfile', {state: {username: username, token: token}})}> No </button>
                </div>
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