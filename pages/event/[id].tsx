import {GetServerSideProps, NextPage} from "next";
import {matchesAPI} from "@/api/api";
import Image from "next/image";
import React from "react";
import {IEventPageProps} from "@/types/events.types";
import Head from "next/head";
import styles from "@/styles/Event.module.scss";
import s from "@/styles/Results.module.scss"
import {ResultsContainer} from "@/pages/results";
import {dateFormatter} from "@/utils/dateFormatter";
import {useSelector} from "react-redux";
import {selectLocale} from "@/store/app/appSlice";
import {clsx} from "clsx";
import {useIntl} from "react-intl";

type Props = {
    event: IEventPageProps,
}

const Event: NextPage<Props> = ({event}) => {
    if (!event) {
        return <div></div>
    }

    return (
        <>
            <Head>
                <title>{event.name} | GoStars</title>
                <meta name="description" content="Event page of the gostars"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <EventHub event={event}/>
                    <div className={s.container} style={{padding: '10px 6px 0 6px', margin: 0}}>
                        <ResultsContainer matches={event.results}/>
                    </div>

                </div>
            </main>
        </>
    )
}

const EventHub: NextPage<Props> = ({event}) => {
    const intl = useIntl();
    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    const {
        name,
        banner,
        eventStatus,
    } = event;

    let statusMessage;

    switch (eventStatus) {
        case 'Live':
            statusMessage = 'Live'
            break
        case 'Finished':
            statusMessage = intl.formatMessage({id: 'event_finished_status'})
            break
        case 'Upcoming':
            statusMessage = intl.formatMessage({id: 'event_upcoming_status'})
            break
    }

    return (
        <>
            <div className={styles.event_hub}>
                <div className={styles.hub_top}>
                    <div className={`${styles.event_status} ${clsx({
                        [styles.upcoming]: eventStatus.toLowerCase() === 'upcoming',
                        [styles.live]: eventStatus.toLowerCase() === 'live',
                        [styles.finished]: eventStatus.toLowerCase() === 'finished',
                    })}`}>{statusMessage}</div>
                    <div className={styles.banner}>
                        <Image src={banner} alt={name} width={960} height={240} priority/>
                    </div>
                    <div className={styles.event_title}>{name}</div>
                </div>
                <div className={styles.hub_bottom}>
                    <EventTable event={event}/>
                </div>
            </div>
        </>
    )
}

const EventTable: NextPage<Props> = ({event}) => {
    const currentLocale = useSelector(selectLocale);
    const intl = useIntl();

    const {
        location,
        teamsNumber,
        prizePool,
        date
    } = event;

    const dates = date.from === date.to
        ? <>
            <span>{dateFormatter.event(new Date(date.from), currentLocale, 'to')}</span>
        </>
        : <>
            <span>{dateFormatter.event(new Date(date.from), currentLocale, 'from')}</span>
            <span>{` - `}</span>
            <span>{dateFormatter.event(new Date(Date.parse(date.to)), currentLocale, 'to')}</span>
        </>

    return (
        <div className={styles.info}>
            <div className={styles.event_date}>
                <div className={styles.headline}>{intl.formatMessage({id: 'event_date'})}</div>
                <div>{dates}</div>
            </div>
            <div className={styles.prize_pool}>
                <div className={styles.headline}>{intl.formatMessage({id: 'event_prizePool'})}</div>
                <div>{prizePool}</div>
            </div>
            <div className={styles.teams_number}>
                <div className={styles.headline}>{intl.formatMessage({id: 'event_teamsNumber'})}</div>
                <div>{teamsNumber}</div>
            </div>
            <div className={styles.location}>
                <div className={styles.headline}>{intl.formatMessage({id: 'event_location'})}</div>
                <div>
                    <div className={styles.location_wrapper}>
                        <Image src={location.flag} alt={'Flag'} width={18} height={12}/>
                        <span className={styles.location_place}>{location.place}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Event;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    if (params && params.id) {
        const event = await matchesAPI.getEventById(+params?.id || 1);

        return {
            props: {event}
        }
    }

    return {
        props: {event: undefined}
    }
}