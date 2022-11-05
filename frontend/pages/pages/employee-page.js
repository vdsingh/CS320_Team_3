import Link from 'next/link'
import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import GoalForm from '../components/GoalForm'
import ManagerInfo from '../components/ManagerInfo'
import EmployeeName from '../components/EmployeeName'
import loginValidator from './login-validator'
import styles from '../../styles/employee.module.css'
// import Popup from '../components/CreateGoalPopup/GoalPopup';

export default function employeePage(){
    if (loginValidator()){
        return(
            <Layout navbarType={3}>
            <div>
                <Head>
                    <title>Employee Page</title>
                    <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
                </Head>
                <div>
                    <h1>
                        <GoalForm />
                    </h1>
                </div>
                <div>
                    <h2> 
                        <EmployeeName />
                    </h2>
                </div>
                <div>
                    <button className={styles.link} onClick={() => router.push('/pages/goals')}>Click Here to See All...</button>
                    <h1>
                        <ManagerInfo />
                    </h1>
                </div>
            </div>
            </Layout>
        )
    }
}