import Image from 'next/image'
import styles from '../../../styles/navbar.module.css'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    return (
        <div>
            <div className = {styles.image} >
                <Image 
                    src = {'/images/UKG_Logo.png'}
                    alt = "Company Logo"
                    width = {96}
                    height = {33}
                />     
                <button className={styles.nav_button} onClick={() => router.push('/pages/profile')}>Profile</button>
                <button className={styles.nav_button} onClick={() => router.push('/pages/goals')}>Goals</button>
                <button className={styles.nav_button} onClick={() => router.push('/pages/reports')}>Reports</button>
            </div>
        </div>        
    )
}

export default Navbar