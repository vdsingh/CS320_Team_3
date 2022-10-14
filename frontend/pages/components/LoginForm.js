import React from 'react';
import styles from '../../styles/login.module.css'


export default function LoginForm(){
    return <div className={styles.box}>
        <div className = {styles.heading}>
            Login
            <div className = {styles.heading2}>
                Email Address
                <input type = 'email' placeholder ='Type your email address' className={styles.input}></input>
                Password
                <input type = 'password' placeholder ='Type your password' className={styles.input}></input>
                <button type = 'submit' className={styles.button}>Login</button>
            </div>
        </div>
        
    </div>
}