import Head from "next/head";
import Header from "@/components/header";
import React, {MouseEventHandler, useState} from "react";
import styles from '@/styles/Results.module.scss';
import Image from "next/image";
import {clsx} from 'clsx';
import {useSelector} from "react-redux";
import {selectMatches} from "@/store/matches/matchesSlice";
import {NextPage} from "next";
import {IMatch, IMatches, ITeam} from "@/store/matches/matches.types";
import {MatchProps, TeamCellProps} from "@/types/types";
import {TimeoutId} from "@reduxjs/toolkit/src/query/core/buildMiddleware/types";

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

    return (
        <div className={styles.result}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
            <table>
                <tbody>
                <tr>
                    <TeamCell teamType={'team1'} isWon={true} teamInfo={match.team1}/>
                    <td className={styles.score}>
                        <div className={styles.score_wrapper}>
                            {isHover
                                ?
                                <div className={styles.detailed_score}>
                                    <div className={styles.map_score}>
                                        <span className={styles.score_won}>16</span>
                                        <span className={styles.dash}>-</span>
                                        <span className={styles.score_lost}>4</span>
                                    </div>
                                    <div className={styles.map_score}>
                                        <span className={styles.score_lost}>14</span>
                                        <span className={styles.dash}>-</span>
                                        <span className={styles.score_won}>16</span>
                                    </div>
                                    <div className={styles.map_score}>
                                        <span className={styles.score_won}>16</span>
                                        <span className={styles.dash}>-</span>
                                        <span className={styles.score_lost}>12</span>
                                    </div>
                                </div>
                                :
                                <div className={styles.main_score}>
                                    <span className={styles.score_won}>{match.score[0]}</span>
                                    <span className={styles.dash}>{match.score[1]}</span>
                                    <span className={styles.score_lost}>{match.score[2]}</span>
                                </div>}
                        </div>
                    </td>
                    <TeamCell teamType={'team2'} teamInfo={match.team2}/>
                    <td className={styles.event}>
                        <Image
                            src={match.matchEvent.logo}
                            alt={match.matchEvent.name}
                            width={30}
                            height={30}/>
                        <span className={styles.event_name}>{match.matchEvent.name}</span>
                    </td>
                    <td className={styles.match_type}>
                        <div>{match.matchType}</div>
                        <div>{match.meta}</div>
                    </td>
                </tr>
                </tbody>
            </table>
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