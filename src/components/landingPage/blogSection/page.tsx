"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { getBlogPosts } from "@/api/api-data";
import { useInView } from "react-intersection-observer";

interface Blog {
  className: string;}

interface BlogPost {
  id?: number;
  title?: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
}

const Blog: React.FC<Blog> = ({ className }: Blog) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [error, setError] = useState<string | null>(null); // Add an error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlogPosts();
        // console.log("data", data);
        setPosts(data);
      } catch (error) {
        // console.error((error as Error).message);
        setError("Error fetching blog posts. Please try again."); // Set the error message
      }
    };

    fetchData();
  }, []);

  // Function to format the date as "Month Day, Year"
  const formatDate = (dateString: string) => {
    const options: {
      year: "numeric";
      month: "long";
      day: "numeric";
    } = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const truncateContent = (content: string, wordCount: number) => {
    const words = content.split(" ");
    const truncatedContent = words.slice(0, wordCount).join(" ");
    return truncatedContent;
  };

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <div id="blog" ref={ref}>
      <div className={styles["main-container"]} >
        <div className={styles["testimonial-section"]}>
          <div className={styles["container"]}>
            <div className={styles["main-head"]} >
              <h6>Blog</h6>
              <h1 className={inView ? styles["main-heading"] : ""}>
                Latest Blog & News
              </h1>
              <p>
                Commodo elementum, sed imperdiet nunc euismod etiam aliquet
                viverra enim. Adipiscing nunc condimentum risus id. Aquam mattis
                magna facilisi
              </p>
            </div>
            {/* <div className={styles["work-btn"]}>
            <div className={styles["header-btn"]}>
              <CommonButton
                text="View All Blog"
                type="primary"
                className={styles["work-button"]}
              />
            </div>
          </div> */}
          </div>
          <div className={styles["services"]}>
            {error ? ( // Check for error and display error message if present
              <p>Error: {error}</p>
            ) : (
              posts.map((post) => (
                <div className={styles["services-box"]} key={post.id}>
                  <div className={styles["box"]}>
                    <Image
                      src="/assets/blog/b1.jpg"
                      width={0}
                      height={0}
                      layout="responsive"
                      objectFit="contain"
                      alt="blog one"
                    />
                  </div>
                  <div className={styles["blog-details"]}>
                    <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: truncateContent(post.content.rendered, 10),
                        }}
                      />
                    </p>
                    <p>
                      <span className={styles["date"]}>
                        {formatDate(post.date)}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
