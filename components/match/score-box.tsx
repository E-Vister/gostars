import styles from "@/styles/Match.module.scss";
import {clsx} from "clsx";
import Image from "next/image";
import Spacer from "@/components/spacer";
import React from "react";
import {NextPage} from "next";
import {IMatch} from "@/store/matches/matches.types";
import Countdown from "@/components/countdown";

type Props = {
    match: IMatch,
}

const ScoreBox: NextPage<Props> = ({match}) => {
    const parsedDate = new Date(Date.parse(match.date));
    const time = parsedDate.toTimeString().slice(0, 5);
    const date = dateFormatter(parsedDate);

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
                <Image src={'https://i.imgur.com/nuR1QQ5.png'}
                       alt={'team1country'}
                       className={`${styles.team_country} ${styles.team1}`}
                       width={300}
                       height={180}/>
                <div className={`${styles.score_gradient} ${styles.team1_gradient} ${clsx({
                    [styles.ended]: match.status === 'ended',
                })}`}>
                    <Image src={match.team1.logo}
                           alt={match.team1.name}
                           className={styles.team_logo}
                           width={70}
                           height={70}
                    />
                    <Spacer height={'4px'}/>
                    <div className={styles.team_name}>{match.team1.name}</div>
                </div>
            </div>
            <div className={styles.match_info}>
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
                <Image src={'https://i.imgur.com/JEIaAt6.png'}
                       alt={'team2country'}
                       className={`${styles.team_country} ${styles.team2}`}
                       width={300}
                       height={180}/>
                <div className={`${styles.score_gradient} ${styles.team2_gradient} ${clsx({
                    [styles.ended]: match.status === 'ended',
                })}`}>
                    <Image src={match.team2.logo}
                           alt={match.team2.name}
                           className={styles.team_logo}
                           width={70}
                           height={70}
                    />
                    <Spacer height={'4px'}/>
                    <div className={styles.team_name}>{match.team2.name}</div>
                </div>
            </div>
        </div>
    )
}

const dateFormatter = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    const dayEnd = (day.toString().slice(-1) === '1')
        ? `${day}st` : day.toString().slice(-1) === '2'
            ? `${day}nd` : day.toString().slice(-1) === '3'
                ? `${day}rd` : `${day}th`;

    return `${dayEnd} ${month} ${year}`;
}

export default ScoreBox;