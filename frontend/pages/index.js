import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import React from "react"
import Layout from '../pages/components/Layout'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Login page for EGT" />
        <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
      </Head>

      <main
            style={{backgroundImage : "url('/images/login_background.png')",
            backgroundSize : 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left top',
            width: '100vw',
            height: '100vh'
            }}
        >
            <Layout navbarType={1}>
            <header className={styles.header}> Employee Goals Tool </header>
            <body className={styles.body}>Helping managers and employees achieve their goals and elevate their work experience.</body>
            <button className={styles.button}><Link href = 'pages/login-page'> Sign In</Link></button>
            </Layout> 
        </main>
    </div>
  )
}
