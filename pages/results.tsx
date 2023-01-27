import Head from "next/head";
import Header from "@/components/header";
import React from "react";
import styles from '@/styles/Results.module.scss';
import Image from "next/image";

const Results = () => {
    return (
        <>
            <Head>
                <title>Results | GoStars</title>
                <meta name="description" content="Home page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.container}>

                </div>
            </main>
        </>
    )
}

const ResultsSublist = () => {
    return (
        <>
            <div className={styles.headline}>Results for January 27th 2023</div>
            <ResultCell/>
        </>
    )
}

const ResultCell = () => {
    return (
        <div className={styles.result}>
            <table>
                <tr>
                    <TeamCell/>
                    <td className={styles.score}>
                        <span className={styles.score_won}>2</span>
                        -
                        <span className={styles.score_lost}>1</span>
                    </td>
                    <TeamCell/>
                    <td className={styles.event}>
                        <Image src={'#'} alt={'BLAST Premier Spring Groups 2023'}/>
                    </td>
                    <td className={styles.match_type}>
                        <span>LAN</span>
                        <span>bo3</span>
                    </td>
                </tr>
            </table>
        </div>
    )
}

const TeamCell = () => {
    return (
        <td className={styles.team_cell}>
            <div>
                <div className={styles.team}></div>
                <Image src={'#'} alt={'team_logo'}/>
            </div>
        </td>
    )
}

export default Results;