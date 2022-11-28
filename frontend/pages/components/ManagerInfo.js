import React from 'react';
import styles from '../../styles/employee.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'

const getManagerInfo = () =>{
    //placeholder
    var [loginInfo, setLoginInfo] = useState({user: {firstName: "", lastnName: "", position_title: ''}})
    if (getCookie("login") != undefined){
        useEffect(() => setLoginInfo(JSON.parse(getCookie("login"))), [])
        //var loginInfo = JSON.parse(getCookie("login"))
    }

    var man = {
        hasMan: loginInfo.user.managerId,
        firstname: loginInfo.user.firstName,
        lastname: loginInfo.user.lastName,
        fullname: loginInfo.user.firstName +" "+ loginInfo.user.lastName,
        position_title: loginInfo.user.positionTitle
    }
    return man
}

export default function EmployeeName(){
    const router = useRouter()
    if (getManagerInfo.hasMan) {
        return(
            <div>
                <div className={styles.title} id={styles.manager_title}> Your Manager </div>
                    <div className={styles.manager_box}>
                        <h1 className={styles.emp_name}>{man.fullname}</h1>
                        <h2 className={styles.job_title}>{man.position_title}</h2>
                    </div>
            </div>
        )
    } else {
        return(
            <div>
                
            </div>
        )
    }

}