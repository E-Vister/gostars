import {NextPage} from "next";
import {useCountdown} from "@/hooks/useCountdown";

type Props = {
    targetDate: number;
}

const Countdown: NextPage<Props> = ({targetDate}) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <>LIVE</>;
    } else {
        return (
            <>
                <p>{days}</p>
                <span>{'d'}</span>
                <p>:</p>
                <p>{hours}</p>
                <span>{'h'}</span>
                <p>:</p>
                <p>{minutes}</p>
                <span>{'m'}</span>
                <p>:</p>
                <p>{seconds}</p>
                <span>{'s'}</span>
            </>
        );
    }
}

export default Countdown;