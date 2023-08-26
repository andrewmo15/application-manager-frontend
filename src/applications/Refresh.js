import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import APIService from '../APIService'
import { TailSpin } from 'react-loader-spinner'
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
        <div className="form refresh">
            <div className="form-contents"> 
                <div className='logo'>Track</div>
                <div className="title">Fetching latest emails...</div>
                <div className="subtitle">This may take some time if you have a lot of emails. Please be patient.</div>
                <div className="spinner">
                    <TailSpin color="#404089"/>
                </div>
                <div id="error" className="error"></div>
                <button type="text" className="form-button submit" onClick={() => navigate('/applications', {state: {username: username, token: token}})}>Skip</button>
            </div>
        </div>
    )
}

async function update(navigate, username, token) {
    let applications = await APIService.getNewApplications(username, token).catch(() => {
        throw new Error("Failed to get new appliations. Please double check your IMAP code, email, and provider or try again later.")
    })
    let promises = applications.map(application => APIService.postApplications(token, username, application.company, application.position, application.status))
    await Promise.all(promises).catch(e => {
        throw new Error(e.message)
    })
    let userDetails = await APIService.getUserDetails(username, token)
    var currentdate = new Date()
    var datetime = (currentdate.getMonth() + 1) + "/"
                    + currentdate.getDate()  + "/" 
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds()
    await APIService.updateUserDetails(username, token, userDetails.email, datetime, userDetails.imap_password, userDetails.imap_url).catch(e => {
        throw new Error(e.message)
    })
    navigate('/applications', {state: {username: username, token: token}})
}

