import Image from 'next/image'
import styles from '../../../styles/navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter()
    const handleClick = () => {
        router.push('/pages/Home')
    }

    return (
        <div>
            <div className = {styles.image} >
                <a onClick= {handleClick}><Image 
                    src = {'/images/UKG_Logo.png'}
                    alt = "Company Logo"
                    width = {96}
                    height = {33}
                /></a>      
                <button className={styles.button} onClick={() => router.push('/pages/login-page')}>Sign In</button>
            </div>
        </div>        
    )
}

export default Navbar