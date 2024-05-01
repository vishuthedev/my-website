"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import CommonButton from "@/components/buttonComponent/page";
import { useInView } from "react-intersection-observer";
import ReadMoreButton from "@/components/commonComponents/readMore/page";
import { servicesData } from "../../../utils/servicesData";

interface Service {
  className?: string;
  // displayText: string;
  // title: string;
  // imageSrc: string;
  // alt: string;
  // buttonText: string;
  // inView: boolean;
  // text: string;
  // maxLength: number;
  // isExpanded: boolean; // Add this line
  // paragraphText: string;
  // toggleExpansion: () => void;
}

// interface ServicesProps {
//   services: Service[];
// }

const ServiceSection: React.FC<Service> = ({ className }: Service) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  // const ServiceSection = ({ text, maxLength } : any) => {

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  //   const [isExpanded, setIsExpanded] = useState(false);

  //   const paragraphText = `
  //   Commodo elementum, sed imperdiet nunc euismod etiam aliquet
  //   viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
  //   magna facilisi fermentum, euismod vitae. Porttitor sit tincidunt
  //   dictum facilisi eget orci velit. Nulla laoreet nunc gravida augue
  //   aenean sed elementum, in.
  // `;
  //   const displayText = typeof text === 'string' ? (isExpanded ? text : `${text.slice(0, maxLength)}...`) : '';

  return (
    <div className={className}>
      <div className={styles["main-container"]} ref={ref} id="services">
        <div className={styles["container"]}>
          <div className={styles["main-head"]}>
            <h6>Services</h6>
            <h1 className={inView ? styles["main-heading"] : ""}>
              Our Services
            </h1>
            <p>
              Commodo elementum, sed imperdiet nunc euismod etiam aliquet
              viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
              magna facilisi
            </p>
          </div>
        </div>
        {servicesData &&
          servicesData.slice(-2).map((service, index) => (
            <div className={styles["services"]} key={index}>
              <div className={styles["services-box"]}>
              <div
                className={`${styles["box"]} ${
                  inView ? styles["box-in-view"] : ""
                } ${index === 0 ? styles["box-red"] : ""} ${
                  index === 1 ? styles["box-blue"] : ""
                } ${index === 2 ? styles["box-orange"] : ""} ${
                  inView ? styles["fade-in-right"] : ""
                }`}
              >
                  <div className={styles["box-title"]}>
                    <h3>{service.title}</h3>
                    <div className={styles["box-img"]}>
                      <Image
                        src={service.imageSrc}
                        alt={service.alt}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className={styles["header-btn"]}>
                    <ReadMoreButton
                      text={service.paragraphText}
                      maxLength={100}
                      isExpanded={isExpanded}
                      toggleExpansion={toggleExpansion}
                    />
                  </div>
                </div>

                 <div
                className={`${styles["box-two"]} ${
                  inView ? styles["box-in-view"] : ""
                } ${index === 0 ? styles["box-black"] : ""} ${
                  index === 1 ? styles["box-white"] : ""
                } ${index === 2 ? styles["box-darkBlue"] : ""} ${
                  inView ? styles["fade-in-left"] : ""
                }`}
              >
                  <div className={styles["box-title"]}>
                    <h3>{service.title}</h3>
                    <div className={styles["box-img"]}>
                      <Image
                        src={service.imageSrc}
                        alt={service.alt}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className={styles["header-btn"]}>
                    <ReadMoreButton
                      text={service.paragraphText}
                      maxLength={100}
                      isExpanded={isExpanded}
                      toggleExpansion={toggleExpansion}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServiceSection;
