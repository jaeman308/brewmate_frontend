import {Link} from 'react-router-dom';
import styles from '../CoffeeLogList/coffeeloglist.module.css'

const CoffeelogList = (props) => {
    return (
        <main className={styles.container}>
            {props.coffeelogs.map((coffeelog) => (
                <Link key={coffeelog._id} to={`/coffeelogs/${coffeelog._id}`}>
                    <article>
                        <header>
                            <h2>{coffeelog.title}</h2>
                            <p>
                                {coffeelog.author.username} posted on 
                                {new Date(coffeelog.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
}

export default CoffeelogList;