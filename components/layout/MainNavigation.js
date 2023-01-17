import Link from "next/link";

import Logo from "./Logo";

import styles from "./main-navigation.module.css";

export default function MainNavigation() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo />
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>

          <li>
            <Link href="/contect">Contacts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
