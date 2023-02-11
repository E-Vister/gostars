import styles from "@/styles/Match.module.scss";
import Image from "next/image";
import React from "react";
import {NextPage} from "next";
import {ITeams} from "@/types/types";
import {IMap, ITeam} from "@/store/matches/matches.types";
import {clsx} from "clsx";

type MapPickProps = {
    map?: IMap;
    teams?: ITeams;
}

const MapCard: NextPage<MapPickProps> = ({map, teams}) => {
    const mapImageSrc: string = map ? `/static/4x5/maps/de_${map.name.toLowerCase()}.png` : '/static/4x5/maps/map_placeholder.png';
    const mapPickTeam: string = map?.pickedBy !== 'decider' && map && teams ? teams[map.pickedBy].logo : '/placeholder.svg';
    let totalSidesScore: Array<number> = [];

    if (map !== undefined) {
        totalSidesScore = [map.team1.ctSideScore + map.team2.tSideScore, map.team2.ctSideScore + map.team1.tSideScore];
    }

    const halfScores = [
        <>
            <span className={styles.ct}>{`${map?.team1.ctSideScore}`}</span>
            <span>:</span>
            <span className={styles.t}>{`${map?.team2.tSideScore}`}</span>
        </>,
        <>
            <span className={styles.t}>{`${map?.team1.tSideScore}`}</span>
            <span>:</span>
            <span className={styles.ct}>{`${map?.team2.ctSideScore}`}</span>
        </>
    ];

    return (
        <div className={styles.map_card}>
            <div className={styles.map_banner_box}>
                <Image
                    src={mapImageSrc}
                    alt={map?.name || `Map`}
                    className={styles.map_banner}
                    width={160}
                    height={200}/>
                <div className={`${styles.picked_by} ${clsx({
                    [styles.decider]: map?.pickedBy === 'decider'
                })}`}>
                    <div className={`${styles.wrapper} ${clsx({
                        [styles.upcoming]: !map,
                    })}`}>
                        <span className={styles.map_pick_span}>
                            {map && map.pickedBy !== 'decider' ? `picked by ` : 'decider'}
                        </span>
                        {map && map.pickedBy !== 'decider'
                            ? <Image src={mapPickTeam} alt={`Picked by`} width={25} height={25}/>
                            : <></>}
                    </div>
                </div>
            </div>
            <div className={styles.map_info}>
                <div className={styles.map_name}>{map?.name || `TBA`}</div>
                <div className={styles.map_score_info}>
                    <Team team={teams?.team1}/>
                    <div className={styles.map_scores}>
                        <div className={styles.main_score}>
                            {`${map?.team1.totalScore || '0'} - ${map?.team2.totalScore || '0'}`}
                        </div>
                        <div className={styles.sides_score}>
                            <span>(</span>
                            {map ? totalSidesScore[0] > 15
                                ? halfScores[0] : halfScores[1] : '-'}
                            <span>, </span>
                            {map ? totalSidesScore[0] < 15
                                ? halfScores[0] : halfScores[1] : '-'}
                            <span>)</span>
                        </div>
                    </div>
                    <Team team={teams?.team2}/>
                </div>
            </div>
        </div>
    )
}

type TeamProps = {
    team: ITeam | undefined;
}

const Team: NextPage<TeamProps> = ({team}) => {
    const logo = team?.logo || '/placeholder.svg';
    const name = team?.name || `TBA`;

    return (
        <div>
            <Image
                src={logo}
                alt={name}
                width={60}
                height={60}
                className={`${clsx({
                    [styles.logo_placeholder]: !team,
                })}`}
            />
        </div>
    )
}

export default MapCard;