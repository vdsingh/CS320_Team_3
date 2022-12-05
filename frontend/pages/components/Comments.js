import React from 'react';
import styles from '../../styles/Comments.module.css'
import Router from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
import Modal from 'react-modal';
import styles2 from '../../styles/popup.module.css'
import { getCookie } from 'cookies-next'
import CreateCommentPopup from './CreateCommentPopup';

function getDateString(d) {
    var month = (d.getMonth() + 1).toString()
    var day = (d.getDate()).toString()
    var year = (d.getFullYear()).toString()
    if (month.length == 1) {
        month = '0' + month
    }
    if (day.length == 1) {
        day = ('0' + day)
    }
    return (month + '/' + day + '/' + year)
}

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

const deleteComment = () =>{
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

//Test Comments
var d1 = new Date('2022-11-14')
var testComment1 = {
    Creator: 'John',
    Date: getDateString(d1),
    Comment: "Good goal to have.",
    creatorId: 1,
    goalId: 1,
    _id: 0
};
var testComment2 = {
    Creator: 'Gordon',
    Date: getDateString(d1),
    Comment: "Keep up the good work!",
    creatorId: 1,
    goalId: 1,
    _id: 1
};
var emptyComment = {
    Creator: '',
    Date: getDateString(d1),
    Comment: "",
    creatorId: 1,
    goalId: 1,
    _id: 99
}
var CommentArray = [testComment1, testComment2]
var fiveComments = []
var i = 0;

export default function CommentForm() {
    for (let j = 0; i < CommentArray.length; j += 1) {
        if (typeof CommentArray[j] != 'undefined') {
            fiveComments.push(CommentArray[1])
        } else {
            emptyComment._id = i
            fiveComments.push(emptyComment)
        }
        i += 1
    }
    const columns = [
        { field: 'Creator', headerName: 'Creator', flex: .12, headerClassName: styles.headerLeft },
        { field: 'Date', headerName: 'Date', flex: .1, headerClassName: styles.header },
        { field: 'Comment', headerName: 'Comment', flex: .6, headerClassName: styles.header },
    ]

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
        <div>
            <div className={styles.box}>
                <a className={styles.title}>
                    Comment
                </a>
                <a>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Modal"
                    >
                        <button onClick={closeModal} className={styles2.CloseButton}>Close</button>
                        <div className={styles2.heading}>Edit Comment</div>
                        <form onSubmit={submit}>
                            <div className={styles2.text}>Comment title:</div>
                            <input id='commentBody' type='text' defaultValue='comment' className={styles2.input} required></input>
                            <span>
                                <a className={styles2.text}>Time:</a>
                                <input id='startDate' type='text' value={currTime} className={styles2.input} readOnly></input>
                            </span>
                            <div className={styles2.text}>Creator:</div>
                            <input id='creator' type='text' value={getCreatorFromCookies()} className={styles2.input} readOnly></input>
                            <button type='submit' className={styles2.modalButton2}>Edit Comment</button>
                            <button onClick={deleteComment} className={styles2.modalButton2}>Delete Comment</button>
                        </form>
                    </Modal>
                </a>
                <CreateCommentPopup />
                <DataGrid
                    style={{ height: 300, width: '92%', margin: 'auto', borderRadius: '20px', backgroundColor: '#CEDFE2', }}
                    getRowId={(row) => row._id}
                    rows={CommentArray}
                    columns={columns}
                    disableColumnSelector={true}
                    hideFooterPagination={true}
                    hideFooterRowCount={true}
                    hideFooterSelectedRowCount={true}
                    autoHeight={true}
                    onRowClick={openModal}
                />
            </div>
        </div>
    )
}