import {Link} from 'react-router-dom';

const CoffeelogList = (props) => {
    return (
        <main>
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