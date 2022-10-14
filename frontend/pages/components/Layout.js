import LoginNav from '../components/Navbars/LoginNav'

const Layout = ({ children, navbarType }) => {
    return (
        //Here is where You can put different navbars for different windows
        //navbarType 1 is the navbar for the login page
        <div>
            { navbarType == 1 &&  <LoginNav />}
            {children}
            
        </div>
    );
}

export default Layout;