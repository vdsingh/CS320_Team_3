import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

var testMan1 = {
    name: 'Hai Nguyen',
    position_title: 'Principal Engineering Manager'
}

export default function EmployeeName(){
    const router = useRouter()

    return(
        <div>
            <div className={styles.title} id={styles.manager_title}> Your Manager </div>
            <div className={styles.manager_box}>
                <h1 className={styles.emp_name}>{testMan1.name}</h1>
                <h2 className={styles.job_title}>{testMan1.position_title}</h2>
            </div>
        </div>
       
    )
}