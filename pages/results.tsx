import Head from "next/head";
import Header from "@/components/header";
import React, {useState} from "react";
import styles from '@/styles/Results.module.scss';
import Image from "next/image";
import {clsx} from 'clsx';
import {useSelector} from "react-redux";
import {selectMatches} from "@/store/matches/matchesSlice";
import {NextPage} from "next";
import {IMatches} from "@/store/matches/matches.types";
import {MatchProps, TeamCellProps} from "@/types/types";
import {TimeoutId} from "@reduxjs/toolkit/src/query/core/buildMiddleware/types";
import Link from "next/link";

const Results: NextPage = () => {
    const matches = useSelector(selectMatches);

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
                    <ResultsSublist matches={matches}/>
                    <ResultsSublist matches={matches}/>
                    <ResultsSublist matches={matches}/>
                    <ResultsSublist matches={matches}/>
                </div>
            </main>
        </>
    )
}

const ResultsSublist: NextPage<IMatches> = ({matches}) => {
    return (
        <div className={styles.results_sublist}>
            <div className={styles.headline}>Results for January 27th 2023</div>
            <ResultCell match={matches[1]}/>
            <ResultCell match={matches[1]}/>
            <ResultCell match={matches[1]}/>
        </div>
    )
}

const ResultCell: NextPage<MatchProps> = ({match}) => {
    const [isHover, setIsHover] = useState(false);
    const {score, team1, team2, matchEvent, matchType} = match;
    let timer: TimeoutId;

    const onMouseEnter = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setIsHover(true);
        }, 500)
    }

    const onMouseLeave = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setIsHover(false)
        }, 500)
    }

    const mapsScore = score.maps.map((mapInfo) => {
        return (
            <div className={styles.map_score} key={`${mapInfo.map}-${match.id}`}>
                <span className={`${clsx({
                    [styles.score_won]: mapInfo.team1.totalScore > mapInfo.team2.totalScore,
                    [styles.score_lost]: mapInfo.team1.totalScore < mapInfo.team2.totalScore,
                    [styles.score_draw]: mapInfo.team1.totalScore === mapInfo.team2.totalScore,
                })}`}>{mapInfo.team1.totalScore}</span>
                <span className={styles.dash}>-</span>
                <span className={`${clsx({
                    [styles.score_won]: mapInfo.team2.totalScore > mapInfo.team1.totalScore,
                    [styles.score_lost]: mapInfo.team2.totalScore < mapInfo.team1.totalScore,
                    [styles.score_draw]: mapInfo.team2.totalScore === mapInfo.team1.totalScore,
                })}`}>{mapInfo.team2.totalScore}</span>
            </div>
        )
    })

    return (
        <div className={styles.result}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
            <Link style={{width: '100%'}} href={`match/${match.id}`}>
                <table>
                    <tbody>
                    <tr>
                        <TeamCell teamType={'team1'} isWon={true} teamInfo={team1}/>
                        <td className={styles.score}>
                            <div className={styles.score_wrapper}>
                                {isHover
                                    ?
                                    <div className={styles.detailed_score}>
                                        {mapsScore}
                                    </div>
                                    :
                                    <div className={styles.main_score}>
                                    <span className={`${clsx({
                                        [styles.score_won]: score.main.team1 > score.main.team2,
                                        [styles.score_lost]: score.main.team1 < score.main.team2,
                                        [styles.score_draw]: score.main.team1 === score.main.team2,
                                    })}`}>{match.score.main.team1}</span>
                                        <span className={styles.dash}>-</span>
                                        <span className={`${clsx({
                                            [styles.score_won]: score.main.team2 > score.main.team1,
                                            [styles.score_lost]: score.main.team2 < score.main.team1,
                                            [styles.score_draw]: score.main.team2 === score.main.team1,
                                        })}`}>{match.score.main.team2}</span>
                                    </div>}
                            </div>
                        </td>
                        <TeamCell teamType={'team2'} teamInfo={team2}/>
                        <td className={styles.event}>
                            <Image
                                src={matchEvent.logo}
                                alt={matchEvent.name}
                                width={30}
                                height={30}/>
                            <span className={styles.event_name}>{matchEvent.name}</span>
                        </td>
                        <td className={styles.match_type}>
                            <div>{matchType}</div>
                            <div>{match.meta}</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Link>
        </div>
    )
}

const TeamCell: NextPage<TeamCellProps> = ({teamType, isWon, teamInfo}) => {
    return (
        <td className={styles.team_cell}>
            <div className={`${styles.line_align} ${styles[teamType]}`}>
                <div className={`${styles.team} ${clsx({
                    [styles.team_won]: isWon,
                })}`}>
                    {teamInfo.name}
                </div>
                <Image
                    src={teamInfo.logo}
                    alt={teamInfo.name}
                    className={styles.team_logo}
                    width={30}
                    height={30}/>
            </div>
        </td>
    )
}

export default Results;