import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import styles from "../../styles/Footer/Footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <span>Desenvolvido por @MarcoMonteiro</span>

      <div className={styles.icon}>
        <Link href="https://www.linkedin.com/in/marco-antonio-monteiro-de-brito-541ba0144/">
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
};
