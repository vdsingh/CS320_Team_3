import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
import styles from '../../styles/GoalTable.module.css'
import { getCookie } from 'cookies-next'
import Router from 'next/router'

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
    const [empArray, setEmpArray] = useState([])

    
    const columns = [
        { field: 'fullName', headerName: 'Name', flex: 1, headerClassName: styles.headerLeft, valueGetter: getFullName, filterable: true, sortable: false },
        { field: 'title', headerName: 'Goal Title', flex: 1, headerClassName: styles.header, filterable: false, sortable: false },
        { field: 'startDate', headerName: 'Start Date 2', flex: .5, headerClassName: styles.header, filterable: false, sortable: true },
        { field: 'endDate', headerName: 'Due By', flex: .5, headerClassName: styles.header, filterable: false, sortable: true },
        { field: 'status', headerName: 'Status', flex: .5, headerClassName: styles.headerRight, filterable: false, sortable: false },
    ]

    useEffect(() => {
            fetch("http://localhost:3000/api/users/"+userCookie.user.employeeId+"/"+userCookie.user.companyId)
            .then(response => response.json())
            .then(data => setEmpArray(data.user))
            .catch(error => {
                console.error("There was an error!", error)
                alert(error)
            })
        }
    , [])
    useEffect(() => {
        let arr = []
            empArray.forEach(emp => {
                fetch("http://localhost:3000/api/goals/byUserId/" + emp._id)
                .then(response => response.json())
                .then(data => {
                    arr = [...arr, ...data.goals]
                    if(arr.length > tableData.length){
                        setTableData(arr)
                    }
                    
                })
                .catch(error => {
                    console.error("There was an error!", error)
                    alert(error)
                })
            })
        }
        , [empArray])

    function getFullName(params) {
        const empID = params.getValue(params.id, 'creatorUId')
        for (const emp of empArray) {
            if (empID == emp['_id']) {
                return (emp['firstName'] + ' ' + emp['lastName']).toString();
            }
        }
    }
     return (
         <div>
             <DataGrid
                 style={{ height: 600, width: '90%', margin: 'auto', borderRadius: '20px', backgroundColor: '#81b3b3' }}
                 getRowId={(row) => row._id}
                 rows={tableData}
                 columns={columns}
                 onRowClick = {(row) => Router.push({pathname: '/pages/your-goal', query: {id: row.row._id}})}
                 disableColumnSelector
             />
         </div>
     )
}
