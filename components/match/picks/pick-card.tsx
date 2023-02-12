import {NextPage} from "next";
import {PickCardProps} from "@/types/types";
import styles from "@/styles/Match.module.scss";
import {clsx} from "clsx";
import Image from "next/image";
import React from "react";

const PickCard: NextPage<PickCardProps> = (
    {
        teamName,
        teamLogo,
        map,
        banned,
        decider,
        upcoming,
    }) => {

    return (
        <div className={styles.pick_card}>
            <div className={`${styles.pick_status} ${clsx({
                [styles.banned]: banned,
            })}`}>
                {banned ? `BAN` : decider ? `DECIDER` : upcoming ? `MAP` : `PICK`}
            </div>
            <div className={`${styles.map_name} ${clsx({
                [styles.banned]: banned,
            })}`}>
                {map ? map.toUpperCase() : `TBA`}
            </div>
            <div className={styles.pick_banner_box}>
                <Image src={map ? `/static/maps/de_${map.toLowerCase()}.jpg` : '/static/maps/de_mirage.jpg'}
                       alt={'map-banner'}
                       className={`${styles.map_banner} ${clsx({
                           [styles.placeholder]: !map,
                       })}`}
                       width={120}
                       height={67.5}
                       priority/>
                <div className={`${styles.gradient} ${clsx({
                    [styles.banned]: banned,
                    [styles.decider]: decider || upcoming,
                })}`}>
                    <Image src={teamLogo || '/placeholder.svg'}
                           alt={teamName || 'logo'}
                           className={styles.pick_team_logo}
                           width={70}
                           height={70}/>
                </div>
            </div>
        </div>
    )
}

export default PickCard;