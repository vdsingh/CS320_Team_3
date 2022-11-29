import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import styles from '../../styles/goal.module.css'
import styles2 from '../../styles/popup.module.css'
import { useRouter } from 'next/router'
import EditGoalPopup from '../components/EditGoalPopup'
import { getCookie, setCookie } from 'cookies-next';

export default function goalPage(){
    const router = useRouter()

    const [testGoal, setTableData] = useState([])
    const goalCookie = getCookie('this_goal')
    useEffect(() => {
        if (getCookie('this_goal') != undefined)
        {
            setTableData(JSON.parse(goalCookie).goal)
        } else {
            fetch("http://localhost:3000/api/goals/byGoalId/"+router.query.id)
            .then(response => response.json())
            .then(data => {
                setTableData(data.goal)
                setCookie('this_goal', JSON.stringify(data))
            })
            .catch(error => {
                console.error("There was an error!", error)
                alert(error)
            })
        }
    }, [])

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
                    <EditGoalPopup testGoal={testGoal}/>
                </div>
                {/* Grid of 3 Sections for Name, start_date, and due_date */}
                <div className={styles.grid}>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Name: 
                            <div className={styles.box_text}> {testGoal.title}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Start Date: 
                            <div className={styles.box_text}> {testGoal.startDate}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            End Date: 
                            <div className={styles.box_text}> {testGoal.endDate}</div>
                        </h3>
                    </div>
                </div>
                {/* Progress and Description */}
                <div>    
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Progress: 
                                <div className={styles.box_text}> {testGoal.status}</div>
                        </h3>
                    </div>
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Goal Type: 
                                <div className={styles.box_text}> {testGoal.goalType}</div>
                        </h3>
                    </div>
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Description: 
                            <div className={styles.box_text}> {testGoal.description}</div>
                        </h3>
                    </div>
                </div>
                {/* Comments go below */}
            </Layout>
            
        )
    }
}