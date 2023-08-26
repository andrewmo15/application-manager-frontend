import '../style.css'
import { useNavigate } from 'react-router-dom'

export default function ApplicationCards(props) {
    let navigate = useNavigate()
    return (
        <div>
            <h2>Recent Activity</h2>
            <ul class="cards">
                {props.apps.map(application => {
                    return (
                        <li class="card" onClick={() => navigate('/editApplication', {state: {username: props.username, token: props.token, id: application.id}})}>
                            <div class="card-content">
                                <div class="card-status" style={{ "background-color": (application.status === "Rejected" ? "#FFB7B7" : "#bcffbc"), "color": application.status === "Rejected" ? "red" : "green" }}>
                                    {application.status}
                                </div>
                                <h3 class="card-title">{application.company}</h3>
                                <div class="card-subtitle">
                                    {application.position}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}