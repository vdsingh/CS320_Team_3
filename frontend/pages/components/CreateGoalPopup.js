import React from 'react';
import ReactDOM from 'react-dom';
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

const submit = async (event) => {
    event.preventDefault()
    const goalName = event.target.goalName.value
    //const currentTime =  new Date()
    const startDate = new Date(event.target.startDate.value.concat("T00:00:00"))
    //const status = event.target.status.value
    const dueDate = new Date(event.target.dueDate.value.concat("T23:59:59"))
    const goalDescription = event.target.goalDescription.value
    const goalType = event.target.goalType.value

    // Client-side check of password and email validity
    if (goalName == '' || dueDate == '' || goalDescription == '' || goalType == '') {
        alert('Please fill all the boxes')
    }
    else if(startDate > dueDate){
        alert('Due Date cannot be earlier than the start Date')
    }

    else {
        var creatorIdForTest = "633e058b0ac635fe4d8300ee"

        const getCreatorIdFromCookies = async () => {
            if (getCookie('login') != undefined) {
                if (process.browser) {
                    var cookiesData = JSON.parse(getCookie('login'))
                    return cookiesData.user._id
                }
            }
            else {
                return creatorIdForTest
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: goalName,
                description: goalDescription,
                goalType: goalType,
                status: "In Progress",
                priorityValue: 1,
                startDate: startDate,
                endDate: dueDate,
                creatorId: await getCreatorIdFromCookies(),
                commentIds: []
            })
        }
        // API request to the login API
        fetch('http://localhost:3000/api/goals', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log(data);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                // If there is no error, proceed to the next page
                else {
                    alert(data.message);
                    console.log(data)
                    Router.reload(window.location.pathname)
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert(error);
            });
    }
}

function CreateGoalPopup() {
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
            <button className={styles2.button} onClick={openModal}>Create Goal</button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Modal"
            >
                <button onClick={closeModal} className={styles.CloseButton}>close</button>
                <div className={styles.heading}>Create your goal</div>
                <form onSubmit={submit}>
                    <div className={styles.text}>Name of Goal:</div>
                    <input id='goalName' type='text' placeholder='Come up with a concise label for what you are hoping to achieve this upcoming business period. 
Ex. Obtain a Certification
Go to networking events' className={styles.input} required></input>
                    <div className={styles.text}>Start Date:</div>
                    <input id='startDate' type='date' placeholder='MM-DD-YYYY' className={styles.input} required></input>
                    <div className={styles.text}>Due Date:</div>
                    <input id='dueDate' type='date' placeholder='MM-DD-YYYY' className={styles.input} required></input>
                    <div className={styles.text}>Goal Description:</div>
                    <input id='goalDescription' type='text' placeholder='Here you can be more detailed with tasks associated with this goal.
Ex. How do you plan to achieve your goal?' className={styles.input} required></input>
                    <div className={styles.text}>Type of Goal:</div>
                    <select name="goalTypes" id="goalType" className={styles.input} required>
                        <option value="Performance">Performance</option>
                        <option value="Developmental">Developmental</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <button type='submit' className={styles.LoginButton}>Create goal</button>
                </form>
            </Modal>
        </a>
    );
}

export default CreateGoalPopup