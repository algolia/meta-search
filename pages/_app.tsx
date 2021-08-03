import type { AppProps } from 'next/app'

import { Autocomplete } from '../components/Autocomplete';

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header>
      <Autocomplete placeholder="Search" openOnFocus={true} debug={true} />
      </header>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
