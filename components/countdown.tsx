import {NextPage} from "next";
import {useCountdown} from "@/hooks/useCountdown";
import {useIntl} from "react-intl";

type Props = {
    targetDate: number;
}

const Countdown: NextPage<Props> = ({targetDate}) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);
    const intl = useIntl();

    if (days + hours + minutes + seconds <= 0) {
        return <>LIVE</>;
    } else {
        return (
            <>
                <p>{days}</p>
                <span>{intl.formatMessage({id: 'day_one_letter'})}</span>
                <p>:</p>
                <p>{hours}</p>
                <span>{intl.formatMessage({id: 'hour_one_letter'})}</span>
                <p>:</p>
                <p>{minutes}</p>
                <span>{intl.formatMessage({id: 'minute_one_letter'})}</span>
                <p>:</p>
                <p>{seconds}</p>
                <span>{intl.formatMessage({id: 'second_one_letter'})}</span>
            </>
        );
    }
}

export default Countdown;