import { Link } from 'react-router-dom';
import {AuthedUserContext} from '../../App'
import {useContext} from'react';
import styles from './NavBar.module.css'

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext)
    return (
        <>
        { user ? (
            <nav className={styles.container}>
              <img src="https://i.postimg.cc/RZVqZ7Zc/MUG-SCOUT-2.png" alt="logo"/>
                <ul>
                    <li> <Link to="/">DashBoard</Link></li>
                    <li><Link to="/coffeelogs">Coffeelogs</Link></li>
                    <li><Link to="/coffeelogs/new">Coffee Log</Link></li>
                    <li><Link to="" onClick={handleSignout}>Sing Out</Link></li>
                </ul>
            </nav>
        ):(
            <nav className={styles.container}>
                <img src="https://i.postimg.cc/RZVqZ7Zc/MUG-SCOUT-2.png" alt="logo"/>
                <ul>
                    <li><Link to="/signin">Sign In</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </nav>

        )}
        </>
    )
}

export default NavBar