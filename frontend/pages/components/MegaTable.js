import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
import styles from '../../styles/GoalTable.module.css'
import { getCookie } from 'cookies-next'

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
// const reports = [stacy, john]

// const empArray = useState([])
// useEffect(() => {
//     fetch("http://localhost:3000/api/users/"+userCookie.user.employeeId+"/"+userCookie.user.companyId)
//     .then(response => response.json())
//     .then(data => getFullName(data.user))
//     .catch(error => {
//         console.error("There was an error!", error)
//         alert(error)
//     })
// }, [])

//List of all there goals
const goals = [JohnGoal1, JohnGoal2, StacyGoal1, StacyGoal2]

// function getFullName(params) {
//     const empID = params.getValue(params.id, 'creatorId')
//     for (const emp of empArray) {
//         if (empID == emp['employeeId']) {
//             return (emp['firstName'] + ' ' + emp['lastName']).toString();
//         }
//     }
// }
// const columns = [
//     { field: 'fullName', headerName: 'Name', flex: 1, headerClassName: styles.headerLeft, valueGetter: getFullName, filterable: true, sortable: false },
//     { field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.header, filterable: false, sortable: false },
//     { field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header, filterable: false, sortable: false },
//     { field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header, filterable: false, sortable: false },
//     { field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight, filterable: false, sortable: false },
// ]

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

    const [tableData, setTableData] = useState([])
    // const [nameData, setNameData] = useState("")
    const [empArray, setEmpArray] = useState([])


    const columns = [
        { field: 'fullName', headerName: 'Name', flex: 1, headerClassName: styles.headerLeft, valueGetter: getFullName, filterable: true, sortable: false },
        { field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.header, filterable: false, sortable: false },
        { field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header, filterable: false, sortable: false },
        { field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header, filterable: false, sortable: false },
        { field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight, filterable: false, sortable: false },
    ]

    useEffect(() => {

        // fetch("http://localhost:3000/api/users/" + userCookie.user._id)
        //     .then(response => response.json())
        //     .then(data => setNameData(data.user.firstName + " " + data.user.lastName))
        //     // .then(data => console.log(data.user.firstName + " " + data.user.lastName))
        //     .catch(error => {
        //         console.error("There was an error!", error)
        //         alert(error)
        //     })

        fetch("http://localhost:3000/api/users/"+userCookie.user.employeeId+"/"+userCookie.user.companyId)
        .then(response => response.json())
        .then(data => setEmpArray(data.user))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })

        empArray.forEach(emp => {
            fetch("http://localhost:3000/api/goals/byUserId/" + emp._id)
            .then(response => response.json())
            .then(data => setTableData([...tableData, ...data.goals]))
            .catch(error => {
                console.error("There was an error!", error)
                alert(error)
            })
        })

    })

    // function getFullName(goal) {
    //     // console.log(params) 
    //     const empID = goal['creatorUId']
        
    //     for (const emp of empArray) {
    //         if (empID == emp['employeeId']) {
    //             return (emp['firstName'] + ' ' + emp['lastName']).toString();
    //         }
    //     }
    // }

    function getFullName(params) {
        const empID = params.getValue(params.id, 'creatorUId')
        for (const emp of empArray) {
            if (empID == emp['_id']) {
                return (emp['firstName'] + ' ' + emp['lastName']).toString();
            }
        }
    }
    console.log(tableData)
     return (
         <div>
             <DataGrid
                 style={{ height: 600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3' }}
                 getRowId={(row) => row._id}
                 rows={tableData}
                 columns={columns}
                 disableColumnSelector
             />
         </div>
     )
}
