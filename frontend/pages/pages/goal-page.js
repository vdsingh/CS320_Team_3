import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import FullGoalTable from '../components/FullGoalTable'
import styles from '../../styles/GoalTable.module.css'
import { useRouter } from 'next/router'
import CreateGoalPopup from '../components/CreateGoalPopup';

export default function goalPage(){
    const router = useRouter()
    if (loginValidator()){
        return(
            <Layout navbarType={4}>
                <div>
                    <Head>
                        <title>Employee Page</title>
                        <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
                    </Head>
                </div>
                <div className={styles.title}>
                    Your Goals:
                    <CreateGoalPopup></CreateGoalPopup>
                    <input className = {styles.input} id = 'searchTerm' type = 'text' placeholder='Search for a Goal'></input>      
                </div>
                <FullGoalTable />
            </Layout>
            
        )
    }
}