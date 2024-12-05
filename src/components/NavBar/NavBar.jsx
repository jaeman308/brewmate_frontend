import { Link } from 'react-router-dom';
import {AuthedUserContext} from '../../App'
import {useContext} from'react';

const NavBar = ({ handleSignout }) => {
    const user = useContext(AuthedUserContext)
    return (
        <>
        { user ? (
            <nav>
                <ul>
                    <li> <Link to="/">DashBoard</Link></li>
                    <li><Link to="/coffeelogs/new">Coffee Log</Link></li>
                    <li><Link to="" onClick={handleSignout}>Sing Out</Link></li>
                </ul>
            </nav>
        ):(
            <nav>
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