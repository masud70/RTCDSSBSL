import Layout from '../components/layout/layoutIndex';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from '../redux/store/store';
import { io } from 'socket.io-client';
import { SocketContext } from './socketContext';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function MyApp({ Component, pageProps }) {
    const socket = io(process.env.BASE_URL, {
        transports: ['websocket']
    });

    const client = new ApolloClient({
        uri: process.env.BASE_URL + '/graphql',
        cache: new InMemoryCache()
    });

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <SocketContext.Provider value={socket}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </SocketContext.Provider>
                </SnackbarProvider>
            </Provider>
        </ApolloProvider>
    );
}

export default MyApp;
