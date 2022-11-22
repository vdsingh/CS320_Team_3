import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
import styles from '../../styles/GoalTable.module.css'
import { getCookie } from 'cookies-next'

//Fake Data//
const JohnGoal1 = {
    title: 'John Goal 1',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '10-18-2022',
    endDate: '10-20-2022',
    creationDate: '10-18-2022',
    creatorId: 1,
    commentIDs: 1,
    _id: 0
}
const JohnGoal2 = {
    title: 'John Goal 2',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '10-18-2022',
    endDate: '10-20-2022',
    creationDate: '10-18-2022',
    creatorId: 1,
    commentIDs: 1,
    _id: 1
}

const StacyGoal1 = {
    title: 'Stacy Goal 1',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '10-18-2022',
    endDate: '10-20-2022',
    creationDate: '10-18-2022',
    creatorId: 2,
    commentIDs: 1,
    _id: 2
}
const StacyGoal2 = {
    title: 'Stacy Goal 2',
    description: 'Testing Goal Description',
    goalType: 'Performance',
    status: 'In Progress',
    priorityValue: 1,
    startDate: '10-18-2022',
    endDate: '10-20-2022',
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

// userform
// "user": {
//     "_id": "63448bbbf55d476a2ee14d7b",
//     "firstName": "Vik",
//     "lastName": "Singh",
//     "email": "vdsingh@umass.edu",
//     "password": "password",
//     "isManager": true,
//     "subordinateIDs": [],
//     "goalIDs": [],
//     "creationDate": "2022-10-10T21:16:43.463Z",
//     "lastUpdatedDate": "2022-10-10T21:16:43.463Z",
//     "lastLoginDate": "2022-10-10T21:16:43.463Z",
//     "__v": 0
// }

//The employees you manage:
const reports = [stacy, john]
//List of all there goals
const goals = [JohnGoal1, JohnGoal2, StacyGoal1, StacyGoal2]

function getFullName(params) {
    const empID = params.getValue(params.id, 'creatorId')
    for (const emp of reports) {
        if (empID == emp['employeeId']) {
            return (emp['firstName'] + ' ' + emp['lastName']).toString();
        }
    }
}
const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1, headerClassName: styles.headerLeft, valueGetter: getFullName, filterable: true, sortable: false },
    { field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.header, filterable: false, sortable: false },
    { field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header, filterable: false, sortable: false },
    { field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header, filterable: false, sortable: false },
    { field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight, filterable: false, sortable: false },
]

export default function MegaTable() {

    const router = useRouter()
    //gets user cookies
    let userCookie = getCookie('login')
    try {
        if (userCookie == undefined) throw "Try signing in again"
        userCookie = JSON.parse(userCookie)
    }
    catch (err) {
        console.log(err)
    }

    const [goalsData, setTableData] = useState([])
    const [nameData, setNameData] = useState("")

    useEffect(() => {
        fetch("http://localhost:3000/api/goals/byUserId/" + userCookie.user._id)
            .then(response => response.json())
            .then(data => setTableData(data.goals))
            .catch(error => {
                console.error("There was an error!", error)
                alert(error)
            })

        fetch("http://localhost:3000/api/users/" + userCookie.user._id)
            .then(response => response.json())
            .then(data => setNameData(data.user.firstName + " " + data.user.lastName))
            // .then(data => console.log(data.user.firstName + " " + data.user.lastName))
            .catch(error => {
                console.error("There was an error!", error)
                alert(error)
            })

    }, [])
    return (
        <div>
            {console.log(goalsData)}
            <DataGrid
                style={{ height: 600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3' }}
                getRowId={(row) => row._id}
                rows={goalsData}
                columns={columns}
                disableColumnSelector
            />
        </div>
    )
}
