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
    Router.reload(window.location.pathname)
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
