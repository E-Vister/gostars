import styles from "@/styles/Match.module.scss";
import MapCard from "@/components/match/maps/map-card";
import React, {} from "react";
import {NextPage} from "next";
import {ITeams} from "@/types/types";
import {IMap} from "@/store/matches/matches.types";

type MapPicksProps = {
    maps: IMap[];
    teams: ITeams;
    meta: string;
}

const Maps: NextPage<MapPicksProps> = ({maps, teams, meta}) => {
    let mapPicksElements: JSX.Element[] = [];

    if (maps && maps.length > 0) {
        mapPicksElements = maps.map((item, index) => {
            return <MapCard key={`${item.name}-map`}
                            map={item}
                            teams={teams}
                            id={index + 1}
            />
        })
    }

    if (maps && maps.length === 0) {
        for (let i = 0; i < +meta.slice(-1); i++) {
            mapPicksElements.push(<MapCard key={`${i}-map`} id={i + 1}/>);
        }
    }

    return (
        <div className={styles.maps}>
            {mapPicksElements}
        </div>
    )
}

export default Maps;