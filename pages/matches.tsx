import Head from "next/head";
import Header from "@/components/header";
import styles from "@/styles/Matches.module.scss";
import React from "react";
import Image from "next/image";

const Matches = () => {
    return (
        <>
            <Head>
                <title>Matches | GoStars</title>
                <meta name="description" content="Matches page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.page_headline}>Matches</div>
                    <MatchesSublist/>
                    <MatchesSublist/>
                    <MatchesSublist/>
                    <MatchesSublist/>
                </div>
            </main>
        </>
    )
}

const MatchesSublist = () => {
    return (
        <div className={styles.matches_sublist}>
            <div className={styles.headline}>Tuesday - 2023-01-31</div>
            <MatchCell/>
            <MatchCell/>
            <MatchCell/>
        </div>
    )
}

const MatchCell = () => {
    return (
        <div className={styles.match}>
            <table>
                <tbody>
                <tr>
                    <td className={styles.match_info}>
                        <div className={styles.match_time}>14:00</div>
                        <div className={styles.match_meta}>bo3</div>
                    </td>
                    <TeamCell teamType={'team1'}/>
                    <td className={styles.score}>
                        <span className={styles.dash}>vs</span>
                    </td>
                    <TeamCell teamType={'team2'}/>
                    <td className={styles.match_additional}>
                        <Image
                            loader={() => 'https://i.imgur.com/t1HQOz0.png'}
                            src={'https://i.imgur.com/t1HQOz0.png'}
                            alt={'BLAST Premier Spring Groups 2023'}
                            width={30}
                            height={30}/>
                        <span className={styles.match_type}>LAN</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const TeamCell = ({teamType}: any) => {
    return (
        <td className={styles.team_cell}>
            <div className={`${styles.line_align} ${styles[teamType]}`}>
                <div className={styles.team}>
                    Natus Vincere
                </div>
                <Image
                    loader={() => 'https://svgur.com/i/pvM.svg'}
                    src={'https://svgur.com/i/pvM.svg'}
                    alt={'team_logo'}
                    className={styles.team_logo}
                    width={30}
                    height={30}/>
            </div>
        </td>
    )
}

export default Matches;