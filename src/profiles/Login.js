import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const signUpClick = () => navigate('signup')
    return (
        <div className="form-container login">
            <div className="form">
                <div className="title">Welcome!</div>
                <div className="subtitle">Please login or sign up</div>
                <div className="input-container ic1">
                    <input id="username" className="input" type="text" placeholder=' ' value={username} onChange={e => setUsername(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="username" className="placeholder">Username</label>
                </div>
                <div className="input-container ic2">
                    <input id="password" className="input" type="password" placeholder=' ' value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="cut"></div>
                    <label htmlFor="password" className="placeholder">Password</label>
                </div>
                <p id="error" className="error"></p>
                <div className="input-container ic1">
                    <button type="text" className="submit" onClick={loginClick}>Login</button>
                </div>
                <div className="input-container ic2">
                    <button type="text" className="submit" onClick={signUpClick}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}