import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from 'cookies-next'

const getEmployeeInfo = () =>{
    var loginInfo = JSON.parse(getCookie("login"))
    var emp = {
        firstname: loginInfo.user.firstName,
        lastname: loginInfo.user.lastName,
        fullname: loginInfo.user.firstName +" "+ loginInfo.user.lastName,
        position_title: 'Principal Engineering Manager'
    }
    return emp
}
export default function EmployeeName(){
    const router = useRouter()

    return(
        <div className={styles.emp_box}>
        <h1 className={styles.emp_name}>{getEmployeeInfo().fullname}</h1>
        <h2 className={styles.job_title}>{getEmployeeInfo().position_title}</h2>
        </div>
    )
}