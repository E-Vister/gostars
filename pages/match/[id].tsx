import Head from "next/head";
import Header from "@/components/header";
import React from "react";
import styles from '@/styles/Match.module.scss';
import {NextPage} from "next";
import {useRouter} from "next/router";
import Image from "next/image";
import Spacer from "@/components/spacer";
import Bo3Pattern from "@/components/match/bo3-pattern";
import {useSelector} from "react-redux";
import {selectMatches} from "@/store/matches/matchesSlice";
import UpcomingPattern from "@/components/match/upcoming-pattern";
import Bo5Pattern from "@/components/match/bo5-pattern";
import Bo1Pattern from "@/components/match/bo1-pattern";

const Match: NextPage = () => {
    const router = useRouter()
    const id = router.query.id || 0;
    const match = useSelector(selectMatches).find(match => match.id === +id);

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
                        <div className={styles.picks}>
                            {(match && match.status === 'ended')
                                ? match.meta === 'bo1'
                                    ? <Bo1Pattern team1={match.team1} team2={match.team2} picks={match.picks}/>
                                    : match.meta === 'bo3'
                                        ? <Bo3Pattern team1={match.team1} team2={match.team2} picks={match.picks}/>
                                        : <Bo3Pattern team1={match.team1} team2={match.team2} picks={match.picks}/>
                                : <UpcomingPattern/>}
                        </div>
                        <div className={styles.maps}></div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Match;