import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import APIService from '../APIService'
import '../style.css'

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [imapPassword, setImapPassword] = useState('')
    const [imapURL, setImapURL] = useState('imap.gmail.com')
    const [date, setDate] = useState('')
    let navigate = useNavigate()

    const signupClick = (() => {
        let error = document.getElementById("error")
        signUpProcessing(navigate, username, email, password, date, imapPassword, imapURL)
        .catch(e => error.innerHTML = e.message)
    })
    
    return (
        <div className="form signup">
            <div className='form-contents'>
                <div className='logo'>Track</div>
                <div className="title">Welcome!</div>
                <div className="subtitle">Let's create your account</div>
                <div className="input-container">
                    <input id="username" className="input" type="text" placeholder=' ' value={username} onChange={e => setUsername(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="username" className="placeholder">Username</label>
                </div>
                <div className="input-container">
                    <input id="email" className="input" type="text" placeholder=' ' value={email} onChange={e => setEmail(e.target.value)}/>
                    <div className="cut cut-short"></div>
                    <label htmlFor="email" className="placeholder">Email</label>
                </div>
                <div className="input-container">
                    <input id="password" className="input" type="password" placeholder=' ' value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="password" className="placeholder">Password</label>
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
                <div className="datetitle">When did you start applying?</div>
                <div className="input-container">
                    <input id="date" className="input" type="date" placeholder=' ' value={date} onChange={e => setDate(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="date" className="placeholder"> Date </label>
                </div>
                <div id="error" className="error"></div>
                <button type="text" className="form-button submit" onClick={signupClick}>Sign Up</button>
            </div>
        </div>
    )
}

async function signUpProcessing(navigate, username, email, password, date, imapPassword, imapURL) {
    if (!username || !email || !password || !imapPassword || !date) {
        let empty = (!username ? "- Username: This field may not be blank.<br>" : "") + 
        (!email ? "- Email: This field may not be blank.<br>" : "") + 
        (!password ? "- Password: This field may not be blank.<br>" : "") + 
        (!imapPassword ? "- IMAP Code: This field may not be blank.<br>" : "") + 
        (!date ? "- Start date: This field may not be blank.<br>" : "")
        throw new Error("Please fix the following errors:<br>" + empty.substring(0, empty.length - 4))
    }
    if (!APIService.isValidEmail(email)){
        throw new Error("Please enter a valid email.")
    }
    if (!APIService.isValidPassword(password)) {
        throw new Error("Password must have at least one uppercase character, one lowercase character, and a number.")
    }
    let temp = date.split("-")
    let startDate = temp[1] + "/" + temp[2] + "/" + temp[0] + " 00:00:01"
    let id = await APIService.signUpUser(username, password).catch(e => {
        throw new Error(e.message)
    })
    let token = await APIService.loginUser(username, password).catch(async e => {
        await APIService.deleteUser(id)
        throw new Error(e.message)
    })
    await APIService.addUserDetails(username, token, email, startDate, imapPassword, imapURL).catch(async e => {
        await APIService.deleteUser(id)
        throw new Error(e.message)
    })
    navigate('/refresh', {state: {username: username, token: token}})
}