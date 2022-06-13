import ContextProviders from '../context/providers';

function MyApp(props: any) {
  const {Component, pageProps} = props
  return (
        <ContextProviders>
            <Component {...pageProps} />
        </ContextProviders>
  )
}

export default MyApp
