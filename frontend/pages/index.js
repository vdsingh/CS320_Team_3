import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login page for EGT" />
        <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Team Axolotl Starter Front End App!
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
            <h2>Next Steps</h2>
            <p>
              Our next step is to build out the login page!
            </p>
      </main>
    </div>
  )
}
