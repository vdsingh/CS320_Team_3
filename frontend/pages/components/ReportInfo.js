import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'

var testEmp1 = {
    name: 'Piero Merino',
    title: 'Software Engineer I'
}
var testEmp2 = {
    name: 'Chloe Xie',
    title: 'UI/UX Designer'
}
var testEmp3 = {
    name: 'Willow Lafaso',
    title: 'Software Engineer 2'
}
var testEmp4 = {
    name: 'Steve Dang',
    title: 'Product Design'
}

const empArray = [testEmp1, testEmp2, testEmp3, testEmp4]
export default function GoalForm(){
    const router = useRouter()
    return(
        <div>
            <div className={styles.title} id={styles.manager_title}> Your Reports </div>
            <div className={styles.grid}>
                {empArray.map((emp) => 
                    <div className={styles.emp_grid}>
                        <h1 className={styles.emp_name}>{emp.name}</h1>
                        <h2 className={styles.job_title}>{emp.title}</h2>
                    </div>
                )}
            </div>
        </div>

    )
}