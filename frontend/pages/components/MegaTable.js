import React from 'react';
import { useRouter } from 'next/router'
import {DataGrid} from '@material-ui/data-grid'
import styles from '../../styles/GoalTable.module.css'

//Fake Data//
const JohnGoal1 = {
    title: 'Complete Finance Report',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '11-14-2022',
    endDate: '11-18-2022',
    creationDate: '10-18-2022',
    creatorId: 1,
    commentIDs: 1,
    _id: 0
}
const JohnGoal2 = {
    title: 'Set Up Meeting With Stacy',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '11-10-2022',
    endDate: '11-20-2022',
    creationDate: '10-18-2022',
    creatorId: 1,
    commentIDs: 1,
    _id: 1
}

const StacyGoal1 = {
    title: 'Send Manager Work Evaluation',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '11-1-2022',
    endDate: '12-1-2022',
    creationDate: '10-18-2022',
    creatorId: 2,
    commentIDs: 1,
    _id: 2
}
const StacyGoal2 = {
    title: 'Review Internship Applications',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '11-1-2022',
    endDate: '11-20-2022',
    creationDate: '10-18-2022',
    creatorId: 2,
    commentIDs: 1,
    _id: 3
}

const stacy = {
    _id: 2, 
    employeeId: 2,  
    firstName: 'Stacy',
    lastName: 'Clarke',
    companyId: 2,
    managerId: 0,
    subordinateIDs: [0],
    goalIDs: [2, 3]
}
const john = {
    _id: 1, 
    employeeId: 1,  
    firstName: 'John',
    lastName: 'Smith',
    companyId: 2,
    managerId: 0,
    subordinateIDs: [0],
    goalIDs: [0, 1]
}

//The employees you manage:
const reports = [stacy, john]
//List of all there goals
const goals = [JohnGoal1, JohnGoal2, StacyGoal1, StacyGoal2]

function getFullName(params) {
    const empID = params.getValue(params.id, 'creatorId') 
    for (const emp of reports){
        if(empID == emp['employeeId']){
            return (emp['firstName'] + ' ' + emp['lastName']).toString();
        }
    }
}
const columns = [
    {field: 'fullName', headerName: 'Name', flex: 1, headerClassName: styles.headerLeft, valueGetter: getFullName, filterable: true, sortable: false},
    {field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.header, filterable: false, sortable: false},
    {field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header, filterable: false, sortable: false},
    {field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header, filterable: false, sortable: false},
    {field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight, filterable: false, sortable: false},
]

export default function MegaTable(){
    return(
        <div>
            <DataGrid
            style = {{height:600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3'}}
            getRowId={(row) => row._id}
            rows = {goals}
            columns = {columns}
            disableColumnSelector
            />
        </div>

    )
        
}