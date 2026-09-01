import React from "react";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer} role="contentinfo">
    <div className={styles.decoTop} aria-hidden="true">
      <span className={styles.decoLine} />
      <span className={styles.decoStar}>✦ ✦ ✦</span>
      <span className={styles.decoLine} />
    </div>

    <div className={styles.nameBlock}>
      <span className={styles.logoIcon} aria-hidden="true">🍽️</span>
      <p className={styles.name} lang="hi">
        प्रहलाद भेल, पकौड़ी,
        <br />
        केफे एण्ड फास्ट फुड
      </p>
    </div>

    <div className={styles.notice} role="note">
      <span className={styles.noticeIcon} aria-hidden="true">⏱️</span>
      <p className={styles.noticeText} lang="hi">
        ऑर्डर के बाद 15 मिनिट का समय लगेगा
      </p>
    </div>

    <div className={styles.divider} aria-hidden="true">
      <span className={styles.divLine} />
      <span className={styles.divGem}>◆</span>
      <span className={styles.divLine} />
    </div>

    <p className={styles.tagline}>Fresh Food &nbsp;•&nbsp; Great Taste &nbsp;•&nbsp; Happy Moments</p>
    <p className={styles.thankyou}>Thank you for visiting us! 🙏</p>
  </footer>
);

export default Footer;
