import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import styles from '../../styles/goal.module.css'
import styles2 from '../../styles/popup.module.css'
import CommentForm from '../components/Comments';
import EditGoalPopup from '../components/EditGoalPopup'
import { getCookie } from 'cookies-next';
import SingleGoal from '../components/SingleGoal'
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
                    Your Goal
                    <EditGoalPopup testGoal={testGoal}/>
                </div>
                {/* Grid of 3 Sections for Name, start_date, and due_date */}
                <SingleGoal/>
                {/* Comments go below */}
            </Layout>
            
        )
    }
}