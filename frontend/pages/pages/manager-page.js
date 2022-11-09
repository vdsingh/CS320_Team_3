import Link from 'next/link'
import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import GoalTable from '../components/SmallGoalTable'
import ManagerInfo from '../components/ManagerInfo'
import ReportInfo from '../components/ReportInfo'
import EmployeeName from '../components/EmployeeName'
import loginValidator from './login-validator'
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'

export default function employeePage(){
    const router = useRouter()
    if (loginValidator()){
        return(
            <Layout navbarType={4}>
            <div>
                <Head>
                    <title>Employee Page</title>
                    <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
                </Head>
                <div>
                    <h1 style = {{display: 'flex'}}>
                        <EmployeeName />
                        <GoalTable />
                    </h1>
                </div>
                {/* <div>
                    <h2> 
                        <EmployeeName />
                    </h2>
                </div> */}
                <div>
                    <button className={styles.link} onClick={() => router.push('/pages/goal-page')}>Click Here to See All...</button>
                    <h1>
                        <ManagerInfo />
                    </h1>
                </div>
                <div>
                    <h1>
                        <ReportInfo />
                    </h1>
                </div>
            </div>
            </Layout>
        )
    }
}