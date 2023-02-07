import Head from "next/head";
import Header from "@/components/header";
import React from "react";
import styles from '@/styles/Match.module.scss';
import {NextPage} from "next";
import {useRouter} from "next/router";
import Image from "next/image";
import Spacer from "@/components/spacer";

const Match: NextPage = () => {
    const router = useRouter()
    const {id} = router.query

    return (
        <>
            <Head>
                <title>Natus Vincere vs. G2 | GoStars</title>
                <meta name="description" content="Match page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.scoreBox}>
                            <div className={styles.team}>
                                <Image src={'https://i.imgur.com/nuR1QQ5.png'}
                                       alt={'team1country'}
                                       className={`${styles.team_country} ${styles.team1}`}
                                       width={300}
                                       height={180}/>
                                <div className={styles.team1_gradient}>
                                    <Image src={'https://svgur.com/i/pvM.svg'}
                                           alt={'Natus Vincere'}
                                           className={styles.team_logo}
                                           width={70}
                                           height={70}
                                    />
                                    <Spacer height={'4px'}/>
                                    <div className={styles.team_name}>Natus Vincere</div>
                                </div>
                            </div>
                            <div className={styles.matchInfo}>
                                <div className={styles.heading}>2 - 1</div>
                                <div className={styles.date}>7th of February 2023</div>
                                <div className={styles.event_name}>BLAST Premier Spring Groups 2023</div>
                                <Spacer height={'8px'}/>
                                <div className={styles.countdown}>Match over</div>
                            </div>
                            <div className={styles.team}>
                                <Image src={'https://i.imgur.com/JEIaAt6.png'}
                                       alt={'team2country'}
                                       className={`${styles.team_country} ${styles.team2}`}
                                       width={300}
                                       height={180}/>
                                <div className={styles.team2_gradient}>
                                    <Image src={'https://i.imgur.com/3oqItcT.png'}
                                           alt={'G2'}
                                           className={styles.team_logo}
                                           width={70}
                                           height={70}
                                    />
                                    <Spacer height={'4px'}/>
                                    <div className={styles.team_name}>G2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.picks}></div>
                    <div className={styles.maps}></div>
                </div>
            </main>
        </>
    )
}

export default Match;