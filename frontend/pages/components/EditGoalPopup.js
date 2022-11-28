import React from 'react';
import Modal from 'react-modal';
import styles from '../../styles/popup.module.css'
import Router from 'next/router'
import styles2 from '../../styles/employee.module.css'
import { getCookie } from 'cookies-next'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '85%',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
if (typeof document !== 'undefined') {
    Modal.setAppElement(document.getElementById('root'));
}
const getCurrentGoal = () => {
    //API integration goes here to get the current goal
    var goalName = 'Goal name'
    var goalDescription = 'Goal description'
    var startDate = "2023-10-23"
    var dueDate ="2023-10-23"
    var goalTypes = 'Developmental'
    var status = 'Incomplete'
    return {goalName: goalName, startDate: startDate, dueDate: dueDate, goalTypes: goalTypes, status: status, goalDescription: goalDescription}
}
const submit = async (event) => {
    event.preventDefault()
    const goalName = event.target.goalName.value
    //const currentTime =  new Date()
    const startDate = new Date(event.target.startDate.value.concat("T00:00:00"))
    const status = event.target.status.value
    const dueDate = new Date(event.target.dueDate.value.concat("T23:59:59"))
    const goalDescription = event.target.goalDescription.value
    const goalType = event.target.goalType.value

    // Client-side check of password and email validity
    if (goalName == '' || dueDate == '' || goalDescription == '' || goalType == '') {
        alert('Please fill all the boxes')
    }
    else if (startDate > dueDate) {
        alert('Due Date cannot be earlier than the start Date')
    }

    else {
    }
}

function EditGoalPopup() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        if (subtitle !== undefined) {
            subtitle.style.color = '#f00';
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <a>
            <button className={styles2.button} onClick={openModal}>Edit Goal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <button onClick={closeModal} className={styles.CloseButton}>close</button>
                <div className={styles.heading}>Edit your goal</div>
                <form onSubmit={submit}>
                    <div className={styles.text}>Name of Goal:</div>
                    <input id='goalName' type='text' defaultValue= {getCurrentGoal().goalName} className={styles.input} required></input>
                    <span>
                        <div>
                            <a className={styles.text}>Start Date:</a>
                            <a className={styles.text2}>Due Date:</a>
                        </div>
                        <input id='startDate' type='date' defaultValue={getCurrentGoal().startDate} className={styles.inputDate} required></input>
                        <input id='dueDate' type='date' defaultValue={getCurrentGoal().dueDate} className={styles.inputDate} required ></input>
                    </span>
                    <div className={styles.text}>Goal Description:</div>
                    <input id='goalDescription' type='text' defaultValue={getCurrentGoal().goalDescription} className={styles.input} required></input>
                    <span>
                        <div>
                            <a className={styles.text}>Type of Goal:</a>
                            <a className={styles.text3}>Status:</a>
                        </div>
                        <select name="goalTypes" id="goalType" className={styles.inputDate} defaultValue={getCurrentGoal().goalTypes} required>
                            <option value="Performance">Performance</option>
                            <option value="Developmental">Developmental</option>
                            <option value="Personal">Personal</option>
                        </select>
                        <select name="status" id="status" className={styles.inputDate} defaultValue={getCurrentGoal().status} required>
                            <option value="In progress">In progress</option>
                            <option value="Incomplete">Incomplete</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </span>
                    <button type='submit' className={styles.LoginButton}>Edit Goal</button>
                </form>
            </Modal>
        </a>
    );
}

export default EditGoalPopup