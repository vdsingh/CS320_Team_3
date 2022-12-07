import React, { useState, useEffect } from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from 'cookies-next'

export default function EmployeeName(){
    const router = useRouter()

    const [hasManager, setManagerId] = useState(undefined)
    const [manager, setManData] = useState([])
    useEffect(() => {
        const userCookie = getCookie('login')
        var managerId = undefined
        var companyId = undefined
        try {
            if (userCookie == undefined) throw "Try signing in again"
            managerId = JSON.parse(userCookie).user.managerId
            companyId = JSON.parse(userCookie).user.companyId
        }
        catch (err) {
            console.log(err)
        }
        const getData = async (managerId, companyId) => {
            try {
                const response = await fetch("http://localhost:3000/api/users/getUser/"+managerId+"/"+companyId)
                if (!response.ok) {
                    throw new Error(response.status)
                }
                const data = await response.json();
                setManData(data.user);
            } catch(err) {
                console.error('There was an error!', err)
            }  
        }
        // check if this employee has a manager
        if (managerId) {
            setManagerId(managerId)
            getData(managerId, companyId)
        }
    })

    if (hasManager) {
        return(
            <div>
                <div className={styles.title} id={styles.manager_title}> Your Manager </div>
                <div className={styles.manager_box}>
                    <h1 className={styles.emp_name}>{manager.firstName + " " + manager.lastName}</h1>
                    <h2 className={styles.job_title}>{manager.positionTitle}</h2>
                </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}