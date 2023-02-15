import React, {ChangeEvent, useState} from "react";
import {LOCALES} from "@/utils/i18n/locales";
import {messages} from "@/utils/i18n/messages";
import {IntlProvider} from "react-intl";
import Header from "@/components/header";
import {useDispatch} from "react-redux";
import {setLocale} from "@/store/app/appSlice";

type DashboardLayoutProps = {
    children: React.ReactNode,
};

const Layout = ({children}: DashboardLayoutProps) => {
    const [currentLocale, setCurrentLocale] = useState(LOCALES.ENGLISH)
    const dispatch = useDispatch()

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        setCurrentLocale(value);
        dispatch(setLocale(value));
    }


    return (
        <>
            <IntlProvider locale={currentLocale} defaultLocale={LOCALES.ENGLISH} messages={messages[currentLocale]}>
                <Header currentLocale={currentLocale} handleChange={handleChange}/>
                {children}
            </IntlProvider>
        </>
    )
}

export default Layout;