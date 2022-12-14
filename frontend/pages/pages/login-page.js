import Link from 'next/link'
import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'


export default function loginPage(){
    return (
    <div>
        <Head>
            <title>Login Page</title>
            <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
        </Head>

        <div
            style={{backgroundImage : "url('/images/login_background.png')",
            backgroundSize : 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
            width: '100vw',
            height: '100vh'
            }}
        >
            <Layout navbarType={1}>
            <h1>
                <LoginForm />
            </h1>
            </Layout> 
        </div>
    </div>
    )
}
