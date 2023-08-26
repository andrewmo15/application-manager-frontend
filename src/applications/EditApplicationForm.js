import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIService  from '../APIService'
import '../style.css'

export default function EditApplicationForm() {
	const { state } = useLocation()
	const { username, token, id } = state
	const [company, setCompany] = useState("")
	const [position, setPosition] = useState("")
	const [status, setStatus] = useState("")
	let navigate = useNavigate()
  
	useEffect(() => {
		let error = document.getElementById("error")
		APIService.getApplication(token, id)
		.then(application => {
			setCompany(application.company)
			setPosition(application.position)
			setStatus(application.status)
		})
		.catch(e => error.innerHTML = e.message)
	}, [token, id])

	const saveChanges = () => {
		let error = document.getElementById("error")
		APIService.updateApplication(token, id, username, company, position, status)
		.then(() => navigate('/applications', {state: {username: username, token: token}}))
		.catch(e => error.innerHTML = e.message)
	}

	const deleteClick = () => {
		let error = document.getElementById("error")
		APIService.deleteApplication(token, id)
		.then(() => navigate('/applications', {state: {username: username, token: token}}))
		.catch(e => error.innerHTML = e.message)
	}
  
	return (
		<div className="form editprofile">
			<div className="form-contents">
				<div className='logo'>Track</div>
				<div className="title">Edit Application</div>
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
					<select id="status" className="input" value={status} name="status" onChange={e => setStatus(e.target.value)}>
						<option value="Rejected"> Rejected </option>
						<option value="Submitted"> Submitted </option>
					</select>
					<div className="cut"></div>
					<label htmlFor="status" className="placeholder">Status</label>
				</div>
				<div id="error" className="error"></div>
				<button type="text" className="form-button submit" onClick={saveChanges}>Save</button>
				<button type="text" className="form-button destroy" onClick={deleteClick}>Delete</button>
			</div>
		</div>
	)
}