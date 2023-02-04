import Head from "next/head";
import Header from "@/components/header";
import styles from "@/styles/Matches.module.scss";
import React from "react";
import Image from "next/image";
import {NextPage} from "next";
import {selectMatches} from "@/store/matches/matchesSlice";
import {IMatches} from "@/store/matches/matches.types";
import {useSelector} from "react-redux";
import {MatchProps, TeamCellProps} from "@/types/types";


const Matches: NextPage = () => {
    const matches = useSelector(selectMatches);

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
                    <MatchesSublist matches={matches}/>
                    <MatchesSublist matches={matches}/>
                    <MatchesSublist matches={matches}/>
                    <MatchesSublist matches={matches}/>
                </div>
            </main>
        </>
    )
}

const MatchesSublist = ({matches}: IMatches) => {
    return (
        <div className={styles.matches_sublist}>
            <div className={styles.headline}>Tuesday - 2023-01-31</div>
            <MatchCell match={matches[0]}/>
            <MatchCell match={matches[0]}/>
            <MatchCell match={matches[0]}/>
        </div>
    )
}

const MatchCell: NextPage<MatchProps> = ({match}) => {
    return (
        <div className={styles.match}>
            <table>
                <tbody>
                <tr>
                    <td className={styles.match_info}>
                        <div className={styles.match_time}>{match.time}</div>
                        <div className={styles.match_meta}>{match.meta}</div>
                    </td>
                    <TeamCell teamType={'team1'} teamInfo={match.team1}/>
                    <td className={styles.score}>
                        <span className={styles.dash}>{match.score}</span>
                    </td>
                    <TeamCell teamType={'team2'} teamInfo={match.team2}/>
                    <td className={styles.match_additional}>
                        <Image
                            src={match.matchEvent.logo}
                            alt={match.matchEvent.name}
                            width={30}
                            height={30}/>
                        <span className={styles.match_type}>{match.matchType}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const TeamCell: NextPage<TeamCellProps> = ({teamType, teamInfo}) => {
    return (
        <td className={styles.team_cell}>
            <div className={`${styles.line_align} ${styles[teamType]}`}>
                <div className={styles.team}>
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

export default Matches;