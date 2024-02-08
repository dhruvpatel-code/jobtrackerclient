import styles from '../styles/Home.module.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <main className={styles.mainContent}>
            <h1>Welcome to Job Tracker</h1>
            <p className={styles.leadText}>Keep track of all jobs applied easily!</p>
            <p className={styles.leadText}>
                <Link to="/" className={`${styles.btnCustom} ${styles.btnLg} ${styles.btnLight}`}>Learn more</Link>
            </p>
        </main>
    );
}

export default Home;
