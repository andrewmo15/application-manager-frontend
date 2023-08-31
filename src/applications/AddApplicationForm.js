import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIService  from '../APIService'
import '../style.css'

export default function AddApplicationForm() {
    const { state } = useLocation()
    const { user_id, token } = state
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("Rejected")
    let navigate = useNavigate()

    const saveChanges = () => {
        let error = document.getElementById("error")
        APIService.postApplications(token, user_id, company, position, status)
        .then(() => navigate('/applications', {state: {user_id: user_id, token: token}}))
        .catch(e => error.innerHTML = e.message)
    }

    const cancel = () => {
        navigate('/applications', {state: {user_id: user_id, token: token}})
    }
    return (
        <div className="form editprofile">
            <div className="form-contents">
                <div className='logo'>Track</div>
                <div className="title">Add Application</div>
                <div className="input-container">
                    <input id="company" className="input" type="text" placeholder=' ' value={company} onChange={e => setCompany(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="company" className="placeholder">Company</label>
                </div>
                <div className="input-container">
                    <input id="position" className="input" type="text" placeholder=' ' value={position} onChange={e => setPosition(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="position" className="placeholder">Position</label>
                </div>
                <div className="input-container">
                    <select id="status" className="input" name="status" onChange={e => setStatus(e.target.value)}>
                      	<option value="Rejected"> Rejected </option>
                      	<option value="Submitted"> Submitted </option>
					</select>
						<div className="cut"></div>
						<label htmlFor="status" className="placeholder">Status</label>
                </div>
                <div id="error" className="error"></div>
                <button type="text" className="form-button submit" onClick={saveChanges}>Save</button>
                <button type="text" className="form-button submit" onClick={cancel}>Cancel</button>
            </div>
        </div>
    )
}