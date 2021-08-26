import type { AppProps } from "next/app";

import { MetaSearch } from "../components/MetaSearch";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="border-b-2 border-indigo-500 p-2">
        <MetaSearch placeholder="Search" openOnFocus={true} debug={true} />
      </header>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
