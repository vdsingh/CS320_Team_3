import Head from 'next/head'
import React, { useState, useEffect } from "react"
import Layout from '../components/Layout'
import styles from '../../styles/goal.module.css'
import { useRouter } from 'next/router'

export default function SingleGoal(){
    // Get query param from router
    const router = useRouter()
    const {
        isReady,
        query: {
          id,
        }
    } = router;

    const [testGoal, setTableData] = useState([])

    useEffect(() => {
        if (!isReady) {
            console.log('Router not ready')
            return;
        }

        const getData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/goals/byGoalId/"+id)
                if (!response.ok) {
                    throw new Error(response.status)
                }
                const data = await response.json();
                setTableData(data.goal);
            } catch(err) {
                console.error('There was an error!', err)
            }  
        }
        getData()
    }, [isReady])

    return (
        <div>
            <div className={styles.grid}>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Name: 
                            <div className={styles.box_text}> {testGoal.title}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Start Date: 
                            <div className={styles.box_text}> {testGoal.startDate}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            End Date: 
                            <div className={styles.box_text}> {testGoal.endDate}</div>
                        </h3>
                    </div>
                </div>
                <div>    
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Progress: 
                                <div className={styles.box_text}> {testGoal.status}</div>
                        </h3>
                    </div>
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Goal Type: 
                                <div className={styles.box_text}> {testGoal.goalType}</div>
                        </h3>
                    </div>
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Description: 
                            <div className={styles.box_text}> {testGoal.description}</div>
                        </h3>
                    </div>
                </div>
            </div>
    )
}