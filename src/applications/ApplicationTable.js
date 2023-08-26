import '../style.css'
import { useNavigate } from 'react-router-dom'

export default function ApplicationTable(props) {
    let navigate = useNavigate()
    return (
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
                {props.applications.map((application) => {
                    return (
                    <tr key={application.id}>
                        <td>{application.company}</td>
                        <td>{application.position}</td>
                        <td>{application.status}</td>
                        <td><button className="table-buttons" onClick={() => navigate('/editApplication', {state: {username: props.username, token: props.token, id: application.id}})}>Edit</button></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}