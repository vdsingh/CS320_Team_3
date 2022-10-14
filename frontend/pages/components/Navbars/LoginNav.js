import Image from 'next/image'
import styles from '../../../styles/navbar.module.css'

const Navbar = () => {
    return (
        <div>
            <div className = {styles.image}>
                <Image 
                    src = {'/images/UKG_Logo.png'}
                    alt = "Company Logo"
                    width = {96}
                    height = {33}
                />
                
            </div>
        </div>
        
    )
}

export default Navbar