import React from 'react';
import styles from '../../styles/login.module.css'


const login = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    if(password == '' & email == ''){
        alert('Input password and email')
    }
    else if(password == ''){
        alert("Insert password")
    }
    else if(email == ''){
        alert("Insert email")
    }
    else(
        alert('Email: ' + email + '\nPassword: ' + password) 
    )
}

export default function LoginForm(){
    return <div className={styles.box}>
        <div className = {styles.heading}>
            Login
            <div className = {styles.heading2}>
                <form  onSubmit = {login}>
                    Email Address
                    <input id = 'email' type = 'email' placeholder ='Type your email address' className={styles.input}></input>
                    Password
                    <input id = 'password' type = 'password' placeholder ='Type your password' className={styles.input}></input>
                    <button type = 'submit' className={styles.button}> Login</button>
                </form>
            </div>
        </div>
        
    </div>
}