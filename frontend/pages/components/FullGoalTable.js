import React from 'react';
import { useRouter } from 'next/router'
import {DataGrid} from '@material-ui/data-grid'
import styles from '../../styles/GoalTable.module.css'

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
    id: 0
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
    id: 1
}
const goalArray = [testGoal1, testGoal2]

const columns = [
    {field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.headerLeft},
    {field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header},
    {field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header},
    {field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight}
]

export default function GoalForm(){
    return(
        <DataGrid
        style = {{height:600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3'}}
        rows = {goalArray}
        columns = {columns}
        />

    )
        
}