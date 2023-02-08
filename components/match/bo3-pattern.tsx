import PickCard from "@/components/match/pick-card";
import React from "react";
import {NextPage} from "next";
import {BestOfXPageProps} from "@/types/types";



const Bo3Pattern: NextPage<BestOfXPageProps> = ({team1 , team2, picks}) => {
    return (
        <>
            <PickCard
                teamName={team1.name}
                teamLogo={team1.logo}
                map={picks[0]}
                banned/>
            <PickCard
                teamName={team2.name}
                teamLogo={team2.logo}
                map={picks[1]}
                banned/>
            <PickCard
                teamName={team1.name}
                teamLogo={team1.logo}
                map={picks[2]}/>
            <PickCard
                teamName={team2.name}
                teamLogo={team2.logo}
                map={picks[3]}/>
            <PickCard
                teamName={team1.name}
                teamLogo={team1.logo}
                map={picks[4]}
                banned/>
            <PickCard
                teamName={team2.name}
                teamLogo={team2.logo}
                map={picks[5]}
                banned/>
            <PickCard decider map={picks[6]}/>
        </>
    )
}

export default Bo3Pattern;