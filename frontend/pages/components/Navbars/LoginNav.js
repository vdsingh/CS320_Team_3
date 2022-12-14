import Image from 'next/image'
import styles from '../../../styles/navbar.module.css'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    const handleClick = () => {
        router.push('/pages/Home')
    }

    return (
        <div className={styles.topnav}>
            <div className = {styles.image} >
                <a onClick= {handleClick}><Image 
                    src = {'/images/UKG_Logo.png'}
                    alt = "Company Logo"
                    width = {96}
                    height = {33}
                /></a>      
            </div>
        </div>        
    )
}

export default Navbar