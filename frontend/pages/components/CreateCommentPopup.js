import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../../styles/popup.module.css'
import Router from 'next/router'
import { getCookie } from 'cookies-next'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '70%',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
if (typeof document !== 'undefined') {
    Modal.setAppElement(document.getElementById('root'));
}

const submit = async (event) => {
    event.preventDefault()
    //const currentTime =  new Date()
    const commentDescription = event.target.commentDescription.value

    // Client-side check of password and email validity
    if (commentDescription == '') {
        alert('Please fill in the textbox')
    }

    else {
        //var creatorIdForTest = "633e058b0ac635fe4d8300ee"
        var creatorIdForTest = ""
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

        var goalIdForTest = ""
        const getGoalIdFromCookies = async () => {
            if (getCookie('login') != undefined) {
                if (process.browser) {
                    var cookiesData = JSON.parse(getCookie('login'))
                    return cookiesData.goal._id
                }
            }
            else {
                return goalIdForTest
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: commentDescription,
                timeStamp: Date(),
                creatorId: await getCreatorIdFromCookies(),
                goalId: await  getGoalIdFromCookies(),
            })
        }
        // API request to the login API
        fetch('http://localhost:3000/api/comments', requestOptions)
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

var currTime = Date()
const getCreatorFromCookies = () => {
    if (getCookie('login') != undefined) {
        if (process.browser) {
            var cookiesData = JSON.parse(getCookie('login'))
            console.log(cookiesData.user.firstName)
            console.log(cookiesData.user.lastName)
            var CreatorName = String(cookiesData.user.firstName) + " " + String(cookiesData.user.lastName)
            return CreatorName
        }
    }
    else {
    }
}

function CreateCommentPopup() {
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
        <button className={styles.createButton} onClick={openModal}>Create Comment</button>
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Modal"
        >
            <button onClick={closeModal} className={styles.CloseButton}>Close</button>
            <div className={styles.heading}>Create your comment</div>
            <form onSubmit={submit}>
                <div className={styles.text}>Comment title:</div>
                <input id='commentBody' type='text' placeholder='Enter your comment' className={styles.input} required></input>
                <span>
                    <a className={styles.text}>Time:</a>
                    <input id='startDate' type='text' value={currTime} className={styles.input} readOnly></input>
                </span>
                <div className={styles.text}>Creator:</div>
                <input id='creator' type='text' value={getCreatorFromCookies()} className={styles.input} readOnly></input>
                <button type='submit' className={styles.modalButton}>Create Comment</button>
            </form>
        </Modal>
    </a>
    );
}

export default CreateCommentPopup
