import {NextPage} from "next";
import styles from '@/styles/common/youtube-embed.module.scss'

type Props = {
    embedId: string
}

const YoutubeEmbed: NextPage<Props> = ({ embedId }) => (
    <div className={styles.video_responsive}>
        <iframe
            width={853}
            height={480}
            className={styles.video}
            src={`https://www.youtube.com/embed/${embedId}`}
            allow={`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
            allowFullScreen
            title={`Embedded youtube`}
            frameBorder={0}
        />
    </div>
);


export default YoutubeEmbed;