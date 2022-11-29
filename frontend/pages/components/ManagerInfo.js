import React, { useState, useEffect } from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from 'cookies-next'


var testMan1 = {
    name: 'Hai Nguyen',
    position_title: 'Principal Engineering Manager'
}

export default function EmployeeName(){
    const router = useRouter()

    let userCookie = getCookie('login')
    try {
        if (userCookie == undefined) throw "Try signing in again"
        userCookie = JSON.parse(userCookie)
    }
    catch (err) {
        console.log(err)
    }

    const [manager, setTableData] = useState([])
    useEffect(() => {
        fetch("http://localhost:3000/api/users/getUser/"+userCookie.user.managerId+"/"+userCookie.user.companyId)
        .then(response => response.json())
        .then(data => setTableData(data.user))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })
    }, [])
    console.log(manager)
    return(
        <div>
            <div className={styles.title} id={styles.manager_title}> Your Manager </div>
            <div className={styles.manager_box}>
                <h1 className={styles.emp_name}>{manager.firstName + " " + manager.lastName}</h1>
                <h2 className={styles.job_title}>{manager.position_title}</h2>
            </div>
        </div>
       
    )
}