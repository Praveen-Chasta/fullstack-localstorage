import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  
  const signInUser = async() => {
        try{
            const response = await axios.post("http://localhost:8000/signin",{
                username,
                password
            })

            const { token } = response.data
            
            localStorage.setItem("token", token)

            setUsername('');
            setPassword('');
            navigate('/dashboard')

            // Navigate the user to a protected route (e.g., /dashboard)
            console.log("Login successful. Token stored.");

        }
        catch(e){
            setError(e.message)
        }
  }
  

  return (
    <>
        <label>Username</label>
        <input type = "text" value = {username} onChange = {(e) => setUsername(e.target.value)}/>
        <label>Password</label>
        <input type = "text" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
        <button onClick = {signInUser}>Sign in</button>
    </>
  )
}

export default Signin