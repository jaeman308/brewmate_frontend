import {Link} from 'react-router-dom';
import Styles from './DashBoard.module.css'

 const Dashboard = ({user}) => {
    return (
        <main >
            <h1> Welcome, {user.username.toUpperCase()}</h1>
            <div>
                <h2>Explore your collection here!</h2>
                <ul className={Styles.ul}>
                    <li className={Styles.coffeebeans}>
                        <img src="https://i.postimg.cc/Mp80WNyL/2.png" alt="coffee bag"/>
                        <Link to="/coffeelogs/Coffee%20Beans">Coffee Beans</Link>
                        </li>
                    <li className={Styles.coffeeshops}>
                    <img src="https://i.postimg.cc/pdsKJdgN/4.png" alt="coffee shop"/>
                        <Link to="/coffeelogs/Coffee%20Shops">Coffee Shops</Link></li>
                    <li className={Styles.coffeerecipes}>
                    <img src="https://i.postimg.cc/GtyYRx9r/3.png" alt="coffee recipes"/>
                        <Link to="/coffeelogs/Coffee%20Recipes">Coffee Recipes</Link></li>
                </ul>
            </div>
        </main>
    )
 };

 export default Dashboard;
