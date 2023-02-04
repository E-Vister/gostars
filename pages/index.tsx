import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import Header from '@/components/header'
import HomePageSquares from "@/components/home-page-squares";

const Home = () => {
    return (
        <>
            <Head>
                <title>Home | GoStars</title>
                <meta name="description" content="Home page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header isHomePage={true}/>
            <main className={styles.main}>
                <EventItem status={'Previous'}
                           logo={'https://i.imgur.com/A99O1Tu.png'}
                           name={'BLAST Premier Spring Groups 2023'}
                           duration={'Jan 15th - Jan 23th'}/>
                <EventItem status={'Ongoing'}
                           logo={'https://i.imgur.com/9pq9MA4.png'}
                           name={'IEM Katowice 2023'}
                           duration={'Jan 19th - Jan 29th'}/>
                <EventItem status={'Upcoming'}
                           logo={'https://i.imgur.com/uusl30s.png'}
                           name={'ESL Pro League Season 17'}
                           duration={'Feb 4th - Feb 12th'}/>
            </main>
        </>
    )
}

const EventItem = ({status, logo, name, duration}: any) => {
    const logoSrc = logo;
    const statusForStyle = status.toLowerCase();

    return (
        <div className={`${styles.area} ${styles[statusForStyle]}`}>
            <div className={styles.event}>
                <span className={styles.status}>{status}</span>
                <Image
                    loader={() => logoSrc}
                    className={styles.logo}
                    src={logoSrc}
                    alt={'Event logo'}
                    width={130}
                    height={130}
                />
                <span className={styles.name}>{name}</span>
                <span className={styles.duration}>{duration}</span>
            </div>
            <HomePageSquares/>
        </div>
    )
}

export default Home;
