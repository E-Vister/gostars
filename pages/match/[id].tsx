import Head from "next/head";
import Header from "@/components/header";
import React from "react";
import styles from '@/styles/Match.module.scss';
import {NextPage} from "next";
import {useRouter} from "next/router";
import Bo3Pattern from "@/components/match/picks/bo3-pattern";
import {useSelector} from "react-redux";
import {selectMatches} from "@/store/matches/matchesSlice";
import UpcomingPattern from "@/components/match/upcoming-pattern";
import Bo5Pattern from "@/components/match/picks/bo5-pattern";
import Bo1Pattern from "@/components/match/picks/bo1-pattern";
import ScoreBox from "@/components/match/score-box";
import YoutubeEmbed from "@/components/youtube-embed";
import Maps from "@/components/match/maps/maps";

const Match: NextPage = () => {
    const router = useRouter()
    const id = router.query.id || 0;
    const match = useSelector(selectMatches).find(match => match.id === +id);

    if (!match) {
        router.push('/404');
        return <div></div>
    }

    return (
        <>
            <Head>
                <title>{`${match.team1.name} vs. ${match.team2.name} | GoStars`}</title>
                <meta name="description" content="Match page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <ScoreBox match={match}/>

                        <span className={styles.paragraph_heading}>{match.status === 'ended'
                            ? `Picks`
                            : `Best of ${match.meta.slice(-1)} (${match.matchType})`}
                        </span>
                        <div className={styles.picks}>
                            {(match && match.status === 'ended')
                                ? match.meta === 'bo1'
                                    ? <Bo1Pattern team1={match.team1} team2={match.team2} picks={match.picks}/>
                                    : match.meta === 'bo3'
                                        ? <Bo3Pattern team1={match.team1} team2={match.team2} picks={match.picks}/>
                                        : <Bo5Pattern team1={match.team1} team2={match.team2} picks={match.picks}/>
                                : <UpcomingPattern/>}
                        </div>

                        <span className={styles.paragraph_heading}>
                            Maps
                        </span>
                        <Maps maps={match.score.maps}
                              teams={{team1: match.team1, team2: match.team2}}
                              meta={match.meta}/>

                        <span style={{paddingBottom: `5px`, marginTop: '0px !important'}}
                              className={styles.paragraph_heading}>
                            {`Watch ${match.team1.name} vs. ${match.team2.name}`}
                        </span>
                        <YoutubeEmbed embedId={`6ASq2clrbs8?start=33200`}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Match;