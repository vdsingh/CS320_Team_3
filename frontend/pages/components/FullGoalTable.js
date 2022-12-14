import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
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


const dateComparator = (v1, v2) => {
    const date1 = new Date(v1)
    const date2 = new Date(v2)
    return date1 - date2
}

const columns = [
    {field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.headerLeft},
    {field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header, sortComparator: dateComparator},
    {field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header, sortComparator: dateComparator},
    {field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight}
]

export default function GoalForm() {
    // Get user from cookies
    let userCookie = getCookie('login')
    try {
        if (userCookie == undefined) throw "Try signing in again"
        userCookie = JSON.parse(userCookie)
    }
    catch (err) {
        console.log(err)
    }

    const [goalsData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/goals/byUserId/"+userCookie.user._id)
        .then(response => response.json())
        .then(data => setTableData(data.goals))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })
    }, [])

    return(
        <div >
            <DataGrid
            style = {{height:600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3'}}
            getRowId={(row) => row._id}
            rows = {goalsData}
            columns = {columns}
            onRowClick = {(row) => Router.push({pathname: '/pages/your-goal', query: {id: row.row._id}})}
            disableColumnSelector
            />
        </div>
    )
        
}