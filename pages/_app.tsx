import { AppProps } from "next/app";
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "../src/components/main-page/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
