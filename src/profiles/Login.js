import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import APIService from '../APIService'
import '../style.css'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate()
    
    const loginClick = () => {
        let error = document.getElementById("error")
        APIService.loginUser(username, password)
        .then(token => navigate('/refresh', {state: {username: username, token: token}}))
        .catch(e => error.innerHTML = e.message)
    }
    return (
        <div className="form login">
            <div className="form-contents">
                <div className='logo'>Track</div>
                <div className="title">Welcome!</div>
                <div className="subtitle">Please login or sign up</div>
                <div className="input-container">
                    <input id="username" className="input" type="text" placeholder=' ' value={username} onChange={e => setUsername(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="username" className="placeholder">Username</label>
                </div>
                <div className="input-container">
                    <input id="password" className="input" type="password" placeholder=' ' value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="password" className="placeholder">Password</label>
                </div>
                <div id="error" className="error"></div>
                <button type="text" className="form-button submit" onClick={loginClick}>Log In</button>
                <div className="signupText"> New to Track? <Link to="/signup">Create an account</Link>.</div>
            </div>
        </div>
    )
}