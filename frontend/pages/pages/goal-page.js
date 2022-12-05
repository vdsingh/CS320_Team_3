import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import FullGoalTable from '../components/FullGoalTable'
import styles from '../../styles/GoalTable.module.css'
import { useRouter } from 'next/router'
import CreateGoalPopup from '../components/CreateGoalPopup';
import { getCookie } from 'cookies-next';

export default function goalPage(){
    
    // Generate nav bar
    const [managerNavbar, setNavbar] = useState(3)
    useEffect(() => {
        const userCookie = getCookie('login')
        var isManager = false
        try {
            if (userCookie == undefined) throw "Try signing in again"
            isManager = JSON.parse(userCookie).user.isManager
        }
        catch (err) {
            console.log(err)
        }
        console.log(isManager)
        if (isManager) setNavbar(4)
    })
    
    if (loginValidator()){
        return(
            <Layout navbarType={managerNavbar}>
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