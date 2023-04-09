import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import APIService  from '../APIService'
import '../style.css'

export default function Applications() {
  const { state } = useLocation()
  const { username, token } = state
  const [applications, setApplications] = useState([])
  const [last_refresh, setLastRefresh] = useState("")
  const [applicationsError, setApplicationsError] = useState("")
  const [refreshError, setRefreshError] = useState("")
  let navigate = useNavigate()

  useEffect(() => {
      APIService.getUserApplications(username, token)
      .then(applications => setApplications(applications))
      .catch(e => setApplicationsError(e.message))

      APIService.getUserDetails(username, token)
      .then(response => setLastRefresh(response["last_refresh"]))
      .catch(e => setRefreshError(e.message))
  }, [username, token])
  
  return (
    <div>
      <div className="header-container">
        <div className="header-name">
          <h1> Your applications </h1>
        </div>
        <div style={{display:"flex", flexDirection: "row"}}>
          <button className="header-buttons" onClick={() => navigate('/editProfile', {state: {username: username, token: token}})}> Edit Profile </button>
          <button className="header-buttons" onClick={() => navigate('/')}> Logout </button>
        </div>
      </div>
      {!applicationsError ? (
        <div className="apps">
          <div className="toolbar">
            <input id="search" className="search" type="text" placeholder='Search company, position, or status' onChange={filter}></input>
            <button className="toolbar-icons" onClick={() => navigate('/addApplication', {state: {username: username, token: token}})}> <ion-icon name="add-outline"></ion-icon> </button>
            <button className="toolbar-icons" onClick={() => navigate('/refresh', {state: {username: username, token: token}})}> <ion-icon name="refresh-circle-outline"></ion-icon> </button>
          </div>
          <div>
            {applications.length > 0 ? (
              <div>
                <table id="applicationTable">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {applications.map((application) => {
                    return (
                      <tr key={application.id}>
                        <td>{application.company}</td>
                        <td>{application.position}</td>
                        <td>{application.status}</td>
                        <td><button className="table-buttons" onClick={() => navigate('/editApplication', {state: {username: username, token: token, id: application.id}})}>Edit</button></td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
                <div>
                  { !refreshError ? (
                    <div className="subtitle" style={{marginLeft: "2%"}}> Last refresh: {last_refresh}</div>
                  ) : (
                    <div className="subtitle" style={{marginLeft: "2%"}}>{refreshError}</div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="subtitle" style={{marginLeft: "2%"}}> No applications yet! Add some applications or try refreshing. </div>
                <div>
                    { !refreshError ? (
                      <div className="subtitle" style={{marginLeft: "2%"}}> Last refresh: {last_refresh}</div>
                    ) : (
                      <div className="subtitle" style={{marginLeft: "2%"}}>{refreshError}</div>
                    )}
                  </div>
                  </div>
            )}
          </div>
        </div>
        ) : (
          <div className="subtitle" style={{marginLeft: "2%"}}> {applicationsError} </div>
        )}
      </div>
  );
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
        let txtValue = a.textContent + b.textContent + c.textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          row.style.display = ""
        } else {
          row.style.display = "none"
        }
      }
    })
  }
}