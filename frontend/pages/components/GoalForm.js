import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Container from './CreateGoalPopup/PopupContainer';
import App from './CreateGoalPopup'
//Test Goals
var d1 = new Date('2022-10-18')
var d2 = new Date('2022-10-20')
var testGoal1 = {
    title: 'Complete Mock up ',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: Date(2022, 10, 18),
    endDate: d2,
    creationDate: d1,
    creatorId: 1,
    commentIDs: 1
}
var d3 = new Date('2022-10-05')
var d4 = new Date('2022-11-02')
var testGoal2 = {
    title: 'Complete Data Analysis',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: Date(2022, 10, 18),
    endDate: d4,
    creationDate: d3,
    creatorId: 1,
    commentIDs: 1
}
const goalArray = [testGoal1, testGoal2]

function getDateString(d){
    var month = (d.getMonth() + 1).toString()
    var day = (d.getDate()).toString()
    var year = (d.getFullYear()).toString()
    if (month.length == 1){
        month = '0' + month
    }
    if (day.length == 1){
        day = ('0' + day)
    }
    return (month + '/' + day + '/' + year)
}
export default function GoalForm(){
    const router = useRouter()

    const triggerText = 'New Goal';
    const onSubmit = (event) => {
    event.preventDefault(event);
    };

    var goal1, goal2, goal3, goal4, goal5
    goal1 = goal2 = goal3 = goal4 = goal5 = ''

    var g1CD, g2CD, g3CD, g4CD, g5CD = '' 
    var g1ED, g2ED, g3ED, g4ED, g5ED = ''

    if (typeof goalArray[0] != 'undefined'){
        goal1 = goalArray[0]
        g1CD = getDateString(goal1.creationDate)
        g1ED = getDateString(goal1.endDate)
    }
    if (typeof goalArray[1] != 'undefined'){
        goal2 = goalArray[1]
        g2CD = getDateString(goal2.creationDate)
        g2ED = getDateString(goal2.endDate)
    }
    if (typeof goalArray[2] != 'undefined'){
        goal3 = goalArray[2]
        g3CD = getDateString(goal3.creationDate)
        g3ED = getDateString(goal3.endDate)
    }
    if (typeof goalArray[3] != 'undefined'){
        goal4 = goalArray[3]
        g4CD = getDateString(goal4.creationDate)
        g4ED = getDateString(goal4.endDate)
    }
    if (typeof goalArray[4] != 'undefined'){
        goal5 = goalArray[4]
        g5CD = getDateString(goal5.creationDate)
        g5ED = getDateString(goal5.endDate)
    }
    return(
        <div className={styles.box}>
            <div className={styles.title}>
                Your Progress
                <App></App>
                <input className={styles.input} id='searchTerm' type='text' placeholder='Search for a Goal'></input>
            </div>
            <div className={styles.innerBox}>
                <div className={styles.IL}>
                    <left>Goals</left>
                    <right>Status</right>
                    <right>Created On</right>
                    <right>Due By</right>
                </div>
                <div className={styles.goalBox} style = {{opacity: "60%"}}>
                    <l>{goal1.title}</l>
                    <stat>{goal1.status}</stat>
                    <cd>{g1CD}</cd>
                    <ed>{g1ED}</ed>
                </div>
                <div className={styles.goalBox} style = {{opacity: "80%"}}>
                    <l>{goal2.title}</l>
                    <stat>{goal2.status}</stat>
                    <cd>{g2CD}</cd>
                    <ed>{g2ED}</ed>
                </div>
                <div className={styles.goalBox} style = {{opacity: "60%"}}>
                    <l>{goal3.title}</l>
                    <stat>{goal3.status}</stat>
                    <cd>{g3CD}</cd>
                    <ed>{g3ED}</ed>
                </div>
                <div className={styles.goalBox} style = {{opacity: "80%"}}>
                    <l>{goal4.title}</l>
                    <stat>{goal4.status}</stat>
                    <cd>{g4CD}</cd>
                    <ed>{g4ED}</ed>
                </div>
                <div className={styles.goalBox} style = {{opacity: "60%"}}>
                    <l>{goal5.title}</l>
                    <stat>{goal5.status}</stat>
                    <cd>{g5CD}</cd>
                    <ed>{g5ED}</ed>
                </div>
            </div>
            <button className={styles.link} onClick={() => router.push('/pages/goal')}>Click Here to See All...</button>
        </div>
        
    )
}