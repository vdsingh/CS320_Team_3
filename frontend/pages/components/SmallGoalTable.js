import React from 'react';
import styles from '../../styles/GoalTable.module.css'
import s from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import {DataGrid} from '@material-ui/data-grid'
import CreateGoalPopup from './CreateGoalPopup';

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
    commentIDs: 1,
    _id: 0
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
    commentIDs: 1,
    _id: 1
}
var emptyGoal = {
    title: '',
    description: '',
    goalType: '',
    status: '',
    priorityValue: null,
    startDate: '',
    endDate: '',
    creationDate: '',
    creatorId: null,
    commentIDs: null
}
const goalArray = [testGoal1, testGoal2]
var fiveGoals = []
var i = 0;

export default function GoalForm(){
    const router = useRouter()

    if (typeof goalArray[0] != 'undefined'){
        fiveGoals.push(goalArray[0])
        i = goalArray[0]._id
    }else{
        emptyGoal._id = i
        fiveGoals.push(emptyGoal)
        i += 1
    }
    
    if (typeof goalArray[1] != 'undefined'){
        fiveGoals.push(goalArray[1])
    }else{
        emptyGoal._id = i
        fiveGoals.push(emptyGoal)    
    }
    i += 1
    if (typeof goalArray[2] != 'undefined'){
        fiveGoals.push(goalArray[2])
    }else{
        emptyGoal._id = i
        fiveGoals.push(emptyGoal)    
    }
    i += 1
    if (typeof goalArray[3] != 'undefined'){
        fiveGoals.push(goalArray[3])
    }else{
        emptyGoal._id = i
        fiveGoals.push(emptyGoal)
    }
    i += 1
    if (typeof goalArray[4] != 'undefined'){
        fiveGoals.push(goalArray[4])
    }else{
        emptyGoal._id = i
        fiveGoals.push(emptyGoal)
    }
    const columns = [
        {field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.headerLeft},
        {field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header},
        {field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header},
        {field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight}
    ]

    return(
        <div className = {styles.box}>
            <div className={styles.title}>
                Your Progress
                <CreateGoalPopup></CreateGoalPopup>
                <input className = {s.input} id = 'searchTerm' type = 'text' placeholder='Search for a Goal'></input>
            </div>
            <DataGrid
            style = {{height:400, width: '100%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3', }}
            getRowId={(row) => row._id}
            rows = {goalArray}
            columns = {columns}
            />
        </div>
        
    )
}