import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import {NextPage} from "next";
import {clsx} from "clsx";
import Image from "next/image";
import {FormattedMessage} from "react-intl";
import {LOCALES} from "@/utils/i18n/locales";
import React, {ChangeEventHandler} from "react";
import {useRouter} from "next/router";

type Props = {
    currentLocale: string;
    handleChange: (ChangeEventHandler<HTMLSelectElement>)
}

const Header: NextPage<Props> = ({currentLocale, handleChange}) => {
    const {pathname} = useRouter()

    const languages = [
        {name: 'EN', code: LOCALES.ENGLISH},
        {name: 'BY', code: LOCALES.BELARUSIAN},
        {name: 'UA', code: LOCALES.UKRANIAN},
        {name: 'RU', code: LOCALES.RUSSIAN}
    ];

    return (
        <header className={styles.container}>
            <div className={`${styles.wrapper} ${clsx({
                [styles.home_page]: pathname === '/',
            })}`}>
                <div className={styles.logo}>
                    <Link href={'/'}><Image src={`/logo.png`} alt={'GoStars'} width={50} height={33}/></Link>
                </div>
                <Link href={'/matches'}>
                    <button className={styles.button} role="link"><FormattedMessage id={`matches_button`}/></button>
                </Link>
                <Link href={'/results'}>
                    <button className={styles.button} role="link"><FormattedMessage id={`results_button`}/></button>
                </Link>

                <select onChange={handleChange} value={currentLocale}>
                    {languages.map(({name, code}) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    )
}

export default Header;