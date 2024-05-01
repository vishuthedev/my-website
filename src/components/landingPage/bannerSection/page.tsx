"use client";
import React from "react";
// import styles from "@/app/landingPage/bannerSection/style.module.scss";
import CommonButton from "@/components/buttonComponent/page";
import { useInView } from 'react-intersection-observer';
import styles from '@/components/landingPage/bannerSection/style.module.scss'
  
const BannerSection = () => {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div className={styles["banner-section"]}>
      <div className={styles["banner-subsection"]}>
        <div className={styles["banner-title"]} ref={ref}>
          <h1 className={inView ? styles["head-title"]: ""}>
            Quality Digital Services You Really Need!
          </h1>
          <div className={styles["banner-para"]}>
            <p>
              We build and transform businesses by launching market-leading
              digital products, platforms, and experiences that fuel their
              growth.
            </p>
          </div>
          <div className={styles["header-btn"]}>
            <CommonButton
              text="Explore Our Services"
              type="primary"
              className={styles["custom-btn"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
