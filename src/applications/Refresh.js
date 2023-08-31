import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import APIService from '../APIService'
import { TailSpin } from 'react-loader-spinner'
import '../style.css'

export default function Refresh() {
    const { state } = useLocation()
    const { user_id, token } = state
    let navigate = useNavigate()
    useEffect(() => {
        update(navigate, user_id, token).catch(e => {
            let error = document.getElementById("error")
            let button = document.getElementById("continue")
            error.innerHTML = e.message
            button.style.visibility = "visible"
        })
    }, [navigate, user_id, token])

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
                <button type="text" className="form-button submit" onClick={() => navigate('/applications', {state: {user_id: user_id, token: token}})}>Skip</button>
            </div>
        </div>
    )
}

async function update(navigate, user_id, token) {
    let applications = await APIService.getNewApplications(user_id, token).catch((e) => {
        console.log(e)
    })
    let promises = applications.map(application => APIService.postApplications(token, user_id, application.company, application.position, application.status))
    await Promise.all(promises).catch(e => {
        throw new Error(e.message)
    })
    var currentdate = new Date()
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
    let user = await APIService.getUserDetails(user_id, token)
    await APIService.updateUserDetails(user_id, user.email, token, datetime, user.email_type).catch(e => {
        throw new Error(e.message)
    })
    navigate('/applications', {state: {user_id: user_id, token: token}})
}

