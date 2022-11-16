import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import styles from '../../styles/goal.module.css'
import styles2 from '../../styles/popup.module.css'
import { useRouter } from 'next/router'

var testGoal = {
    name: 'Obtain AWS certification',
    start_date: '09/01/2022',
    due_date: '11/20/2022',
    goal_type: 'Personal',
    status: 'In Progress',
    description: 'Study 30 min every day. Schedule an exam on https://aws.amazon.com/certification/'
}
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
                    <button className ={styles.button}>Edit Goal</button>
                </div>
                {/* Grid of 3 Sections for Name, start_date, and due_date */}
                <div className={styles.grid}>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Name: 
                            <div className={styles.box_text}> {testGoal.name}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Start Date: 
                            <div className={styles.box_text}> {testGoal.start_date}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            End Date: 
                            <div className={styles.box_text}> {testGoal.due_date}</div>
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