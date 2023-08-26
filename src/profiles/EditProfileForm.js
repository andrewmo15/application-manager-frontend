import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import APIService  from '../APIService'
import '../style.css'

export default function EditProfileForm() {
    const { state } = useLocation()
    const { username, token } = state
    const [email, setEmail] = useState('')
    const [imapPassword, setImapPassword] = useState('')
    const [imapURL, setImapURL] = useState('')
    const [lastRefresh, setLastRefresh] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        let error = document.getElementById("error")
        APIService.getUserDetails(username, token)
        .then(response => {
            setImapPassword(response["imap_password"])
            setImapURL(response["imap_url"])
            setEmail(response["email"])
            setLastRefresh(response["last_refresh"])
        }).catch(e => error.innerHTML = e.message)
    }, [username, token])

    const saveClick = () => {
        let error = document.getElementById("error")
        if (email.length === 0 && imapPassword.length === 0) {
            error.innerHTML = "Please enter your email and your IMAP password."
        } else if (email.length === 0) {
            error.innerHTML = "Please enter your email."
        } else if (imapPassword.length === 0) {
            error.innerHTML = "Please enter your IMAP password."
        } else if (!APIService.isValidEmail(email)) {
            error.innerHTML = "Please enter a valid email."
        } else if (imapPassword.length > 0) {
            APIService.updateUserDetails(username, token, email, lastRefresh, imapPassword, imapURL)
            .then(() => navigate('/applications', {state: {username: username, token: token}}))
            .catch(e => error.innerHTML = e.message)
        }
    }

    const deleteClick = () => navigate('/confirmation', {state: {username: username, token: token}})

    return (
        <div className="form editprofile">
            <div className="form-contents">
                <div className='logo'>Track</div>
                <div className="title">Edit Profile</div>
                <div className="input-container">
                    <input id="email" className="input" type="text" placeholder=' ' value={email} onChange={e => setEmail(e.target.value)}/>
                    <div className="cut cut-short"></div>
                    <label htmlFor="email" className="placeholder">Email</label>
                </div>
                <div className="input-container">
                    <div className="tooltip-container">
                        <input id="imapPassword" className="input tooltip-input" type="text" placeholder=' ' value={imapPassword} onChange={e => setImapPassword(e.target.value)}/>
                        <div className="cut"></div>
                        <label htmlFor="imapPassword" className="placeholder">IMAP code</label>
                        <div className="tooltip">
                            <div className="tooltip-icon"><ion-icon name="help-circle-outline"></ion-icon></div>
                            <span className="tooltiptext"> To learn more about how to get your IMAP code, click <Link to="/help">here</Link>.</span>
                        </div>
                    </div>
                </div>
                <div className="input-container">
                    <select id="provider" className="input" value={imapURL} onChange={e => setImapURL(e.target.value)}>
                        <option value="imap.gmail.com"> Gmail </option>
                        <option value="imap-mail.outlook.com"> Outlook </option>
                        <option value="imap.aol.com"> AOL </option>
                        <option value="iimap.mail.yahoo.com"> Yahoo </option>
                        <option value="imap.mail.com"> Mail.com </option>
                        <option value="imap.gmx.com"> GMX </option>
                    </select>
                    <div className="cut"></div>
                    <label htmlFor="provider" className="placeholder">Provider</label>
                </div>
                <div id="error" className="error"></div>
                <button type="text" className="form-button submit" onClick={saveClick}> Save</button>
                <button type="text" className="form-button destroy" onClick={deleteClick}>Delete Profile</button>
            </div>
        </div>
    )
}