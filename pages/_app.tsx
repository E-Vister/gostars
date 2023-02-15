import '@/styles/globals.scss'
import type {AppProps} from 'next/app'
import {store, wrapper} from "@/store/store";
import Layout from "@/components/layout";
import {Provider} from "react-redux";

const App = ({Component, pageProps}: AppProps) => {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </Provider>
    )
}

export default wrapper.withRedux(App);