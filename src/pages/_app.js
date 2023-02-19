// import styles from '@/styles/globals.css'
import styles from '@/styles/app.scss'

import Layout from '../components/main/Layout';
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

