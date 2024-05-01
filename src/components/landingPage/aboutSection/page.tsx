"use client";
import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import CommonButton from "@/components/buttonComponent/page";
import { useInView } from "react-intersection-observer";
import ReadMoreButton from "@/components/commonComponents/readMore/page";
import AutoNumberCounter from "@/components/commonComponents/autoNumberCounter";
import { AboutData } from "@/modules/AboutModel";

const AboutSection: React.FC<AboutData> = ({
  className,
  text,
  maxLength,
}: AboutData) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpansionHandler = () => {
    setIsExpanded(!isExpanded);
  };

  const [lettersRef, setLettersRef] = useArrayRef();

  function useArrayRef() {
    const lettersRef = useRef<HTMLDivElement[]>([]);
    const setRef = (ref: HTMLDivElement) => {
      if (ref) {
        lettersRef.current.push(ref);
      }
    };
    return [lettersRef, setRef] as const;
  }

 

  const paragraphText = `
    Commodo elementum, sed imperdiet nunc euismod etiam aliquet
    viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
    magna facilisi fermentum, euismod vitae. Porttitor sit tincidunt
    dictum facilisi eget orci velit. Nulla laoreet nunc gravida augue
    aenean sed elementum, in.
  `;

  const displayText =
    typeof text === "string"
      ? isExpanded
        ? text
        : `${text.slice(0, maxLength)}...`
      : "";

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div className={className}>
      <div className={styles["main-container"]}>
        <div className={styles["container"]}>
          <div className={styles["section-one"]}>
            <div className={styles["sub-section"]} id="about">
              <h6>
                <AutoNumberCounter max={100} speed={5} stopValues={[99, 100]} />
                %
              </h6>
              <p>Success in getting customer </p>
            </div>
            <div className={styles["sub-section"]}>
              <h6>
                <AutoNumberCounter max={25} speed={5} stopValues={[25, 26]} />k
              </h6>
              <p>Thousands of successful business</p>
            </div>
          </div>
          <div className={styles["section-two"]}>
            <div className={styles["sub-section"]}>
              <h6>
                <AutoNumberCounter
                  max={120}
                  speed={5}
                  stopValues={[120, 121]}
                />
                +
              </h6>
              <p>Total client who love Solvero</p>
            </div>
            <div className={styles["sub-section"]}>
              <h6>
                <AutoNumberCounter max={5} speed={5} stopValues={[5, 6]} />
              </h6>
              <p>Reviews are very satisfied with us</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["about-us"]} ref={ref}>
        <div className={styles["about"]}>
          <div className={inView ? styles["about-img"] : " "}>
            <Image
              src="/assets/about/about.jpg"
              alt="about us "
              width={550}
              height={550}
              layout="responsive"
            />
          </div>
          <div
            className={inView ? styles["about-content"] : ""}
            ref={triggerRef}
          >
            <h6 ref={contentRef}>About us</h6>
            <h2>We’re On Mission To Help Business Grow Faster Thanever.</h2>
            <p>{displayText}</p>
            <div className={styles["header-btn"]}>
              <ReadMoreButton
                text={paragraphText}
                maxLength={100}
                isExpanded={isExpanded}
                toggleExpansion={toggleExpansionHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;