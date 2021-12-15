import Head from "next/head";

import { Carrosel } from "../components/Carrosel";
import styles from "../styles/Carrosel/Carrosel.module.scss";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Só Bora</title>
      </Head>

      <div className={styles.carrosel}>
        <Carrosel />
      </div>
    </>
  );
};

export default Home;
