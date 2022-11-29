import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const getManagerInfo = () =>{
    // old implementation that didn't work for people with managers T_T

    // var [loginInfo, setLoginInfo] = useState({user: {firstName: "", lastnName: "", position_title: ''}})
    // if (getCookie("login") != undefined){
    //     useEffect(() => setLoginInfo(JSON.parse(getCookie("login"))), [])
    // }
    // var man = {
    //     hasMan: loginInfo.user.managerId,
    //     firstname: loginInfo.user.firstName,
    //     lastname: loginInfo.user.lastName,
    //     fullname: loginInfo.user.firstName +" "+ loginInfo.user.lastName,
    //     position_title: loginInfo.user.positionTitle
    // }
    // return man

    // new implementation trying to fetch things
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
        // what do i fetch? 
        // i ideally want to be able to call something like manager.firstName and manager.positionTitle
        fetch("http://localhost:3000/api/users/"+userCookie.user.employeeId+"/"+userCookie.user.companyId)
        .then(response => response.json())
        .then(data => setTableData(data.user))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })
    }, [])
    return manager
}

export default function EmployeeName(){
    const router = useRouter()
    // what do i put in the conditional?
    if (getManagerInfo().firstName) {
        return(
            <div>
                <div className={styles.title} id={styles.manager_title}> Your Manager </div>
                    <div className={styles.manager_box}>
                        <h1 className={styles.emp_name}>{getManagerInfo().firstName + " " + getManagerInfo().lastName}</h1>
                        <h2 className={styles.job_title}>{getManagerInfo().positionTitle}</h2>
                    </div>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}