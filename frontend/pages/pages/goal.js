import React from 'react';
import loginValidator from './login-validator'
import Popup from '../components/CreateGoalPopup/GoalPopup';
import Layout from '../components/Layout';

export default function employeePage(){
    if (loginValidator()){
        return(
            <Layout navbarType={3}></Layout>
        );
    }
}