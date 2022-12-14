import LoginNav from '../components/Navbars/LoginNav'
import HomeNav from '../components/Navbars/HomeNav'
import EmployeeNav from '../components/Navbars/EmployeeNav'
import ManagerNav from '../components/Navbars/ManagerNav'

const Layout = ({ children, navbarType }) => {
    return (
        //Here is where You can put different navbars for different windows
        //navbarType 1 is the navbar for the login page
        <div>
            {navbarType == 1 &&  <LoginNav />}
            {navbarType == 2 &&  <HomeNav />}
            {navbarType == 3 && <EmployeeNav />}
            {navbarType == 4 && <ManagerNav />}
            {children}
            
        </div>
    );
}

export default Layout;