import "destyle.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { Auth } from "~/components/modules/Auth/Auth";
import { queryClient } from "~/libraries";

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Auth>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Auth>
  );
};

export default App;
