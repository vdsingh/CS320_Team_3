import Head from 'next/head'
import React from "react";
import Layout from '../components/Layout'
import loginValidator from './login-validator'
import FullGoalTable from '../components/FullGoalTable'

export default function goalPage(){
    if (loginValidator()){
        return(
            <Layout navbarType={3}>
            <div>
                <Head>
                    <title>Employee Page</title>
                    <link rel="icon" href="\UKG_(Ultimate_Kronos_Group)_logo.svg.png" />
                </Head>
            </div>
            <FullGoalTable />
            </Layout>
        )
    }
}