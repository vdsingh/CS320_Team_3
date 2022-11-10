import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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

const columns = [
    {field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.headerLeft},
    {field: 'startDate', headerName: 'Start Date', flex: .5, headerClassName: styles.header},
    {field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header},
    {field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight}
]

export default function GoalForm() {
    // Get user from cookies
    const userCookie = getCookie('login')
    if (userCookie == undefined) {
        alert("Try signing in again")
    } 
    const loginCookie = JSON.parse(userCookie)

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/api/goals/byUserId/"+loginCookie.user._id)
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
            rows = {tableData}
            columns = {columns}
            />
        </div>
    )
        
}