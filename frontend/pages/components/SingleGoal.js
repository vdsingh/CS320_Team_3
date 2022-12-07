import Head from 'next/head'
import React, { useState, useEffect } from "react"
import Layout from '../components/Layout'
import styles from '../../styles/goal.module.css'

export default function SingleGoal({thisGoal}){
    return (
        <div>
            <div className={styles.grid}>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Name: 
                            <div className={styles.box_text}> {thisGoal.title}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            Start Date: 
                            <div className={styles.box_text}> {thisGoal.startDate}</div>
                        </h3>
                    </div>
                    <div className={styles.goal_grid}>
                        <h3 className={styles.grid_labels}>
                            End Date: 
                            <div className={styles.box_text}> {thisGoal.endDate}</div>
                        </h3>
                    </div>
                </div>
                <div>    
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Progress: 
                                <div className={styles.box_text}> {thisGoal.status}</div>
                        </h3>
                    </div>
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Goal Type: 
                                <div className={styles.box_text}> {thisGoal.goalType}</div>
                        </h3>
                    </div>
                    <div className={styles.box}>
                        <h3 className={styles.box_labels}>
                            Description: 
                            <div className={styles.box_text}> {thisGoal.description}</div>
                        </h3>
                    </div>
                </div>
            </div>
    )
}