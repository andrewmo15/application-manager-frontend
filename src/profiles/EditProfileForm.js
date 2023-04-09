import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
        })
        .catch(e => error.innerHTML = e.message)
  }, [username, token])

  const saveClick = () => {
        let error = document.getElementById("error")
        if (!APIService.isValidEmail(email)){
            error.innerHTML = "Please enter a valid email."
        } else {
            APIService.updateUserDetails(username, token, email, lastRefresh, imapPassword, imapURL)
        .then(() => navigate('/applications', {state: {username: username, token: token}}))
        .catch(e => error.innerHTML = e.message)
        }
  }

  const deleteClick = () => navigate('/confirmation', {state: {username: username, token: token}})

  return (
    <div className="form-container forms">
        <div className="form">
            <div className="title">Edit Profile</div>
            <div className="input-container ic1">
                <input id="email" className="input" type="text" placeholder=' ' value={email} onChange={e => setEmail(e.target.value)}/>
                <div className="cut cut-short"></div>
                <label htmlFor="email" className="placeholder">Email</label>
            </div>
            <div className="input-container ic2">
                <input id="imapPassword" className="input" type="text" placeholder=' ' value={imapPassword} onChange={e => setImapPassword(e.target.value)}/>
                <div className="cut"></div>
                <label htmlFor="password" className="placeholder">IMAP code</label>
            </div>
            <div className="input-container ic2">
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
            <p id="error" className="error"></p>
            <div className="input-container ic2">
                <button type="text" className="submit" onClick={saveClick}> Save</button>
            </div>
            <div className="input-container ic2">
                <button type="text" className="destroy" onClick={deleteClick}>Delete Profile</button>
            </div>
        </div>
    </div>
  );
}