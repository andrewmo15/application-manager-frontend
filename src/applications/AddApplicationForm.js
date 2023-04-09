import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIService  from '../APIService'
import '../style.css'

export default function AddApplicationForm() {
    const { state } = useLocation()
    const { username, token } = state
    const [company, setCompany] = useState("")
    const [position, setPosition] = useState("")
    const [status, setStatus] = useState("Rejected")
    let navigate = useNavigate()

    const saveChanges = () => {
        let error = document.getElementById("error")
        APIService.postApplications(token, username, company, position, status)
        .then(() => navigate('/applications', {state: {username: username, token: token}}))
        .catch(e => error.innerHTML = e.message)
    }

    const cancel = () => {
        navigate('/applications', {state: {username: username, token: token}})
    }
    return (
        <div className="form-container forms">
            <div className="form">
                <div className="title">Application Form</div>
                <div className="input-container ic1">
                    <input id="company" className="input" type="text" placeholder=' ' value={company} onChange={e => setCompany(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="company" className="placeholder">Company</label>
                </div>
                <div className="input-container ic2">
                    <input id="position" className="input" type="text" placeholder=' ' value={position} onChange={e => setPosition(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="position" className="placeholder">Position</label>
                </div>
                <div className="input-container ic2">
                    <select id="status" className="input" name="status" onChange={e => setStatus(e.target.value)}>
                      	<option value="Rejected"> Rejected </option>
                      	<option value="Submitted"> Submitted </option>
					</select>
						<div className="cut"></div>
						<label htmlFor="status" className="placeholder">Status</label>
                </div>
                <p id="error" className="error"></p>
                <div className="input-container ic2">
                    <button type="text" className="submit" onClick={saveChanges}>Save</button>
                </div>
                <div className="input-container ic2">
                    <button type="text" className="submit" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}