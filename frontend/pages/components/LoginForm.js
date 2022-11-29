import React from 'react';
import styles from '../../styles/login.module.css'
import Router from 'next/router'
import { getCookie, setCookie } from 'cookies-next'

const login = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value

    // Client-side check of password and email validity
    if (password == '' & email == '') {
        alert('Input password and email')
    }
    else if (password == '') {
        alert("Insert password")
    }
    else if (email == '') {
        alert("Insert email")
    }
    /*
    If the input email and password are correct, we will
    do a POST request to the login API on the backend.
    If the user does exist on the database, then the result
    will contain the user object.
    */
    else {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        }
        // API request to the login API
        fetch('http://localhost:3000/api/login', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            // If there is no error, proceed to the next page
            else {
                setCookie('login', JSON.stringify(data));
                console.log(JSON.parse(getCookie('login')));
                if (JSON.parse(getCookie('login')).user.isManager) {
                    Router.push('/pages/manager-page');
                }
                else {
                    Router.push('/pages/employee-page');
                }
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
            alert(error);
        });
    }
}

export default function LoginForm() {
    return <div className={styles.box}>
        <div className={styles.heading}>
            Login
            <div className={styles.heading2}>
                <form onSubmit={login}>
                    <div className={styles.text}>Email Address</div>
                    <input id='email' type='email' placeholder='Type your email address' className={styles.input}></input>
                    <div className={styles.text}>Password</div>
                    <input id='password' type='password' placeholder='Type your password' className={styles.input}></input>
                    <button type='submit' className={styles.LoginButton}>Login</button>
                </form>
            </div>
        </div>

    </div>
}