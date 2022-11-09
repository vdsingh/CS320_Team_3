import Image from 'next/image'
import styles from '../../../styles/navbar.module.css'
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next'

const Navbar = () => {
    const router = useRouter()
    const signOut = () => {
        deleteCookie('login')
        router.push('/pages/Home')
    }
    return (
        <div>
            <div className = {styles.image} >
                <Image 
                    src = {'/images/UKG_Logo.png'}
                    alt = "Company Logo"
                    width = {96}
                    height = {33}
                />     
                <button className={styles.nav_button} onClick={() => router.push('/pages/employee-page')}>Profile</button>
                <button className={styles.nav_button} onClick={() => router.push('/pages/goal-page')}>Goals</button>
                <button className={styles.button} onClick={() => signOut()}>Sign Out</button>
            </div>
        </div>        
    )
}

export default Navbar