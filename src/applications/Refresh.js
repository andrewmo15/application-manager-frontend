import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import APIService from '../APIService'
import '../style.css'

export default function Refresh() {
    const { state } = useLocation()
    const { username, token } = state
    let navigate = useNavigate()

    useEffect(() => {
        update(navigate, username, token).catch(e => {
            let error = document.getElementById("error")
            let button = document.getElementById("continue")
            error.innerHTML = e.message
            button.style.visibility = "visible"
        })
    }, [navigate, username, token])

    return (
        <div className="form-container small">
            <div className="form">
                <div className="title">Fetching latest emails...</div>
                <div className="subtitle">Please be patient</div>
                <p id="error" className="error"></p>
                <div className="input-container ic2">
                    <button id="continue" type="text" className="submit" style={{visibility: "hidden"}} onClick={() => navigate('/applications', {state: {username: username, token: token}})}> Continue </button>
                </div>
            </div>
        </div>
    )
}

async function update(navigate, username, token) {
    let applications = await APIService.getNewApplications(username, token).catch(e => {
        throw new Error("Failed to get new appliations. Please double check your IMAP code, email, and provider or try again later.")
    })
    let promises = applications.map(application => APIService.postApplications(token, username, application.company, application.position, application.status))
    await Promise.all(promises).catch(e => {
        throw new Error(e.message)
    });
    let userDetails = await APIService.getUserDetails(username, token)
    var currentdate = new Date(); 
    var datetime = (currentdate.getMonth() + 1) + "/"
                    + currentdate.getDate()  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    await APIService.updateUserDetails(username, token, userDetails.email, datetime, userDetails.imap_password, userDetails.imap_url).catch(e => {
        throw new Error(e.message)
    })
    navigate('/applications', {state: {username: username, token: token}})
}

