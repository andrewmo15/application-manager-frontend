import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import APIService  from '../APIService'
import ApplicationCards from './ApplicationCards'
import ApplicationTable from './ApplicationTable'
import '../style.css'

export default function Applications() {
    const { state } = useLocation()
    const { user_id, token } = state
    const [applications, setApplications] = useState([])
    const [last_refresh, setLastRefresh] = useState("")
    const [applicationsError, setApplicationsError] = useState("")
    const [refreshError, setRefreshError] = useState("")
    let navigate = useNavigate()

    useEffect(() => {
        APIService.getUserApplications(user_id, token)
        .then(applications => {
			setApplications(applications.reverse())
		})
        .catch(e => setApplicationsError(e.message))

        APIService.getUserDetails(user_id, token)
        .then(response => setLastRefresh(response["last_refresh"]))
        .catch(e => setRefreshError(e.message))
    }, [user_id, token])
  
    return (
		<div className="container">
			<div className="header-container">
				<div className="header-name">
					Track
				</div>
				<div style={{display:"flex", flexDirection: "row"}}>
					<button className="header-buttons" onClick={() => navigate('/')}> Logout </button>
				</div>
			</div>
			{ applications.length > 0 ? (
				<ApplicationCards apps={applications.slice(0,5)} user_id={user_id} token={token}/>
			) : (<div/>) }
			{!applicationsError ? (
				<div>
					<div className="table-header-container">
						<h2>Your Applications</h2>
						<div style={{display:"flex", flexDirection: "row"}}>
							<button className="table-header-buttons" onClick={() => navigate('/addApplication', {state: { user_id: user_id, token: token }})}> 
								<ion-icon name="add-outline"></ion-icon>
								<span> Add Application </span>
							</button>
							<button className="table-header-buttons" onClick={() => navigate('/refresh', {state: { user_id: user_id, token: token }})}> 
								<ion-icon name="refresh-circle-outline"></ion-icon>
								<span> Refresh </span>
							</button>
						</div>
					</div>
					{applications.length > 0 ? (
						<div>
							<input id="search" className="search" type="text" placeholder='Search company, position, or status' onChange={filter}></input>
							<ApplicationTable applications={applications} user_id={user_id} token={token}/>
						</div>
					) : (
						<div className="subtitle" style={{marginLeft: "2%"}}> No applications yet! Add some applications or try refreshing. </div>
					)}
				</div>
			) : (
				<div className="subtitle" style={{marginLeft: "2%"}}> {applicationsError} </div>
			)}

			{ !refreshError ? (
				<div className="refreshText"> Last refresh: {last_refresh}</div>
			) : (
				<div className="refreshText">{refreshError}</div>
			)}
		</div>
  	)
}

function filter() {
	let input = document.getElementById("search")
	let filter = input.value.toUpperCase()
	let table = document.getElementById("applicationTable")
	if (!table) {
		return
	}
	let tr = Array.from(table.getElementsByTagName("tr"))
	if (input.length === 0) {
		tr.forEach(row => row.style.display = "")
	} else {
		tr.forEach(row => {
			let a = row.getElementsByTagName("td")[0]
			let b = row.getElementsByTagName("td")[1]
			let c = row.getElementsByTagName("td")[2]
			if (a && b && c) {
				let txtValue = a.textContent + b.textContent + c.textContent
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					row.style.display = ""
				} else {
					row.style.display = "none"
				}
			}
		})
	}
}