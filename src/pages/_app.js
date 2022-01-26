import "../styles/global.scss";
import "antd/dist/antd.css";

import { IsMobileProvider } from "../context/IsMobileContext";
import { MenuResponsive } from "../components/Menu";
// import { Footer } from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <IsMobileProvider>
      <MenuResponsive />
      <Component {...pageProps} />

      {/* <Footer /> */}
    </IsMobileProvider>
  );
}

export default MyApp;
