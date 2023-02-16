import Head from "next/head";
import Header from "@/components/header";
import React from "react";
import styles from '@/styles/Match.module.scss';
import {GetServerSideProps, NextPage} from "next";
import Bo3Pattern from "@/components/match/picks/bo3-pattern";
import UpcomingPattern from "@/components/match/upcoming-pattern";
import Bo5Pattern from "@/components/match/picks/bo5-pattern";
import Bo1Pattern from "@/components/match/picks/bo1-pattern";
import ScoreBox from "@/components/match/score-box";
import StreamEmbed from "@/components/stream-embed";
import Maps from "@/components/match/maps/maps";
import {matchesAPI} from "@/api/api";
import {IMatch} from "@/store/matches/matches.types";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector} from "react-redux";
import {selectLocale} from "@/store/app/appSlice";

type Props = {
    match: IMatch,
}

const Match: NextPage<Props> = ({match}) => {
    const intl = useIntl();
    const currentLocale = useSelector(selectLocale);

    if (!match) {
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
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <ScoreBox match={match}/>

                        <span className={styles.paragraph_heading}>{match.status === 'ended'
                            ? intl.formatMessage({id: 'picks'})
                            : currentLocale === 'en-US'
                                ? `Best of ${match.meta.slice(-1)} (${match.matchType})`
                                : `BO${match.meta.slice(-1)} (${match.matchType})`}
                        </span>
                        <div className={styles.picks}>
                            {(match && match.status === 'ended' || match.picks.length > 0)
                                ? match.meta === 'bo1'
                                    ? <Bo1Pattern team1={match.team1}
                                                  team2={match.team2}
                                                  picks={match.picks}
                                                  firstPick={match.score.firstPick}/>
                                    : match.meta === 'bo3'
                                        ? <Bo3Pattern team1={match.team1}
                                                      team2={match.team2}
                                                      picks={match.picks}
                                                      firstPick={match.score.firstPick}/>
                                        : <Bo5Pattern team1={match.team1}
                                                      team2={match.team2}
                                                      picks={match.picks}
                                                      firstPick={match.score.firstPick}/>
                                : <UpcomingPattern/>}
                        </div>

                        <span className={styles.paragraph_heading}>
                            {<FormattedMessage id={'maps_header'}/>}
                        </span>
                        <Maps maps={match.score.maps}
                              teams={{team1: match.team1, team2: match.team2}}
                              meta={match.meta}/>

                        <span style={{paddingBottom: `5px`, marginTop: '0px !important'}}
                              className={styles.paragraph_heading}>
                            {`${intl.formatMessage({id: 'match_watch'})} ${match.team1.name} vs. ${match.team2.name}`}
                        </span>
                        <StreamEmbed embedLink={match.stream}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Match;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    if (params && params.id) {
        const match = await matchesAPI.getMatchById(+params?.id || 1);

        return {
            props: {match}
        }
    }

    return {
        props: {match: undefined}
    }
}