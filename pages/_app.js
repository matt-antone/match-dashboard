import { Provider } from 'react-redux'
import { useStore } from '../store'
import '../styles/globals.css'
import '../styles/xwing/xwing-miniatures.css'

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
