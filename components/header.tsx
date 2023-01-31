import styles from '@/styles/Header.module.scss';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link href={'/'}>Header</Link>
            </div>
            <Link href={'/matches'}>
                <button className={styles.button} role="link">Matches</button>
            </Link>
            <Link href={'/results'}>
                <button className={styles.button} role="link">Results</button>
            </Link>

        </header>
    )
}

export default Header;