import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import {NextPage} from "next";
import {clsx} from "clsx";
import Image from "next/image";

type Props = {
    isHomePage?: boolean;
}

const Header: NextPage<Props> = ({isHomePage}) => {
    return (
        <header className={styles.container}>
            <div className={`${styles.wrapper} ${clsx({
                [styles.home_page]: isHomePage,
            })}`}>
                <div className={styles.logo}>
                    <Link href={'/'}><Image  src={`/logo.png`} alt={'GoStars'} width={50} height={33}/></Link>
                </div>
                <Link href={'/matches'}>
                    <button className={styles.button} role="link">Matches</button>
                </Link>
                <Link href={'/results'}>
                    <button className={styles.button} role="link">Results</button>
                </Link>
            </div>
        </header>
    )
}

export default Header;