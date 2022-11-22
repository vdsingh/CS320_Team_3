import React, { useState, useEffect } from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'


export default function GoalForm(){
    const router = useRouter()

    let userCookie = getCookie('login')
    try {
        if (userCookie == undefined) throw "Try signing in again"
        userCookie = JSON.parse(userCookie)
    }
    catch (err) {
        console.log(err)
    }

    const [empArray, setTableData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/api/users/"+userCookie.user.employeeId+"/"+userCookie.user.companyId)
        .then(response => response.json())
        .then(data => setTableData(data.user))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })
    }, [])

    return(
        <div>
            <div className={styles.title} id={styles.manager_title}> Your Reports </div>
            <div className={styles.app}>
                {empArray.map((emp) => 
                    <div className={styles.emp_grid}>
                        <h1 className={styles.emp_name}>{emp.firstName + " " + emp.lastName}</h1>
                        <h2 className={styles.job_title}>{emp.positionTitle}</h2>
                    </div>
                )}
            </div>
        </div>

    )
}