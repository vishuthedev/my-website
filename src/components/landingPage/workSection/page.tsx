"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import CommonButton from "@/components/buttonComponent/page";
import { useInView } from "react-intersection-observer";
import ReadMoreButton from "@/components/commonComponents/readMore/page";
import { worksData } from "../../../utils/data";

interface worksData {
  className?: string;
  title?: string;
  description?: string;
  imageSrc?: string;
  text?: string; // Assuming text is a required property of type string
  maxLength?: number; // Adding maxLength property of type number
}

const WorkSection: React.FC<worksData> = ({
  className,
  text,
  maxLength,
}: worksData) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div className={className}>
      <div className={styles["main-container"]} ref={ref} id="portfolios">
        <div className={styles["container"]}>
          <div className={styles["main-head"]}>
            <h6>Works</h6>
            <h1 className={inView ? styles["main-heading"] : ""}>Our Works</h1>
            <p>
              Commodo elementum, sed imperdiet nunc euismod etiam aliquet
              viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
              magna facilisi
            </p>
          </div>
          {/* <div className={styles["work-btn"]}>
          <div className={styles["header-btn"]}>
            <CommonButton
              text="All Our Work"
              type="primary"
              className={styles["work-button"]}
            />
          </div>
        </div> */}
        </div>
        {worksData &&
          worksData.map((service, index) => (
            <div key={index} className={styles["services"]}>
              <div className={styles["services-box"]}>
                {index % 2 === 0 ? ( // Check if index is even
                  <>
                    <div className={inView ? styles["box1"] : ""}>
                      <Image
                        src={service.imageSrc}
                        alt="Mobile Development"
                        width={0}
                        height={0}
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                    <div className={inView ? styles["box-two"] : ""}>
                      <div className={styles["work-title"]}>
                        <h6>{service.title}</h6>
                        <h2>{service.description}</h2>
                      </div>
                      <p>{displayText}</p>{" "}
                      {/* Use the actual service description */}
                      <div className={styles["header-btn"]}>
                        <ReadMoreButton
                          text={paragraphText}
                          maxLength={100}
                          isExpanded={isExpanded}
                          toggleExpansion={toggleExpansion}
                        />{" "}
                        {/* Use the actual service description */}
                      </div>
                    </div>
                  </>
                ) : (
                  // If index is odd, swap the order
                  <>
                    <div className={inView ? styles["box-two"] : ""}>
                      <div className={styles["work-title"]}>
                        <h6>{service.title}</h6>
                        <h2>{service.description}</h2>
                      </div>
                      <p>{displayText}</p>{" "}
                      {/* Use the actual service description */}
                      <div className={styles["header-btn"]}>
                        <ReadMoreButton
                          text={paragraphText}
                          maxLength={100}
                          isExpanded={isExpanded}
                          toggleExpansion={toggleExpansion}
                        />{" "}
                        {/* Use the actual service description */}
                      </div>
                    </div>
                    <div className={inView ? styles["box1"] : ""}>
                      <Image
                        src={service.imageSrc}
                        alt="Mobile Development"
                        width={0}
                        height={0}
                        layout="responsive"
                        objectFit="contain"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkSection;
