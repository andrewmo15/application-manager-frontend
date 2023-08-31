import { useNavigate } from 'react-router-dom'
import '../style.css'
import APIService from '../APIService'

export default function Login() {
    let navigate = useNavigate()

    const createUser = token => {
        APIService.getEmailFromToken(token)
        .then(email => APIService.createUser(email, token, "gmail"))
        .then(res => navigate('/refresh', {state: {user_id: res["id"], token: token}}))
        .catch(err => console.log(err));
    }

    const onGoogleClick = () => {
        const google = window.google;
        const client = google.accounts.oauth2.initTokenClient({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: process.env.REACT_APP_GOOGLE_API_SCOPE,
            callback: response => createUser(response.access_token)
        })
        client.requestAccessToken()
    }

    return (
        <div className="form login">
            <div className="form-contents">
                <div className='logo'>Track</div>
                <div className="title">Welcome!</div>
                <div className="subtitle">Please login or sign up</div>
                <div id="error" className="error"></div>
                <button type="text" className="form-button submit" onClick={onGoogleClick}>Sign in with Google</button>
            </div>
        </div>
    )
}