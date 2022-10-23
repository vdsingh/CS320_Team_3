import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

var testEmp1 = {
    name: 'Arthur Read',
    position_title: 'Principal Engineering Manager'
}

export default function EmployeeName(){
    const router = useRouter()

    return(
        <div className={styles.emp_box}>
        <h1 className={styles.emp_name}>{testEmp1.name}</h1>
        <h2 className={styles.job_title}>{testEmp1.position_title}</h2>
        </div>
    )
}