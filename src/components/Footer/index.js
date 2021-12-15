import { MdFacebook } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

import styles from "../../styles/Footer/Footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <span>favicon</span>

      <div className={styles.midia}>
        <span>Só Bora nas redes sociais:</span>
        <MdFacebook />
        <FaInstagram />
      </div>
    </div>
  );
};
