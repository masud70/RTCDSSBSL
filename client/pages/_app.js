import Layout from '../components/layout/layoutIndex';
import '../styles/globals.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducer from '../reducers';
import { SnackbarProvider } from 'notistack';

const store = createStore(allReducer);

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <Component {...pageProps} />
                </SnackbarProvider>
            </Provider>
        </Layout>
    )
}

export default MyApp
