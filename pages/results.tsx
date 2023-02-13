import Head from "next/head";
import Header from "@/components/header";
import React, {useState} from "react";
import styles from '@/styles/Results.module.scss';
import Image from "next/image";
import {clsx} from 'clsx';
import {NextPage} from "next";
import {IMatch, IMatches} from "@/store/matches/matches.types";
import {MatchProps, TeamCellProps} from "@/types/types";
import {TimeoutId} from "@reduxjs/toolkit/src/query/core/buildMiddleware/types";
import Link from "next/link";
import {matchesAPI} from "@/api/api";
import {dateFormatter} from "@/utils/dateFormatter";

type Props = {
    matches: IMatch[]
}

const Results: NextPage<Props> = ({matches}) => {
    matches = matches.filter(match => match.status === 'ended');
    const dates = matches
        .map((match) => new Date(Date.parse(match.date)))
        .filter((value, index, array) => array.indexOf(value) === index);

    const resultsSublists = dates.map((date) => {
        return <ResultsSublist
            key={date.getTime()}
            matches={matches
                .filter((m, i) => new Date(Date.parse(m.date)).toDateString() === date.toDateString())}
        />
    });

    console.log(dates);

    if (!matches || matches.length === 0) {
        return <div></div>
    }

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
                    {resultsSublists}
                </div>
            </main>
        </>
    )
}

const ResultsSublist: NextPage<IMatches> = ({matches}) => {
    const date = dateFormatter.results(new Date(Date.parse(matches[0].date)));

    const resultsCells = matches.map((match) => {
        return <ResultCell key={match.id} match={match}/>
    })

    return (
        <div className={styles.results_sublist}>
            <div className={styles.headline}>{`Results for ${date}`}</div>
            {resultsCells}
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
        }, 450)
    }

    const mapsScore = score.maps.map((mapInfo) => {
        return (
            <div className={styles.map_score} key={`${mapInfo.name}-${match.id}`}>
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

export async function getStaticProps() {
    const matches = await matchesAPI.getMatches();

    return {
        props: {matches}
    }
}