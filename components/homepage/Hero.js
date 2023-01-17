import Image from "next/image";

import styles from "./hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/Bruno.jpg"
          alt="The magnificent one"
          width={300}
          height={300}
        />
      </div>

      <h1>Hi, I'm Bruno!</h1>

      <p>I developed this blog in order to someday become the best.</p>
    </section>
  );
}
