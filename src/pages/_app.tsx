import type { AppProps } from "next/app";
import "destyle.css";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
