import React from "react";
import styles from "./style.module.scss";
import CommonButton from "../buttonComponent/page";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["container"]}>
        <div className={styles["news-letter"]}>
          <div className={styles["demo"]}>
            <div className={styles["subscribe-text"]}>
              <h6>NEWSLETTER</h6>
              <h2>Subscribe To Our Newsletter</h2>
            </div>

            <div className={styles["subscribe-form"]}>
              <h3>Be ready for the ever-changing world.</h3>
              <p>
                Commodo elementum, sed imperdiet nunc euismod etiam aliquet
                viverra
              </p>
              <form className={styles["form"]}>
                <input
                  type="text"
                  placeholder="Email address"
                  className={styles["input"]}
                />
                <div className={styles["header-btn"]}>
                  <CommonButton
                    text="Subscribe"
                    type="primary"
                    className={styles["custom-btn"]}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["footer-column"]}>
            <div className={styles["footer-img"]}>
              <Image
                src="/assets/logo/logo.png"
                alt="mywebsite"
                width={180}
                height={75}
              // layout="responsive"

              />
            </div>
            <p>
              Commodo elementum, sed imperdiet nunc euismod etiam aliquet
              viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
            </p>
            <div className={styles["info"]}>
              <h6>info@mywebsite.com</h6>
              <h5>+91 9779992829</h5>
            </div>
          </div>
          <div className={styles["footer-contact"]}>
            <h3>Contact Us</h3>
            <p>Phase - 8A </p>
            <span>Plot No.E299 - 3rd Floor,</span>
            <p>Corporate Greens Tower, Industrial Area,</p>
            <span> Sector 75, Sahibzada Ajit Singh Nagar,</span>
            <span>Punjab 160055</span>
          </div>
          <div className={styles["footer-information"]}>
            <h3>Services</h3>
            <ul>
              <li>About</li>
              <li>Services</li>
              <li>Privacy Policy</li>
              <li>Terms & Condition</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className={styles["footer-service"]}>
            <h3>Let's Connect</h3>
            <ul>
              <li>info@mywebsite.com</li>
              <li>hr@mywebsite.com</li>
            </ul>
            <div className={styles["glassdoor"]}>
              {/* <Link href="https://www.glassdoor.co.in/Overview/Working-at-mywebsite-EI_IE7424608.11,22.htm">
                <Image
                  alt="Find us on Glassdoor."
                  src="https://www.glassdoor.co.in/pc-app/static/img/partnerCenter/badges/eng_BASIC_250x90.png"
                  width={0}
                  height={0}
                  layout="responsive"
                  objectFit="contain"
                />{" "}
              </Link> */}
            </div>
          </div>
        </div>
        <div className={styles["copyright"]}>
          <p>Copyright © mywebsite All Right Reserved.</p>

        </div>
      </div>
    </div>
  );
};
export default Footer;
