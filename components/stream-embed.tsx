import {NextPage} from "next";
import styles from '@/styles/common/youtube-embed.module.scss'

type Props = {
    embedLink: string
}

const StreamEmbed: NextPage<Props> = ({ embedLink }) => (
    <div className={styles.video_responsive}>
        <iframe
            width={853}
            height={480}
            className={styles.video}
            src={`${embedLink}localhost`}
            allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
            allowFullScreen
            title={`Embedded`}
            frameBorder={0}
        />
    </div>
);


export default StreamEmbed;