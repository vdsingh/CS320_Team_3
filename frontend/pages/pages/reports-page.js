import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import MegaTable from '../components/MegaTable'
import loginValidator from './login-validator'
import { useRouter } from 'next/router'
import styles from '../../styles/GoalTable.module.css'

export default function reportsPage(){
    const router = useRouter()
    if (loginValidator()){
        return(
            <Layout navbarType={4}>
            <div>
                <Head>
                    <title>Employee Page</title>
                    <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
                </Head>
                <div className={styles.title}>
                        Your Employees:
                </div>
                <MegaTable />
            </div>
            </Layout>
        )
    }
}