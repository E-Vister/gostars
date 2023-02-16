import Head from "next/head";
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
import {useIntl} from "react-intl";
import {useSelector} from "react-redux";
import {selectLocale} from "@/store/app/appSlice";

type Props = {
    matches: IMatch[]
}

const Results: NextPage<Props> = ({matches}) => {
    const intl = useIntl()

    if (!matches || matches.length === 0) {
        return <div></div>
    }

    return (
        <>
            <Head>
                <title>{`${intl.formatMessage({id: 'results_title'})} GoStars`}</title>
                <meta name="description" content="Results page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <ResultsContainer matches={matches}/>
                </div>
            </main>
        </>
    )
}

export const ResultsContainer: NextPage<Props> = ({matches}) => {
    const intl = useIntl()

    const dates = matches
        .map((match) => new Date(Date.parse(match.date)))
        .sort((a, b) => +b - +a)
        .map((date) => date.toDateString())
        .filter((value, index, array) => array.indexOf(value) === index);

    const resultsSublists = dates.map((date, index) => {
        return <ResultsSublist
            key={`${date}-${index}`}
            matches={matches
                .filter((m, i) => new Date(Date.parse(m.date)).toDateString() === date)}
        />
    });


    if (resultsSublists.length === 0) {
        return <div className={styles.empty}>{intl.formatMessage({id: 'empty_matches_message'})}</div>
    } else {
        return <>{resultsSublists}</>
    }
}

const ResultsSublist: NextPage<IMatches> = ({matches}) => {
    const intl = useIntl()
    const currentLocale = useSelector(selectLocale);
    const date = dateFormatter.results(new Date(Date.parse(matches[0].date)), currentLocale);

    const resultsCells = matches.map((match) => {
        return <ResultCell key={match.id} match={match}/>
    })

    return (
        <div className={styles.results_sublist}>
            <div className={styles.headline}>
                {`${intl.formatMessage({id: 'results_sublist'})} ${date}`}
            </div>
            {resultsCells}
        </div>
    )
}

const ResultCell: NextPage<MatchProps> = ({match}) => {
    const [isHover, setIsHover] = useState(false);
    const {score, team1, team2, matchEvent, matchType} = match;
    const teamWon = (score.main.team1 > score.main.team2) ? 'team1' : 'team2';
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

    if (mapsScore.length === 0) mapsScore.push(((
        <div className={styles.map_score} key={`$Score-${match.id}`}>
                <span className={`${clsx({
                    [styles.score_won]: score.main.team1 > score.main.team2,
                    [styles.score_lost]: score.main.team1 < score.main.team2,
                    [styles.score_draw]: score.main.team1 === score.main.team2,
                })}`}>{score.main.team1}</span>
            <span className={styles.dash}>-</span>
            <span className={`${clsx({
                [styles.score_won]: score.main.team2 > score.main.team1,
                [styles.score_lost]: score.main.team2 < score.main.team1,
                [styles.score_draw]: score.main.team2 === score.main.team1,
            })}`}>{score.main.team2}</span>
        </div>
    )))

    return (
        <div className={styles.result}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}>
            <Link style={{width: '100%'}} href={`../match/${match.id}`}>
                <table>
                    <tbody>
                    <tr>
                        <TeamCell teamType={'team1'} isWon={teamWon === "team1"} teamInfo={team1}/>
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
                                    })}`}>{score.main.team1}</span>
                                        <span className={styles.dash}>-</span>
                                        <span className={`${clsx({
                                            [styles.score_won]: score.main.team2 > score.main.team1,
                                            [styles.score_lost]: score.main.team2 < score.main.team1,
                                            [styles.score_draw]: score.main.team2 === score.main.team1,
                                        })}`}>{score.main.team2}</span>
                                    </div>}
                            </div>
                        </td>
                        <TeamCell teamType={'team2'} isWon={teamWon === "team2"} teamInfo={team2}/>
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
    const matches = await matchesAPI.getResults();

    return {
        props: {matches}
    }
}