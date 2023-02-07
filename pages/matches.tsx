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
import Link from "next/link";


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
    const {team1, team2, matchEvent, matchType} = match;
    const time = new Date(Date.parse(match.date)).toTimeString().slice(0, 5);

    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    return (
        <div className={styles.match}>
            <Link style={{width: '100%'}} href={`match/${match.id}`}>
                <table>

                    <tbody>
                    <tr>
                        <td className={styles.match_info}>
                            <div className={styles.match_time}>{time}</div>
                            <div className={styles.match_meta}>{match.meta}</div>
                        </td>
                        <TeamCell teamType={'team1'} teamInfo={team1}/>
                        <td className={styles.score}>
                            <span className={styles.dash}>vs</span>
                        </td>
                        <TeamCell teamType={'team2'} teamInfo={team2}/>
                        <td className={styles.match_additional}>
                            <Image
                                src={matchEvent.logo}
                                alt={matchEvent.name}
                                width={30}
                                height={30}/>
                            <span className={styles.match_type}>{matchType}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Link>
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