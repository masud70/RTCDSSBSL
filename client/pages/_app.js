import Layout from "../components/layout/layoutIndex";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import store from "../redux/store/store";
import { io } from "socket.io-client";
import { SocketContext } from "./socketContext";

function MyApp({ Component, pageProps }) {
    const socket = io("http://localhost:5000", {
        transports: ["websocket"],
    });

    return (
        <Layout>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <SocketContext.Provider value={socket}>
                        <Component {...pageProps} />
                    </SocketContext.Provider>
                </SnackbarProvider>
            </Provider>
        </Layout>
    );
}

export default MyApp;
