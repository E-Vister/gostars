import Head from "next/head";
import Header from "@/components/header";
import React from "react";
import styles from '@/styles/Results.module.scss';
import Image from "next/image";
import {clsx} from 'clsx';

const Results = () => {
    return (
        <>
            <Head>
                <title>Results | GoStars</title>
                <meta name="description" content="Results page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.page_headline}>Results</div>
                    <ResultsSublist/>
                    <ResultsSublist/>
                    <ResultsSublist/>
                    <ResultsSublist/>
                </div>
            </main>
        </>
    )
}

const ResultsSublist = () => {
    return (
        <div className={styles.results_sublist}>
            <div className={styles.headline}>Results for January 27th 2023</div>
            <ResultCell/>
            <ResultCell/>
            <ResultCell/>
        </div>
    )
}

const ResultCell = () => {
    return (
        <div className={styles.result}>
            <table>
                <tbody>
                <tr>
                    <TeamCell teamType={'team1'} isWon={true}/>
                    <td className={styles.score}>
                        <span className={styles.score_won}>2</span>
                        <span className={styles.dash}>-</span>
                        <span className={styles.score_lost}>1</span>
                    </td>
                    <TeamCell teamType={'team2'}/>
                    <td className={styles.event}>
                        <Image
                            loader={() => 'https://i.imgur.com/t1HQOz0.png'}
                            src={'https://i.imgur.com/t1HQOz0.png'}
                            alt={'BLAST Premier Spring Groups 2023'}
                            width={30}
                            height={30}/>
                        <span className={styles.event_name}>BLAST Premier Spring Groups 2023</span>
                    </td>
                    <td className={styles.match_type}>
                        <div>LAN</div>
                        <div>bo3</div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const TeamCell = ({teamType, isWon}: any) => {
    return (
        <td className={styles.team_cell}>
            <div className={`${styles.line_align} ${styles[teamType]}`}>
                <div className={`${styles.team} ${clsx({
                    [styles.team_won]: isWon === true,
                })}`}>
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

export default Results;