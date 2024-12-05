import {Link} from 'react-router-dom';

 const Dashboard = ({user}) => {
    return (
        <main>
            <h1> Welcome, {user.username}</h1>
            <div>
                <h2>Explore your collection here!</h2>
                <ul>
                    <li><Link to="/coffee-beans">Coffee Beans</Link></li>
                    <li><Link to="/coffee-shops">Coffee Shops</Link></li>
                    <li><Link to="/coffee-recipes">Coffee Recipes</Link></li>
                </ul>
            </div>
        </main>
    )
 };

 export default Dashboard;
 