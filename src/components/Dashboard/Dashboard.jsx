import {Link} from 'react-router-dom';
 const Dashboard = ({user}) => {
    return (
        <main>
            <h1> Welcome, {user.username}</h1>
            <div>
              <h1> Coming soon show case your access to  other parts of the app.</h1>
            </div>
        </main>
    )
 };

 export default Dashboard;
 