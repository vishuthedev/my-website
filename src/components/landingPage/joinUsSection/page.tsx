"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import CommonButton from "@/components/buttonComponent/page";
import { useInView } from "react-intersection-observer";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { postFormData } from "@/api/api-data";
import { ContactFormSchema } from "@/utils/schema";
interface JoinUsData {
  className?: string;
}
const JoinUs: React.FC<JoinUsData> = ({ className }: JoinUsData) => {
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const initialValues = {
    yourname: "",
    email: "",
    message: "",
    acceptTerms: false,
  };

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: ContactFormSchema, // Make sure ContactFormSchema is defined
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("your-name", values.yourname);
        formData.append("your-email", values.email);
        formData.append("your-message", values.message);
        formData.append("your-subject", "Contact us");
        formData.append("accept_policy", "1");

        const response = await postFormData("/10881/feedback", formData);
        if (response.status === 200) {
          resetForm();
          setIsLoading(false);
          toast.success(response.data.message);
        } else {
          setIsLoading(false);
          throw new Error(response.statusText); // Use response.statusText or provide a custom error message
        }
      } catch (error) {
        console.log("Error submitting form:", error);
        setIsLoading(false);
        toast.error("Mail not sent, Please try again later!");
      }
    },
  });
  return (
    <div id="contact" className={className}>
      <div className={styles["about-us"]}>
        <div className={styles["about"]}>
          <div className={styles["about-img"]}>
            <div className={styles["img-one"]}>
              <Image
                src="/assets/joinus/j1.jpg"
                alt="about us "
                width={0}
                height={0}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className={styles["img-two"]}>
              <Image
                src="/assets/joinus/j2.jpg"
                alt="about us "
                width={0}
                height={0}
                layout="responsive"
                objectFit="contain"
              />
            </div>
          </div>
          <div className={styles["about-content"]}>
            <div className={styles["join-us"]} ref={ref}>
              <h6>Join Us</h6>
              <h2 className={inView ? styles["main-heading"] : ""}>
                Several Things Define Us As a Company
              </h2>
              {/* <p>
            Commodo elementum, sed imperdiet nunc euismod etiam aliquet viverra enim. Adipiscing nunc condimentum risus iquam.
            </p> */}
              {/* <div className={styles["header-btn"]}>
              <CommonButton
                text="Join Us Now"
                type="primary"
                className={styles["custom-btn"]}
              />
            </div> */}
              <form
                className={styles["main-form"]}
                action="#"
                onSubmit={handleSubmit}
                id="your-form-id"
              >
                <div className={styles["form"]}>
                  <div className={styles["name"]}>
                    <input
                      type="text"
                      id="Full Name"
                      name="yourname"
                      value={values.yourname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Name"
                      className={styles["input"]}
                    />
                    {errors.yourname && touched.yourname && (
                      <div className="text-red-600 text-xs">
                        {errors.yourname}
                      </div>
                    )}
                  </div>
                  <div className={styles["email"]}>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email address"
                      className={styles["input"]}
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-600 text-xs">{errors.email}</div>
                    )}
                  </div>
                </div>
                <div className={styles["textarea"]}>
                  <textarea
                    placeholder="Messages"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles["messages"]}
                  ></textarea>
                  {errors.message && touched.message && (
                    <div className="text-red-600 text-xs">{errors.message}</div>
                  )}
                </div>
                <div className={styles[""]}>
                  <input
                    type="checkbox"
                    className={styles["checkbox"]}
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                  />
                  <span>I agree to the data protection regulations</span>
                </div>

                <div className={styles["header-btn"]}>
                  <CommonButton
                    text={isLoading ? "Sending..." : "Submit"}
                    onClick={handleSubmit}
                    type="primary"
                    className={styles["custom-btn"]}
                    disabled={isLoading || !isValid}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
