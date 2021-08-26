import type { AppProps } from "next/app";

import { MetaSearch } from "../components/MetaSearch";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
        <MetaSearch placeholder="Search" openOnFocus={true} debug={true} />
      </header>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
