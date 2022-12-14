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
import { useRouter } from 'next/router'

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

    // Get query param from router
    const router = useRouter()
    const {
        isReady,
        query: {
          id,
        }
    } = router;

    const [thisGoal, setTableData] = useState([])

    useEffect(() => {
        if (!isReady) {
            console.log('Router not ready')
            return;
        }

        const getData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/goals/byGoalId/"+id)
                if (!response.ok) {
                    throw new Error(response.status)
                }
                const data = await response.json();
                // change date format to yyyy-mm-dd
                data.goal.startDate = new Date(data.goal.startDate).toISOString().slice(0, 10)
                data.goal.endDate = new Date(data.goal.endDate).toISOString().slice(0, 10)
                setTableData(data.goal);
            } catch(err) {
                console.error('There was an error!', err)
            }  
        }
        getData()
    }, [isReady])
 
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
                    Employee's Goal
                </div>
                {/* Grid of 3 Sections for Name, start_date, and due_date */}
                <SingleGoal thisGoal={thisGoal}/>
                {/* Comments go below */}
                <CommentForm/>
            </Layout>

        )
    }
}