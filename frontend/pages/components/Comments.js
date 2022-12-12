import React, { useState, useEffect } from 'react'
import styles from '../../styles/Comments.module.css'
import Router from 'next/router'
import { DataGrid } from '@material-ui/data-grid'
import Modal from 'react-modal';
import styles2 from '../../styles/popup.module.css'
import { getCookie } from 'cookies-next'
import CreateCommentPopup from './CreateCommentPopup';
import { useRouter } from 'next/router'

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
            var CreatorName = String(cookiesData.user.firstName) + " " + String(cookiesData.user.lastName)
            return CreatorName
        }
    }
}

const getCreatorIdFromCookies= async() => {
    if (getCookie('login') != undefined) {
        if (process.browser) {
            var cookiesData = JSON.parse(getCookie('login'))
            var creatorId = String(cookiesData.user._id)
            return creatorId
        }
    }
}

var fiveComments = []
var i = 0;

export default function CommentForm() {

    // Get query param from router
    const router = useRouter()
    const {
        isReady,
        query: {
            id,
        }
    } = router;

    const [CommentArray, setCommentArray] = useState([])

    useEffect(() => {

        

        if (!isReady) {
            console.log('Router not ready')
            return;
        }

        console.log(id)


    const getData = async () => {
        fetch("http://localhost:3000/api/comments/byGoalId/"+id)
        .then(response => response.json())
        .then(data => setCommentArray([...CommentArray, ...data.comments]))
        .catch(error => {
            console.error("There was an error!", error)
            alert(error)
        })}
        getData()
    
    
    }, [isReady])

    for (let i = 0; i < CommentArray.length; i += 1) {
        if (typeof CommentArray[i] != 'undefined') {
            CommentArray[i]["rowId"] = i
        }
    }

    console.log(CommentArray)
    
    for (let j = 0; i < CommentArray.length; j += 1) {
        if (typeof CommentArray[j] != 'undefined') {
            fiveComments.push(CommentArray[1])
        } else {
            emptyComment.rowId = i
            fiveComments.push(emptyComment)
        }
        i += 1
    }
    const columns = [
        { field: 'creatorName', headerName: 'Creator', flex: .12, headerClassName: styles.headerLeft },
        { field: 'timeStamp', headerName: 'Date', flex: .1, headerClassName: styles.header },
        { field: 'description', headerName: 'Comment', flex: .6, headerClassName: styles.header },
    ]

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    
    const openModal = async(event) => {
        const employeeID = await getCreatorIdFromCookies()
        if (event.row.creatorUId == employeeID){
            await setIsOpen(true);
        }
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
                            <div className={styles2.text}>Comment:</div>
                            <input id='commentDescription' type='text' defaultValue='comment' className={styles2.input} required></input>
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
                    getRowId={(row) => row.rowId}
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