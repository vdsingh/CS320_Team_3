import Head from 'next/head'
import React, { useState, useEffect } from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import styles from '../../styles/goal.module.css'
import styles2 from '../../styles/popup.module.css'
import { useRouter } from 'next/router'
import CommentForm from '../components/Comments';
import EditGoalPopup from '../components/EditGoalPopup'
import { getCookie } from 'cookies-next';
import SingleGoal from '../components/SingleGoal'
export default function goalPage(){
    const router = useRouter()
    // const navbar = JSON.parse(getCookie('login')).user.isManager ? 4 : 3;
    const [testGoal, setTableData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/api/goals/byGoalId/"+router.query.id)
        .then(response => response.json())
        .then(data => setTableData(data.goal))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })
    }, [])

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
                    Your Goal
                    <EditGoalPopup/>
                </div>
                {/* Grid of 3 Sections for Name, start_date, and due_date */}
                <SingleGoal/>
                {/* Comments go below */}
                <CommentForm/>
            </Layout>

        )
    }
}