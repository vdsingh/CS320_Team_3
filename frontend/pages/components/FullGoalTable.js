import React from 'react'
import { useRouter } from 'next/router'
import {DataGrid} from '@material-ui/data-grid'
import styles from '../../styles/GoalTable.module.css'
import { getCookie } from 'cookies-next'


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
var testGoal1 = {
    title: 'Complete Mock up ',
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
var testGoal2 = {
    title: 'Complete Data Analysis',
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
const goalArray = [testGoal1, testGoal2]

const columns = [
    {field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.headerLeft},
    {field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header},
    {field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header},
    {field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight}
]

export const getStaticProps = async () => {
    const loginCookie = getCookie('login')
    // console.log(loginCookie)
    // // Cookie not found?
    // if (loginCookie == undefined) {
    //     alert('Error while retrieving login cookie')
    // }
    const userID = loginCookie.user._id

    const res = await fetch('http://localhost:3000/api/goals/byUserId/633e058b0ac635fe4d8300ee')
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        console.log("here");
    })
   const goals = await res.json().goals
    return {
        props: { goals, }
    }
    // https://www.freecodecamp.org/news/how-to-integrate-material-ui-data-grid-in-react-using-data-from-a-rest-api/

}

export default function GoalForm({ goals }) {
    return(
        <div >
            <DataGrid
            style = {{height:600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3'}}
            getRowId={(row) => row._id}
            rows = {goalArray}
            columns = {columns}
            />
        </div>
    )
        
}