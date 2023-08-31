import '../style.css'
import { useNavigate } from 'react-router-dom'

export default function ApplicationCards(props) {
    let navigate = useNavigate()
    return (
        <div>
            <h2>Recent Activity</h2>
            <ul className="cards">
                {props.apps.map(application => {
                    return (
                        <li key={application.id} className="card" onClick={() => navigate('/editApplication', {state: {user_id: props.user_id, token: props.token, id: application.id}})}>
                            <div className="card-content">
                                <div className="card-status" style={{ "backgroundColor": (application.status === "Rejected" ? "#FFB7B7" : "#bcffbc"), "color": application.status === "Rejected" ? "red" : "green" }}>
                                    {application.status}
                                </div>
                                <h3 className="card-title">{application.company}</h3>
                                <div className="card-subtitle">
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