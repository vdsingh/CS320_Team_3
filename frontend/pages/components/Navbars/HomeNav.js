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
                <button className={styles.button} onClick={() => router.push('/pages/login-page')}>Sign In</button>
            </div>
        </div>        
    )
}

export default Navbar