import Link from 'next/link'
import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import GoalForm from '../components/GoalForm'

export default function employeePage(){
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
            
        </div>
        </Layout>
    )
}