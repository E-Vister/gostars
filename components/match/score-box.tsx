import styles from "@/styles/Match.module.scss";
import {clsx} from "clsx";
import Image from "next/image";
import Spacer from "@/components/spacer";
import React from "react";
import {NextPage} from "next";
import {IMatch} from "@/store/matches/matches.types";
import Countdown from "@/components/countdown";
import {dateFormatter} from "@/utils/dateFormatter";

type Props = {
    match: IMatch,
}

const ScoreBox: NextPage<Props> = ({match}) => {
    const parsedDate = new Date(Date.parse(match.date));
    const time = parsedDate.toTimeString().slice(0, 5);
    const date = dateFormatter.scoreBox(parsedDate);

    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    return (
        <div className={`${styles.scoreBox} ${clsx({
            [styles.upcoming]: match.status === 'upcoming',
        })}`}>
            <div className={styles.team}>
                <Image src={`/static/flags/${match.team1.country}.png`}
                       alt={match.team1.country}
                       className={`${styles.team_country} ${styles.team1}`}
                       width={300}
                       height={180}
                       priority/>
                <div className={`${styles.score_gradient} ${styles.team1_gradient} ${clsx({
                    [styles.ended]: match.status === 'ended',
                    [styles.lost]: match.score.main.team1 < match.score.main.team2,
                    [styles.won]: match.score.main.team1 > match.score.main.team2
                })}`}>
                    <Image src={match.team1.logo}
                           alt={match.team1.name}
                           className={styles.team_logo}
                           width={70}
                           height={70}
                    />
                    <Spacer height={'4px'}/>
                    <div className={styles.team_name}>{match.team1.name}</div>
                    <Spacer height={'2px'}/>
                    <div className={`${styles.win_indicator} ${clsx({
                        [styles.lost]: match.score.main.team1 < match.score.main.team2,
                        [styles.won]: match.score.main.team1 > match.score.main.team2
                    })}`}/>
                </div>
            </div>
            <div className={`${styles.match_info} ${clsx({
                [styles.right_won]: match.status === 'ended' && match.score.main.team1 < match.score.main.team2,
                [styles.left_won]: match.status === 'ended' && match.score.main.team1 > match.score.main.team2
            })}`}>
                <div className={styles.heading}>
                    {match.status === 'upcoming'
                        ? time
                        : `${match.score.main.team1} - ${match.score.main.team2}`}
                </div>
                <div className={styles.date}>{date}</div>
                <div className={styles.event_name}>{match.matchEvent.name}</div>
                <Spacer height={'8px'}/>
                <div className={styles.countdown}>
                    {match.status === 'upcoming'
                        ? <Countdown targetDate={parsedDate.getTime()}/>
                        : `Match over`}
                </div>
            </div>
            <div className={styles.team}>
                <Image src={`/static/flags/${match.team2.country}.png`}
                       alt={match.team2.country}
                       className={`${styles.team_country} ${styles.team2}`}
                       width={300}
                       height={180}
                       priority/>
                <div className={`${styles.score_gradient} ${styles.team2_gradient} ${clsx({
                    [styles.ended]: match.status === 'ended',
                    [styles.lost]: match.score.main.team2 < match.score.main.team1,
                    [styles.won]: match.score.main.team2 > match.score.main.team1
                })}`}>
                    <Image src={match.team2.logo}
                           alt={match.team2.name}
                           className={styles.team_logo}
                           width={70}
                           height={70}
                    />
                    <Spacer height={'4px'}/>
                    <div className={styles.team_name}>{match.team2.name}</div>
                    <Spacer height={'2px'}/>
                    <div className={`${styles.win_indicator} ${clsx({
                        [styles.lost]: match.score.main.team2 < match.score.main.team1,
                        [styles.won]: match.score.main.team2 > match.score.main.team1
                    })}`}/>
                </div>
            </div>
        </div>
    )
}

export default ScoreBox;