import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import styles from '../../styles/GoalTable.module.css'
import { useRouter } from 'next/router'

export default function goalPage(){
    const router = useRouter()
    if (loginValidator()){
        return(
            <Layout navbarType={3}>
                <div>
                    <Head>
                        <title>Employee Page</title>
                        <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
                    </Head>
                </div>
                <div className={styles.title}>
                    Your Goal
                    
                </div>
            </Layout>
            
        )
    }
}