import PickCard from "@/components/match/picks/pick-card";
import React from "react";
import {NextPage} from "next";
import {BestOfXPageProps} from "@/types/types";


const Bo3Pattern: NextPage<BestOfXPageProps> = ({team1, team2, picks, firstPick}) => {
    let firstTeam, secondTeam;

    if (firstPick === 'team1') {
        firstTeam = team1;
        secondTeam = team2;
    } else {
        firstTeam = team2;
        secondTeam = team1;
    }

    return (
        <>
            <PickCard
                teamName={firstTeam.name}
                teamLogo={firstTeam.logo}
                map={picks[0]}
                banned/>
            <PickCard
                teamName={secondTeam.name}
                teamLogo={secondTeam.logo}
                map={picks[1]}
                banned/>
            <PickCard
                teamName={firstTeam.name}
                teamLogo={firstTeam.logo}
                map={picks[2]}/>
            <PickCard
                teamName={secondTeam.name}
                teamLogo={secondTeam.logo}
                map={picks[3]}/>
            <PickCard
                teamName={firstTeam.name}
                teamLogo={firstTeam.logo}
                map={picks[4]}
                banned/>
            <PickCard
                teamName={secondTeam.name}
                teamLogo={secondTeam.logo}
                map={picks[5]}
                banned/>
            <PickCard decider map={picks[6]}/>
        </>
    )
}

export default Bo3Pattern;