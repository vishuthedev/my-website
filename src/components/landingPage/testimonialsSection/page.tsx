"use client";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { useInView } from 'react-intersection-observer';
// import CommonButton from "@/components/buttonComponent/page";
interface TestimonialData {
  className?: string;
}
const Testimonial: React.FC<TestimonialData> = ({ className }: TestimonialData)  => {

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  
  return (
    <div className={className ? styles["main-container"]: ""} ref={ref}>
      <div className={styles["testimonial-section"]}>
        <div className={styles["container"]}>
          <div className={styles["main-head"]}>
            <h6>TESTIMONIALS</h6>
            <h1 className={inView ? styles["main-heading"]: ""}>Testimonials</h1>
            <p>
              Commodo elementum, sed imperdiet nunc euismod etiam aliquet
              viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
              magna facilisi
            </p>
          </div>
          {/* <div className={styles["work-btn"]}>
            <div className={styles["header-btn"]}>
              <CommonButton
                text="View All"
                type="primary"
                className={styles["work-button"]}
              />
            </div>
          </div> */}
        </div>
        <div className={styles["services"]}>
          <div className={inView ? styles["services-box"]: ""}>
            <div className={styles["box"]}>
              <div className={styles["work-title"]}>
                <h2>The site is interactive and easier</h2>
              </div>
              <p>
                Commodo elementum, sed imperdiet nunc euismod etiam aliquet
                viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
                magna facilisi
              </p>
            </div>
            <div className={styles["client-details"]}>
              <div>
                <Image
                  src="/assets/testimonial/t1.jpg"
                  width={80}
                  height={80}
                  alt="xyz"
                />
              </div>
              <div className={styles["client-name"]}>
                <h5>Jhon William</h5>
                <h6>FOUNDER FURNITI</h6>
              </div>
            </div>
          </div>
          <div className={inView ? styles["services-box"]: ""}>
            <div className={styles["box"]}>
              <div className={styles["work-title"]}>
                <h2>The site is interactive and easier</h2>
              </div>
              <p>
                Commodo elementum, sed imperdiet nunc euismod etiam aliquet
                viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
                magna facilisi
              </p>
            </div>
            <div className={styles["client-details"]}>
              <div>
                <Image
                  src="/assets/testimonial/t1.jpg"
                  width={80}
                  height={80}
                  alt="xyz"
                />
              </div>
              <div className={styles["client-name"]}>
                <h5>Samantha William</h5>
                <h6>FOUNDER FURNITI</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
