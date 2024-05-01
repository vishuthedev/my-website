"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./style.module.scss"; // Correct import path

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView();
    }
  };

  return (
    <nav
      className={`${styles.navbar} ${isSticky ? styles.sticky : ""} ${
        isMenuOpen ? styles.open : ""
      }`}
    >
      <div className={styles.logo}>
        <Link href="/">
          <div className={styles["logo"]}>
            <Image
              alt="logo"
              src="/assets/logo/logo.png"
              width={100}
              height={50}
            />
          </div>
        </Link>
      </div>
      <div className={styles.menuToggle} onClick={toggleMenu}>
        <Image
          src="/assets/menu.png"
          width={30}
          height={30}
          alt="about us"
          sizes="100vw"
        />
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link href="/" onClick={() => scrollToSection("home")}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/#about" onClick={() => scrollToSection("about")}>
            About
          </Link>
        </li>
        <li>
          <Link href="/#services" onClick={() => scrollToSection("services")}>
            Services
          </Link>
        </li>
        <li>
          <Link href="/#portfolios" onClick={() => scrollToSection("portfolios")}>
            Portfolios
          </Link>
        </li>
        <li>
          <Link href="#" onClick={() => scrollToSection("careers")}>
            Careers
          </Link>
        </li>
        <li>
          <Link href="/#contact" onClick={() => scrollToSection("contact")}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
