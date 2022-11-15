import Layout from '../components/layout/layoutIndex';
import '../styles/globals.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducer from '../reducers';

const store = createStore(allReducer);

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Layout>
    )
}

export default MyApp
