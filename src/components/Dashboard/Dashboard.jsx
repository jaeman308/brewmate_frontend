import {Link} from 'react-router-dom';
 const Dashboard = ({user}) => {
    return (
        <main>
            <h1> Welcome, {user.username}</h1>
            <div>
                <h2> Your coffee collection here!</h2>
            </div>
        </main>
    )
 };

 export default Dashboard;
 