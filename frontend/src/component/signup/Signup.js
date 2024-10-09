import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Signup() {
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
  
   const userSignup = async () => {
     try{
        const response = await axios.post("http://localhost:8000/signup", {
          username,
          password
        })
        
        setUsername("")
        setPassword("")
        navigate('/signin')

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
        <button onClick = {userSignup}>Submit</button>
    </>
  )
}

export default Signup